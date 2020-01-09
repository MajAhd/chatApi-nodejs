const mongoose = require("mongoose");
const Schema = mongoose.Schema;
d = new Date();
today = new Date();
expire = d.setDate(today.getDate() + 90); // set 90 days for token
const UserTokensSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  last_activity: {
    type: Date,
    default: Date.now
  },
  expires_at: {
    type: Date,
    default: expire
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
module.exports = mongoose.model("UserTokens", UserTokensSchema);
