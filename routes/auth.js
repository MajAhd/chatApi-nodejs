const express = require("express");
const router = express.Router();
const baseUrl = "/api/auth/";
const Auth = require("../controllers/AuthController");

router.post(baseUrl + "signin", Auth.signin_users);
router.post(baseUrl + "signup", Auth.signup_users);
router.post(baseUrl + "logout", Auth.logout_acount);

module.exports = router;
