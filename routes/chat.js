const express = require("express");
const router = express.Router();
const baseUrl = "/api/chat/";
const chat = require("../controllers/ChatController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(baseUrl + "currentUser", authMiddleware, chat.get_currentUser);
router.get(baseUrl + "contactInfo/:id", authMiddleware, chat.get_contactInfo);
router.get(baseUrl + "chatList", authMiddleware, chat.get_chatlist);
router.get(
  baseUrl + "loadChat/:user_id/:contact_id",
  authMiddleware,
  chat.get_chat
);

router.post(baseUrl + "send", authMiddleware, chat.send_message);
router.post(baseUrl + "send/media", authMiddleware, chat.send_message_media);
router.get(baseUrl + "seen/:id", authMiddleware, chat.seen);

module.exports = router;
