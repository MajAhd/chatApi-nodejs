const express = require("express");
const router = express.Router();
const baseUrl = "/api/chat/";
const chat = require("../controllers/Chat/ChatController");

router.get(baseUrl + "contact", chat.get_contacts);
router.post(baseUrl + "contact", chat.save_contact);

router.get(baseUrl + "chatList", chat.get_chatlist);
router.post(baseUrl + "loadChat", chat.get_chat);
router.post(baseUrl + "send", chat.send_message);

module.exports = router;
