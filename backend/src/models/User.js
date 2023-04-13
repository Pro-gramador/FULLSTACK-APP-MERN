const mongoose = require("mongoose");

let User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    id: { type: String, required: true },
},{collection:"user-data"});


module.exports = mongoose.model("User", User);