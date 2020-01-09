module.exports = (req, res, next) => {
  const token = req.get("Authorization");
  if (token !== undefined || token === "") {
    console.log("is Login");
  } else {
    console.log("Not Login!");
    throw "Not Login!";
  }
  next();
};
