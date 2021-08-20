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
            to(user.room)
            .emit('message',formatMessage(botname,`${user.username} joined the chat`));
        
            io.to(user).emit('roomUsers',{
              room:user.room,
              users:getRoomUsers(user.room)
            })
          });


      socket.on('chatMessage',msg=>{
         const user=getCurrentUser(socket.id);
         io.to(user.room).emit('message',formatMessage(user.username,msg))
        io.emit('message', formatMessage('USER',msg));
          console.log(msg);
    });

    socket.on('disconnect',()=>{
         const user=userLeave(socket.id);
         if(user)
         {
         io.to(user.room).emit('message',formatMessage(botname,`${user.username} has left the chat`));  
         }
          // io.emit('message', formatMessage(botname, 'A user left the chat  '))
      });
});

const PORT=3000||process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 