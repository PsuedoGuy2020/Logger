const express = require("express");
const http = require("http");
const Watcher = require("./mywatcher.js");
const path = require("path");
const io = require("socket.io")(http);
const logPathFile = "myLogs.log";

const app = express();
const server = http.createServer(app);
const currWatcher = new Watcher(logPathFile);
currWatcher.start();

app.get("/log", (req, res) => {
  let file = "index.html";

  res.sendFile(
    file,
    {
      root: path.join(__dirname),
    },
    function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", file);
        console.log(req);
      }
    }
  );
});

io.on("connection", (socket) => {
  console.log("New connection" + socket.id);

  const watcher = new Watcher(logPathFile);
  const initialData = watcher.readLast10Lines();
  console.log(initialData);

  currWatcher.on("process", (data) => {
    socket.emit("update-log", data);
  });

  let data = currWatcher.getLogs();
  socket.emit("init", data);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
