const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
//     //res.header("Access-Control-Allow-Origin", "*");
//     //res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     //next();
// });

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
});

app.post("/guess-number", (req, res) => {
    // console.log(req.body.uri);
    var spawn = require('child_process').spawn;
    var py = spawn('python', ['number_detector.py']);
    var detectedNum = '';

    py.stdout.on('data', function(data){
        detectedNum = data.toString();
    });
    py.stdout.on('end', function(){
        console.log('Detected number=',detectedNum);
        res.send(detectedNum);
    });
    py.stdin.write(JSON.stringify(req.body.uri));
    py.stdin.end();
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

server.listen(port, () => console.log(`SERVER RUNNING on port ${port}`));