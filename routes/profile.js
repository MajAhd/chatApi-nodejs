const express = require("express");
const router = express.Router();
const baseUrl = "/api/usrinfo/";
const Basicinfo = require("../controllers/Profile/BasicinfoController");

// Basic Info : name , bio , gender ,avatar , username ,  phoneNumber
router.get(baseUrl, Basicinfo.get_userinfo);
router.post(baseUrl, Basicinfo.save_userinfo);
router.post(baseUrl + "username", Basicinfo.save_username);
// Avatar
router.post(baseUrl + "avatar", Basicinfo.save_avatar);
router.post(baseUrl + "avatar", Basicinfo.remove_avatar);

module.exports = router;
