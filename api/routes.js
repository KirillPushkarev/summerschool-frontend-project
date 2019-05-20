const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const router = express.Router();

const models = require("./models");
const formatters = require("./formatters");

router.get("/issues", function(req, res) {
    console.log("GET /issues");

    const user = req.user;
    models.Issue.find({ owner: user.sub }, function(err, issues) {
        if (err) return console.log(err);
        res.send(issues.map(issue => formatters.formatIssue(issue)));
    });
});
router.get("/issues/:id", function(req, res) {
    console.log("GET /issues/:id");

    const user = req.user;
    const id = req.params.id;
    models.Issue.findOne({ _id: id, owner: user.sub }, function(err, issue) {
        if (err) return console.log(err);
        res.send(formatters.formatIssue(issue));
    });
});
router.post("/issues", jsonParser, function(req, res) {
    console.log("POST /issues");

    const user = req.user;
    const { name, description, priority, status, assigneeId } = req.body;
    const issue = new models.Issue({ name, description, priority, status, assigneeId, owner: user.sub });
    issue.save(function(err) {
        if (err) return console.log(err);
        res.status(201);
        res.send({ id: issue._id });
    });
});
router.put("/issues/:id", jsonParser, function(req, res) {
    console.log("PUT /issues/:id");

    const user = req.user;
    const id = req.params.id;
    const { name, description, priority, status, assigneeId } = req.body;
    const newIssue = { name, description, priority, status, assigneeId };
    models.Issue.findOneAndUpdate({ _id: id, owner: user.sub }, newIssue, { new: true }, function(err, issue) {
        if (err) return console.log(err);
        res.sendStatus(204);
    });
});
router.delete("/issues/:id", function(req, res) {
    console.log("DELETE /issues/:id");

    const user = req.user;
    const id = req.params.id;
    models.Issue.findOneAndDelete({ _id: id, owner: user.sub }, function(err, issue) {
        if (err) return console.log(err);
        res.sendStatus(204);
    });
});

router.get("/users", function(req, res) {
    console.log("GET /users");

    const user = req.user;
    models.User.find({}, function(err, users) {
        if (err) return console.log(err);
        res.send(users.map(user => formatters.formatUser(user)));
    });
});

module.exports = router;
