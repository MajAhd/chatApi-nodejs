exports.get_contacts = (req, res, next) => {
  res.send(`<h1>Contact List</h1>`);
};
exports.save_contact = (req, res, next) => {
  res.send(`<h1>Contact save</h1>`);
};

exports.get_chatlist = (req, res, next) => {
  res.send(`<h1>Chat List</h1>`);
};

exports.get_chat = (req, res, next) => {
  res.send(`<h1>chat</h1>`);
};

exports.send_message = (req, res, next) => {
  res.send(`<h1>Send Message</h1>`);
};
