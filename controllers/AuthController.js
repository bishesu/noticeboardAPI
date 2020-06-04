const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      password: hashPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User added sucessfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "An error occured" + error,
        });
      });
  });
};

// function for login
const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, "secrectToken", {
            expiresIn: "1h",
          });
          res.json({
            message: "Login Successful!",
            token,
          });
        } else {
          res.json({
            password: "Password incorrect!",
          });
        }
      });
    } else {
      res.json({
        message: "No user found!",
      });
    }
  });
};

module.exports = { register, login };
