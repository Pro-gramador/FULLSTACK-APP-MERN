const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const { name, email } = user;
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn:"24h" });

        return res.status(200).json({ status: "OK", user: { name, email }, token: token });
      } else {
        return res.status(500).json({ message: "Incorrect Password" });
      }
    });
  });
};

module.exports = login;
