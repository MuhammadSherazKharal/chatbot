// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

require('dotenv').config();
// Serve static HTML file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle socket connections For Broadcasting

io.on("connection", (socket) => {
    const socketId = socket.id;
    const startId = socketId.slice(0, 3);
    const endId = socketId.slice(-3);
    const id = `${startId}...${endId}`;


    console.log("A user " + socketId + " connected");


    socket.on("chat message", (msg) => {
        // console.log("Message by  " + id + ": " + msg);
        io.emit("chat message", { id: id, text: msg }); // broadcast to everyone
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
const PORT=process.env.PORT || 3000;
server.listen(3000,"0.0.0.0", () => {
    console.log("Server running at : http://0.0.0.0:3000");
});
