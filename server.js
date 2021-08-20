const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app= express();
const server=http.createServer(app);
const formatMessage =require('./utils/messages')
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./utils/users');
  


const io=socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botname="shubham";

io.on('connection',socket=>{
  
        socket.on('joinRoom',({username,room})=>{
            console.log(socket.id);

           const user=userJoin(socket.id,username,room);
          socket.join(user.room);
             
            console.log("New WS Connection");    
            socket.emit('message', formatMessage(botname,'welcome to chatBoard'));
           console.log("user==>",user);
            socket.broadcast.
            to(user.name)
            .emit('message',formatMessage(botname,`${user.username} joined the chat`));
        });

      console.log("New WS Connection");    
      socket.emit('message', formatMessage(botname,'welcome to chatBoard'));

      socket.broadcast.emit('message', formatMessage(botname,'A user has joined the chat'));
     
      socket.on('disconnect',()=>{
          io.emit('message', formatMessage(botname, 'A user left the chat  '))
      });

      socket.on('chatMessage',msg=>{
        io.emit('message', formatMessage('USER',msg));
          console.log(msg);
    });

})

const PORT=3000||process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 