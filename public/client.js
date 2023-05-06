const socket = io()

const body = document.querySelector('body')
const UserNameContainer = document.querySelector('.usernamecontainer')
const Username = document.querySelector('.Usernameinput')
const Setuser = document.querySelector('.UserSetbtn')
const messagecontainer = document.querySelector('.message-container')
const messageform = document.querySelector('.messageform')
const sendmsgbtn = document.querySelector('.submitmsgbtn')
const messageinp = document.querySelector('.messageinp')

Setuser.addEventListener('click',function(){
    if (Username.value.length > 1){
        const Username = document.querySelector('.Usernameinput')
        UserNameContainer.style.display = "none"
        body.style.height = "100vh"
        messagecontainer.style.display = "block"
        messageform.style.display = "block"
        socket.emit('usernameStore',Username.value)
    }
})

sendmsgbtn.addEventListener('click',function(){
    const messageinp = document.querySelector('.messageinp')
    if (messageinp.value.length > 1){
        socket.emit('recvMessage',messageinp.value)
        messageinp.value = ''
        scrollToBottom()
    }
})

messageinp.addEventListener('keyup',function(e){
    if (e.key === 'Enter'){

        const messageinp = document.querySelector('.messageinp')
        if (messageinp.value.length > 1){
            socket.emit('recvMessage',messageinp.value)
            messageinp.value = ''
            scrollToBottom()
        }
    }
})

socket.on('msg-inc',data => {
    const messagecontainer = document.querySelector('.message-container')
    var item = document.createElement('div')
    item.className = "msg-inc"
    item.innerHTML = `<h4 class="author">${data.user}</h4><p class="msg">${data.msg}</p>`
    messagecontainer.appendChild(item)
    scrollToBottom()
})

socket.on('msg-out',data => {
    const messagecontainer = document.querySelector('.message-container')
    var item = document.createElement('div')
    item.className = "msg-out"
    item.innerHTML = `<h4 class="author">${data.user}</h4><p class="msg">${data.msg}</p>`
    messagecontainer.appendChild(item)
    scrollToBottom()
})

socket.on('user-joined',data => {
    const messagecontainer = document.querySelector('.message-container')
    var item = document.createElement('div')
    item.className = "new-join"
    item.innerHTML = `${data} joined the chat`
    messagecontainer.appendChild(item)
    scrollToBottom()
})

socket.on('user-left',data => {
    const messagecontainer = document.querySelector('.message-container')
    var item = document.createElement('div')
    item.className = "new-join"
    item.innerHTML = `${data} left the chat`
    messagecontainer.appendChild(item)
    scrollToBottom()
})

function scrollToBottom(){
    messagecontainer.scrollTop = messagecontainer.scrollHeight
}