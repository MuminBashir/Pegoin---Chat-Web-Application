const socket = io('http://localhost:8000');

//Getting all the DOM elements required
const form = document.getElementById('send-container');
const userInfo = document.getElementById('userInfo');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById("container");

//Audio to play when message sent
var audio = new Audio('../../ting.mp3');

//append function to add element the messageBox dynamically
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if (position == 'left' || position == 'center') {
        audio.play();
    }
}

//Taking username from user
// const username = prompt("Enter your name to join");
socket.emit('new-user-joined');


//socket instance that receives user-joined instance from server and appends it when user joins
socket.on('user-joined', username => {
    append(`<b>${username}</b> <div class="txt">has joined the chat</div>`, 'center')
})

//event listener for when somebody send a message
form.addEventListener('submit', (e) => {
    e.preventDefault();  //prevents page from reloading
    const message = messageInput.value;
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    if(hour>12){
        hour = hour - 12;
    }
    else if(hour == 0){
        hour = 12;
    }
    append(`<b>You:</b> <div class="txt">${message}</div> <div class="time">${hour}:${min}</div>`,'right');
    socket.emit('send', message);
    messageInput.value = "";
});

//socket instance that receives receive instance from server when somebody sends a message and broadcasts/appends it to others
socket.on('receive', data=>{
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    if(hour>12){
        hour = hour - 12;
    }
    else if(hour == 0){
        hour = 12;
    }
    append(`<b>${data.username}:</b> <div class="txt">${data.message}</div> <div class="time">${hour}:${min}</div>`, 'left');
});

//socket instance that receives leave instance from server and append it when user leaves
socket.on('leave', username=>{
    append(`<b>${username}</b> <div class="txt">has left the chat</div>`, 'center');
})
