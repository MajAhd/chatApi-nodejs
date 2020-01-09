const Users = require("../models/users");
const UserTokens = require("../models/user_tokens");
const bcrypt = require("bcryptjs");
const TokenGenerator = require("tokgen");
let Validator = require("validatorjs");
const io = require("../socket");

exports.signin_users = (req, res, next) => {
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  let validation = new Validator(
    {
      email: email,
      password: password
    },
    {
      email: "required|email",
      password: "required|min:8"
    }
  );
  validation.fails(() => {
    res.json({
      result: false,
      validations: validation.errors.all()
    });
  });

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
            token: Date.now() + token
          });
          userToken
            .save()
            .then(token => {
              res.json({
                result: true,
                token: token
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
            result: false,
            msg: "Incorrect Password!"
          });
        }
      });
    } else {
      res.json({
        result: false,
        msg: "User Not Found!"
      });
    }
  });
};
exports.signup_users = (req, res, next) => {
  let validation = new Validator(
    {
      name: req.body.name,
      email: req.body.email,
      user_name: req.body.user_name,
      password: req.body.password
    },
    {
      name: "required",
      email: "required|email",
      user_name: "required|min:4",
      password: "required|min:8"
    }
  );
  validation.fails(() => {
    res.json({
      result: false,
      validations: validation.errors.all()
    });
  });
  validation.passes(() => {
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
            io.getIO().emit("users", { action: "read_user", user: savedUser });
            let generator = new TokenGenerator({ chars: "0-9a-f", length: 64 });
            let token = generator.generate();

            userToken = new UserTokens({
              user_id: savedUser._id,
              token: Date.now() + token
            });
            userToken
              .save()
              .then(token => {
                res.json({
                  result: true,
                  msg: "Congrats!registration has been done",
                  token: token
                });
              })
              .catch(err => {
                res.json({
                  result: false,
                  msg: "your registration has been done please Signin!",
                  data: err
                });
              });
          })
          .catch(err => {
            res.json({
              result: false,
              msg: "Interanal Server Error!Please Try Again ...",
              error: err
            });
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
        data: "Logout Account!",
        token: token
      });
    })
    .catch(err => {
      res.json({
        result: false,
        data: err
      });
    });
};
