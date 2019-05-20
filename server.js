const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://issue-tracker-999.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://issue-tracker-999.herokuapp.com",
    issuer: "https://issue-tracker-999.auth0.com/",
    algorithms: ["RS256"],
});

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type,Authorization");

    next();
});
app.use(express.static(path.resolve(__dirname, "dist")));
app.use(jwtCheck);
app.use("/api", require("./api/routes"));
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "dist/index.html"));
    });
}

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error"));
db.once("open", function() {
    app.listen(port);
});
