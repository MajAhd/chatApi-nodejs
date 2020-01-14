const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  reciever_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  message: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: false,
    default: null
  },
  media_type: {
    type: String,
    required: false,
    default: null
  },
  seen: {
    type: Boolean,
    default: false,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
ChatSchema.plugin(uniqueValidator, {
  message: "`{VALUE}` has been reserved by another user."
});
module.exports = mongoose.model("Chats", ChatSchema);
