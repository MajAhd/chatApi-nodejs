exports.signin_users = (req, res, next) => {
  console.log(req.body);
  res.send(`<h1>User Signin ${req.body.name}</h1>`);
};

exports.signin_confirm = (req, res, next) => {
  res.send(`<h1>signin_confirm</h1>`);
};

exports.logout_acount = (req, res, next) => {
  res.send(`<h1>User Logout</h1>`);
};
