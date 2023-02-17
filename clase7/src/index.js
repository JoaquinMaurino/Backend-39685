import express from "express";
import routerProducts from "./routes/productsRoutes.js";
import routerCarts from "./routes/cartsRoutes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import * as path from "path";

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

//Middlewares:
app.use(express.urlencoded({ extended: true })); // Permite realizar consultas den la URL (req.query)
app.use(express.json()); // Permite enviar objetos json (req.body)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views")); //___dirname + views

const products = [];

//Server IO
const io = new Server(server);
io.on("connection", (socket) => {
  //io.on se establece la conexion con el cliente
  console.log("Cliente conectado");
  
  socket.on("product", (newProduct) => {
    products.push(newProduct);
  }); // recibo el nuevo producto y lo agrego al array
  
  socket.on("deleteProduct", id=>{
    products.filter(product=>product.id !== id)
  })
  
  socket.emit("array", products);
});

//Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//HBS: home
app.get("/", (req, res) => {
  const products = [
    {
      id: 1,
      title: "Botas Hombre",
      description: "Indumentaria",
      img: "public/img/BotasHombre.jpeg",
      price: 5000,
      code: "3PR-UD5",
      stock: 8,
      category: "Calzado",
      status: "True",
    },
    {
      id: 2,
      title: "Borcegos Integral Work",
      description:
        "Borcegos de cuero reforzado, con suela febo con cierre lateral. Plantilla termoformada, forrería interior absorbente.",
      img: "public/img/BotasMujer.jpeg",
      price: 6000,
      code: "9EQ-LAA",
      stock: 5,
      category: "Calzado",
      status: "True",
    },
    {
      id: 3,
      title: "Camisa",
      description: "Indumentaria",
      img: "public/img/Camisa.jpeg",
      price: 4500,
      code: "9KT-8FL",
      stock: 15,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 4,
      title: "Cargo",
      description: "Indumentaria",
      img: "public/img/Cargo.jpeg",
      price: 8700,
      code: "9QS-D9R",
      stock: 18,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 5,
      title: "Chaleco",
      description: "Indumentaria",
      img: "public/img/Chaleco.jpeg",
      price: 6200,
      code: "A7J-P6S",
      stock: 7,
      category: "Chaleco",
      status: "True",
    },
    {
      id: 6,
      title: "Chaleco Blindado",
      description: "Indumentaria",
      img: "public/img/ChalecoBlindado.jpeg",
      price: 6200,
      code: "DCE-ZBA",
      stock: 7,
      category: "Chaleco",
      status: "True",
    },
    {
      id: 7,
      title: "Chaqueta",
      description: "Indumentaria",
      img: "public/img/Chaqueta.jpeg",
      price: 6200,
      code: "DPF-S83",
      stock: 7,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 8,
      title: "Cinturones",
      description: "Indumentaria",
      img: "public/img/Cinturones.jpeg",
      price: 6200,
      code: "EMV-7U4",
      stock: 7,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 9,
      title: "Pantalon",
      description: "Indumentaria",
      img: "public/img/Pantalon.jpeg",
      price: 6200,
      code: "KBL-4RG",
      stock: "7",
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 10,
      title: "Remera",
      description: "Indumentaria",
      img: "public/img/Remera.jpeg",
      price: 6200,
      code: "L3C-CTJ",
      stock: 7,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 11,
      title: "Short",
      description: "Indumentaria",
      img: "public/img/Short.jpeg",
      price: 6200,
      code: "LAF-YSL",
      stock: 7,
      category: "Indumentaria",
      status: "True",
    },
    {
      id: 12,
      title: "Zapatos Hombre",
      description: "Indumentaria",
      img: "public/img/ZapatosHombre.jpeg",
      price: 6200,
      code: "Z3N-667",
      stock: 7,
      category: "Calzado",
      status: "True",
    },
    {
      id: 13,
      title: "Zapatos Mujer",
      description: "Indumentaria",
      img: "public/img/ZapatosMujer.jpeg",
      price: 6500,
      code: "ZPG-CN7",
      stock: 12,
      category: "Calzado",
      status: "True",
    },
  ];
  res.render("home", {
    products,
  });
});

//HBS: Partial => Real Time Products
app.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts");
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
