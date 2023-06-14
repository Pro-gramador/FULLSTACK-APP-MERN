const mongoose = require("mongoose");

const connectionDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/movieApp" && "mongodb://localhost:27017/Comments")
    .then(() => console.log("database connected"))
    .catch((err) => console.error("database error: ", err));
    
};

module.exports = connectionDB
