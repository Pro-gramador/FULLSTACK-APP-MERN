const mongoose = require("mongoose");

let User = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{collection:"user-data"});

let Comment = new mongoose.Schema({
    text: { type: String, required: true},
    date: { type: Date, default: Date.now},
});

module.exports = mongoose.model("User", User), mongoose.model("Comments", Comment);









