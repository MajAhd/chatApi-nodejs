const Users = require("../../models/users");

exports.get_userinfo = (req, res, next) => {
  const User = new Users.load_user();
  User.load_user();
  res.send(`<h1>User info</h1>`);
};
exports.save_userinfo = (req, res, next) => {
  res.send(`<h1>save User info</h1>`);
};

exports.save_username = (req, res, next) => {
  res.send(`<h1>save Username</h1>`);
};

exports.save_avatar = (req, res, next) => {
  res.send(`<h1>save User avatar</h1>`);
};
exports.remove_avatar = (req, res, next) => {
  res.send(`<h1>remove User avatar</h1>`);
};
