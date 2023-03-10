const socket = io.connect();

const messageForm = document.getElementById("messageForm")
const authorMsg = document.getElementById("name")
const textMsg = document.getElementById("text")

socket.on("allMessages", (data)=>{
    renderData(data)
})

function renderData(data) {
    document.getElementById("messages").innerHTML = "";
    data.map(message=>{
        document.getElementById("messages").innerHTML = `${message.author}: ${message.text}`;
    }) 
}

messageForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newMessage = {
        author: authorMsg.value,
        text: textMsg.value
    }
    authorMsg.value = ""
    textMsg.value = ""
    socket.emit("message", newMessage)

});