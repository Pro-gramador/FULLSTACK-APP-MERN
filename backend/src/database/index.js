const mongoose = require("mongoose");

const connectionDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/movieApp")
    .then(() => console.log("database connected"))
    .catch((err) => console.error("database error: ", err));
};

module.exports = connectionDB;
