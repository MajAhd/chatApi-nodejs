const express = require("express");
const router = express.Router();
const baseUrl = "/api/auth/";
const Signin = require("../controllers/Auth/SigninController");
const Signup = require("../controllers/Auth/SignupController");

router.post(baseUrl + "signin", Signin.signin_users);
router.post(baseUrl + "signin/confirm", Signin.signin_confirm);

router.post(baseUrl + "signup", Signup.signup_users);
router.post(baseUrl + "signup/confirm", Signup.signup_confirm);

router.post(baseUrl + "logout", Signin.logout_acount);

module.exports = router;
