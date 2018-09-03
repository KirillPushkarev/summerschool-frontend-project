const express = require("express");
const jsonServer = require("json-server");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, "dist")));
app.use("/api", jsonServer.router("api/db.json"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(port);
