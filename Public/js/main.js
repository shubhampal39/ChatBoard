const chatForm=document.getElementById('chat-form');
const socket=io();
const chatMessage=document.querySelector('.chat-messages'); 
//get userbname and room form url

const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true,

});
console.log(username,room);

socket.emit('joinRoom',{username,room});

//message form server
socket.on('message',message=>{
  console.log(message);
  outPutMessage(message);  
});

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    socket.emit('chatMessage',msg);
    console.log(msg);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

function outPutMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span>
     <p class="text"> 
     ${message.text}
     </p>`;
     document.querySelector('.chat-messages').appendChild(div);
}