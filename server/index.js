const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

// app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use(bodyParser.json());

// add middlewares
const root = require('path').join(__dirname, '../client/build');
app.use(express.static(root));

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

const connections = [null, null];

io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);
    let playerIndex = -1;

    // Logic for battleships
    socket.on('join_battleship', (data) => {
        // socket.join(data);
        for (const i in connections) {
            if (connections[i] === null) {
                playerIndex = i;
                break;
            }
        }

        socket.emit('player-number', playerIndex)
        console.log(`Player ${playerIndex} has joined`)

        if (playerIndex === -1) return;

        connections[playerIndex] = false;

        socket.broadcast.emit('player-connection', playerIndex);

        socket.on('player-disconnect', () => {
            console.log(`Player ${playerIndex} disconnected.`);
            connections[playerIndex] = null;
            socket.broadcast.emit('player-connection', playerIndex);
        });
    })

    

    // Logic for chat room

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

        // TODO: This might run when someone leaves in chat room need to check
        if (playerIndex !== -1) {
            console.log(`Player ${playerIndex} disconnected`);
            connections[playerIndex] = null;
            //Tell everyone what player numbe just disconnected
            socket.broadcast.emit('player-connection', playerIndex);
        }
        
    })
});

app.get("/api", (req, res) => {
    res.send("HI YOU'RE ON THE SERVER");
});

app.post("/api/guess-number", (req, res) => {
    // console.log(req.body.uri);
    var spawn = require('child_process').spawn;
    var py = spawn('python', ['number_detector.py']);
    var detectedNum = '';

    py.stdout.on('data', function(data){
        detectedNum = data.toString();
    });
    py.stdout.on('end', function(){
        console.log('Detected number=',detectedNum);
        if (!detectedNum) {
            detectedNum = 'There was an error, please try again later.';
        }
        res.send(detectedNum);
    });
    py.stdin.write(JSON.stringify(req.body.uri));
    py.stdin.end();
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});  

server.listen(port, () => console.log(`SERVER RUNNING on port ${port}`));