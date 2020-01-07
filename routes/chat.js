const express = require("express");
const router = express.Router();
const baseUrl = "/api/chat/";
const chat = require("../controllers/ChatController");

router.get(baseUrl + "chatList", chat.get_chatlist);
router.post(baseUrl + "loadChat", chat.get_chat);
router.post(baseUrl + "send", chat.send_message);

module.exports = router;
