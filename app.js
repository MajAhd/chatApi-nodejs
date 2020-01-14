const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const path = require("path");
const rootDir = require("./util/path");
const mongoose = require("mongoose");
const app = express();
const AuthRoutes = require("./routes/auth");
const ChatRoutes = require("./routes/chat");

const mediaStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, "./public/img");
    } else if (file.mimetype === "video/mp4") {
      callback(null, "./public/videos");
    }
  },
  filename: function(req, file, callback) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, file.fieldname + "-" + Date.now() + "." + "jpeg");
    } else if (file.mimetype === "video/mp4") {
      callback(null, file.fieldname + "-" + Date.now() + "." + "mp4");
    }
  }
});
const mediaFilesFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  multer({
    storage: mediaStorage,
    fileFilter: mediaFilesFilter
  }).single("media")
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,Post,Delete,PUT,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(AuthRoutes);
app.use(ChatRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));
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
    const io = require("./socket").init(runServer);
    io.on("connection", socket => {
      console.log("Client Connected!");
    });
  })
  .catch(err => {
    console.log(err);
  });
