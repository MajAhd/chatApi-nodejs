const Users = require("../models/users");
const UserTokens = require("../models/user_tokens");
const bcrypt = require("bcryptjs");
const TokenGenerator = require("tokgen");

exports.signin_users = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  Users.find({ email: email }).then(user => {
    if (user.length >= 1) {
      bcrypt.compare(password, user[0].password).then(comparePass => {
        if (comparePass) {
          // Create User Token For Sign in
          let generator = new TokenGenerator({
            chars: "0-9a-f",
            length: 64
          });
          let token = generator.generate();
          userToken = new UserTokens({
            user_id: user[0]._id,
            token: token
          });
          userToken
            .save()
            .then(token => {
              res.json({
                result: true,
                data: token
              });
            })
            .catch(err => {
              res.json({
                result: false,
                data: err
              });
            });
        } else {
          res.json({
            result: true,
            data: "Incorrect Password!"
          });
        }
      });
    } else {
      res.json({
        result: false,
        data: "User Not Found!"
      });
    }
  });
};
exports.signup_users = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 12)
    .then(hash => {
      return hash;
    })
    .then(hashedPassword => {
      //  Create User
      user = new Users({
        name: req.body.name.toLowerCase(),
        email: req.body.email.toLowerCase(),
        user_name: req.body.user_name.toLowerCase(),
        password: hashedPassword
      });
      user
        .save()
        .then(savedUser => {
          // Create User Token For Sign in
          let generator = new TokenGenerator({ chars: "0-9a-f", length: 64 });
          let token = generator.generate();
          userToken = new UserTokens({
            user_id: savedUser._id,
            token: token
          });
          userToken
            .save()
            .then(token => {
              res.json({
                result: true,
                data: token
              });
            })
            .catch(err => {
              res.json({
                result: false,
                data: err
              });
            });
        })
        .catch(err => {
          res.json({
            result: false,
            data: err
          });
        });
    });
};
exports.logout_acount = (req, res, next) => {
  let token = req.body.token;
  let user_id = req.body.user_id;
  UserTokens.remove({ token: token, user_id: user_id })
    .then(userToken => {
      res.json({
        result: true,
        data: "Logout Account!"
      });
    })
    .catch(err => {
      res.json({
        result: false,
        data: err
      });
    });
};
