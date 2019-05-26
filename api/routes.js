const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { check, body, validationResult } = require("express-validator/check");
const router = express.Router();

const models = require("./models");
const formatters = require("./formatters");
const issueValidator = [
    body("name").isString(),
    body("description").isString(),
    body("priority").isIn(["Lowest", "Low", "Medium", "High", "Highest"]),
    body("status").isIn(["To do", "In progress", "In review", "Done"]),
    body("assigneeId").isString(),
];

router.get("/issues", function(req, res, next) {
    console.log("GET /issues");

    const user = req.user;
    models.Issue.find({ owner: user.sub }, function(err, issues) {
        if (err) {
            next(err);
            return;
        }
        res.send(issues.map(issue => formatters.formatIssue(issue)));
    });
});
router.get("/issues/:id", function(req, res, next) {
    console.log("GET /issues/:id");

    const user = req.user;
    const id = req.params.id;
    models.Issue.findOne({ _id: id, owner: user.sub }, function(err, issue) {
        if (err) {
            next(err);
            return;
        }
        res.send(formatters.formatIssue(issue));
    });
});
router.post("/issues", jsonParser, issueValidator, function(req, res, next) {
    console.log("POST /issues");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(422);
    }

    const user = req.user;
    const { name, description, priority, status, assigneeId } = req.body;
    const issue = new models.Issue({ name, description, priority, status, assigneeId, owner: user.sub });
    issue.save(function(err) {
        if (err) {
            next(err);
            return;
        }
        res.status(201);
        res.send({ id: issue._id });
    });
});
router.put("/issues/:id", jsonParser, issueValidator, function(req, res, next) {
    console.log("PUT /issues/:id");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(422);
    }

    const user = req.user;
    const id = req.params.id;
    const { name, description, priority, status, assigneeId } = req.body;
    const newIssue = { name, description, priority, status, assigneeId };
    models.Issue.findOneAndUpdate({ _id: id, owner: user.sub }, newIssue, { new: true }, function(err, issue) {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(204);
    });
});
router.delete("/issues/:id", function(req, res, next) {
    console.log("DELETE /issues/:id");

    const user = req.user;
    const id = req.params.id;
    models.Issue.findOneAndDelete({ _id: id, owner: user.sub }, function(err, issue) {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(204);
    });
});

router.get("/users", function(req, res, next) {
    console.log("GET /users");

    models.User.find({}, function(err, users) {
        if (err) {
            next(err);
            return;
        }
        res.send(users.map(user => formatters.formatUser(user)));
    });
});

module.exports = router;
