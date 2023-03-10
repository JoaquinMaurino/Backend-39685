const socket = io.connect();

const messageForm = document.getElementById("messageForm");
const authorMsg = document.getElementById("name");
const email = document.getElementById("email");
const textMsg = document.getElementById("text");

async function renderData(data) {
  document.getElementById("messages").innerHTML = "";
  await data.map((message) => {
    document.getElementById("messages").innerHTML += `<div>
            ${message.name} [${message.email}]: ${message.message}
        </div>`;
  });
}

socket.on("allMessages", (data) => {
  renderData(data);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (authorMsg.value && email.value && textMsg.value) {
    const newMessage = {
      name: authorMsg.value,
      email: email.value,
      message: textMsg.value,
    };
    authorMsg.value = "";
    email.value = "";
    textMsg.value = "";
    socket.emit("message", newMessage);
  } else {
    const error = document.getElementById("error");
    error.innerHTML =
      "*Debe completar todos los campos para enviar el mensaje";
  }
});
