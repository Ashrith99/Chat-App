const path= require('path');
const http = require('http');
const express=require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io= socketIO(server);
//io is a Socket.IO server instance attached to an instance of http.Server listening for incoming events.




app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    //The socket argument of the connection event listener callback function is an object that represents an incoming socket connection from a client.
    console.log("new user just connected->from server");

    socket.on('disconnect',()=>{
        console.log("disconnected form server->from server");
    });
})
server.listen(port,()=>{
    console.log(`server in ${port} is up`);
})