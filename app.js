const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const app = express();

const AuthRoutes = require("./routes/auth");
const ProfileRoutes = require("./routes/profile");
const ChatRoutes = require("./routes/chat");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(AuthRoutes);
app.use(ProfileRoutes);
app.use(ChatRoutes);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Request Not Found!</h1>");
});
const server = http.createServer(app);
server.listen(3000);
