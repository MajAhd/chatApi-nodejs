const Users = require("../models/users");
const Chats = require("../models/chats");
const UserTokens = require("../models/user_tokens");
let Validator = require("validatorjs");
const io = require("../socket");

exports.get_currentUser = (req, res, next) => {
  const token = req.get("Authorization");
  UserTokens.findOne({ token: token })
    .populate("user_id")
    .then(user => {
      res.json({
        result: true,
        user: user
      });
    });
};
exports.get_contactInfo = (req, res, next) => {
  Users.findOne({ _id: req.params.id }).then(user => {
    res.json({
      result: true,
      user: user
    });
  });
};
exports.get_chatlist = (req, res, next) => {
  Users.find({}).then(users => {
    res.json({
      result: true,
      users: users
    });
  });
};

exports.get_chat = (req, res, next) => {
  let user_id = req.params.user_id;
  let contact_id = req.params.contact_id;
  Chats.find({
    $or: [
      { sender_id: user_id, reciever_id: contact_id },
      { sender_id: contact_id, reciever_id: user_id }
    ]
  }).then(chats => {
    res.json({
      result: true,
      chats: chats
    });
  });
};

exports.send_message = (req, res, next) => {
  let sender_id = req.body.sender_id;
  let reciever_id = req.body.reciever_id;
  let message = req.body.message;
  let validation = new Validator(
    {
      sender_id: sender_id,
      reciever_id: reciever_id,
      message: message
    },
    {
      sender_id: "required",
      reciever_id: "required",
      message: "required"
    }
  );
  validation.fails(() => {
    res.json({
      result: false,
      validations: validation.errors.all()
    });
  });
  Chat = new Chats({
    sender_id: sender_id,
    reciever_id: reciever_id,
    message: message
  });
  Chat.save()
    .then(() => {
      io.getIO().emit("messages", { action: "read_chat", chat: Chat });
      res.json({
        result: true
      });
    })
    .catch(err => {
      res.json({
        result: false,
        msg: "Message Did not Send Please Try Again!",
        data: err
      });
    });
};
