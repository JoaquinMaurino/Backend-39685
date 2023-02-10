import express from "express";
import routerProducts from "./routes/productsRoutes.js";
import routerCarts from "./routes/cartsRoutes.js";
//import routerCarts from "./routes/carts.js";
import { __dirname } from "./path.js";
import {engine} from 'express-handlebars'
import * as path from 'path'
const app = express();

//Middlewares:
app.use(express.urlencoded({ extended: true })); // Permite realizar consultas den la URL (req.query)
app.use(express.json()); // Permite enviar objetos json (req.body)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views')) //___dirname + views

//Routes
app.use('/', express.static(__dirname+'/public'))
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
//HBS:
app.get('/', (req, res)=>{
  const user = {
    nombre: "Pablo", 
    email: "pe@gmail.com", 
    rol: "Tutor", 
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

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

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