import express from "express";
import routerProducts from "./routes/productsRoutes.js";
import routerCarts from "./routes/cartsRoutes.js";
import { __dirname } from "./path.js";
import {engine} from 'express-handlebars'
import { Server } from "socket.io";
import * as path from 'path'

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});


//Middlewares:
app.use(express.urlencoded({ extended: true })); // Permite realizar consultas den la URL (req.query)
app.use(express.json()); // Permite enviar objetos json (req.body)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')) //___dirname + views

//Server IO
const io = new Server(server)

io.on("connection", (socket)=>{ //io.on se establece la conexion con el cliente
  console.log("Cliente conectado");

  socket.on("mensaje", info=>{
    console.log(info);
  })  // socket.on recibo informacion de mi cliente

  socket.emit("mensaje-general", "Hola desde mensaje general") // envio mensaje a todos los clientes

  socket.broadcast.emit("mensaje-general", "Hola desde mensaje socket propio") // Envio un mensaje a todos los clientes conectados a otros sockets menos al que esta conectado a este socket actualmente
})

//Routes
app.use('/', express.static(__dirname+'/public'))
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
//HBS:
app.get('/', (req, res)=>{
  const user = {
    nombre: "Pablo", 
    email: "pe@gmail.com", 
    rol: "Profe", 
  }
  const cursos = [
    {numero: 123, dia: 'Lun y Mar', turno: 'Tarde'},
    {numero: 789, dia: 'Lun y Mar', turno: 'Mañana'},
    {numero: 456, dia: 'Lun y Mar', turno: 'Noche'}
  ]
  res.render("home",{
    mensaje: "Pepe",
    user, 
    isTutor: user.rol === "Tutor", 
    cursos
  })
})











//import multer from "multer";
//Config basica de multer:
//const upload = multer({ dest: "src/public/img" });
//Config avanzada:
/* const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'src/public/img')
  }, 
  filename: (req, file, cb)=>{
    cb(null, `${file.originalname}`)
  }
})
 const upload = multer({storage:storage}) */

 /* app.post("/upload", upload.single("product"), (req, res) => {
  console.log(req.body);
  res.send("Imagen cargada");
}); */