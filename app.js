const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const mongoose = require("mongoose");
const app = express();

const AuthRoutes = require("./routes/auth");
const ChatRoutes = require("./routes/chat");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,Post,Delete,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(AuthRoutes);
app.use(ChatRoutes);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Request Not Found!</h1>");
});
const server = http.createServer(app);
mongoose
  .connect("mongodb://localhost:27017/chatService", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    const runServer = server.listen(8000);
    const io = require("socket.io")(runServer);
    io.on("connection", socket => {
      console.log("Client Connected!");
    });
  })
  .catch(err => {
    console.log(err);
  });
