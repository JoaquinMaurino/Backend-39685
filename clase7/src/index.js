import express from "express";
import router from "./routes/products.js";
import { __dirname } from "./path.js";
const app = express();

//Middlewares:
app.use(express.urlencoded({ extended: true })); // Permite realizar consultas den la URL (req.query)
app.use(express.json()); // Permite enviar objetos json (req.body)

//Routes
app.use('/static', express.static(__dirname+'/public'))
app.use('/api/products', router)


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