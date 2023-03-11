const socket = io.connect();

const messageForm = document.getElementById("messageForm");
const authorMsg = document.getElementById("name");
const email = document.getElementById("email");
const textMsg = document.getElementById("text");
const btnClear = document.getElementById("btnClear")

async function renderData(data) {
  document.getElementById("messages").innerHTML = "";
  await data.map((message) => {
    document.getElementById("messages").innerHTML += `<div>
            <strong>${message.name}</strong> [${message.email}]: ${message.message}
        </div>`;
  });
}

socket.on("allMessages", (data) => {
  renderData(data);
});

btnClear.onclick = () =>{
  socket.emit("emptyArr", [])
}

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (authorMsg.value && email.value && textMsg.value) {
    const newMessage = {
      name: authorMsg.value,
      email: email.value,
      message: textMsg.value,
    };
    textMsg.value = "";
    socket.emit("message", newMessage);
  } else {
    const error = document.getElementById("error");
    error.innerHTML =
    `<strong>*All fields must be completed in order to send the message</strong>`;
  }
});
