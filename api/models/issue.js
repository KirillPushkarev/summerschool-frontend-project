const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    name: String,
    description: String,
    priority: String,
    status: String,
    assigneeId: String,
    owner: String,
});
const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
