const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
});

const server = http.createServer(app);

const io = new Server(server, {
    // Not sure if this is needed
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(io.sockets.adapter.rooms);
        console.log(io.of("/").adapter.rooms);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
        console.log(io.sockets.adapter.rooms);
    })
});

app.get("/", (req, res) => {
    res.send("HI YOU'RE ON THE SERVER");
})

server.listen(3000, () => {
    console.log('SERVER RUNNING');
});