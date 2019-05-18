const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

// Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.resolve(__dirname, "dist")));
app.use("/api", require("./api/routes"));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "dist/index.html"));
// });

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("MongoDB connection error"));
db.once("open", function() {
    app.listen(port);
});
