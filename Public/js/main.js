const chatForm=document.getElementById('chat-form');
const socket=io();

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
});


function outPutMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Brad <span>9.12pm</span>
     <p class="text"> 
     ${message}
     </p>`;
     document.querySelector('.chat-messages').appendChild(div);
}