const User = require("../models/User");

const getUserById = (req, res) => {
  const { userId } = req.params;

  if (userId.length === 24) {
    User.findById(userId).then((user) => {
      if (!user) {
        return res.json({ message: "User not found" });
      } else {
        const { _id, password, __v, ...rest } = user._doc;
        res.json(rest);
      }
    });
  } else {
    return res.json({ message: "Invalid credentials" });
  }
};

module.exports = getUserById;
