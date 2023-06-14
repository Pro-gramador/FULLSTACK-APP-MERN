const User = require("../models/User");

const profile = (req, res) => {
  const { name } = req.params;

  User.find({ name })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "OK", user: user });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }); 
};

module.exports = profile;