const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {

        return res.status(401).json({ message: "This email already exist" });
      } else if (!name || !email || !password) {

        return res.status(400).json({ message: "Bad request to the server" });
      } else {

        bcrypt.hash(password, 10, (error, hashedPassword) => {
          if (error) {

            return res.json({ error });
          } else {

            const newUser = new User({
              name,
              email,
              password: hashedPassword,
              id,
            });

            newUser.save().then((user) => {
              const token = jwt.sign(
                {
                  id: user.id,
                },
                process.env.TOKEN_SECRET,
                {
                  expiresIn: "24h",
                }
              );

              return res.status(200).json({ message: "OK", user: user, token: token });
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", err: err });
    });
};

module.exports = register;
