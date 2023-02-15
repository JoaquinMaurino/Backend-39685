const socket = io()

socket.emit("mensaje", "Hola esta es mi primera info al servidor") // envio informacion a mi servidor

socket.on("mensaje-general", info =>{
    console.log(info);
})
socket.on("mensaje-socket-propio", info =>{
    console.log(info);
})