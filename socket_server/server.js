//server of pegion chat app

const io = require('socket.io')(8000);
const fs = require('fs');

//users object to hold the names of all the users
const users = {};

//socket instance when somebody connects to the chat app
io.on('connection', socket => {
    socket.on('new-user-joined', () => {
        const username = fs.readFileSync('../data.txt', 'utf-8');
        console.log("New User ", username);
        users[socket.id] = username;  // Stores the name of user at object users using specific socket.id
        socket.broadcast.emit('user-joined', username);
    });

    //socket instance received from client when somebody sends a message 
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, username: users[socket.id] });
    });

    //socket instance when user disconnects 
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});