import express from "express";
import routerProducts from "./routes/productsRoutes.js";
import routerCarts from "./routes/cartsRoutes.js";
import { __dirname } from "./path.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import * as path from "path";
import mongoose from "mongoose";
import routerUser from "./routes/users.routes.js";

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

//MongoDB connection con Mongoose

mongoose
  .connect(
    "mongodb+srv://joaquin9918:Joaquin9918@cluster0.fphmmi9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Conectado"))
  .catch((error) => console.log("Error en Conexion MongoDBAtlas: ", error));

let products = [
  {
    id: 1,
    title: "Botas Hombre",
    description: "Indumentaria",
    img: "img/BotasHombre.jpeg",
    price: 5000,
    code: "3PR-UD5",
    stock: 8,
    category: "Calzado",
    status: "True",
  },
  {
    id: 2,
    title: "Borcegos Integral Work",
    description: "Borcegos de cuero reforzado.",
    img: "img/BotasMujer.jpeg",
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
    img: "img/Camisa.jpeg",
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
    img: "img/Cargo.jpeg",
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
    img: "img/Chaleco.jpeg",
    price: 6200,
    code: "A7J-P6S",
    stock: 7,
    category: "Chaleco",
    status: "True",
  },
];

//Server IO
const io = new Server(server);
io.on("connection", (socket) => {
  //io.on se establece la conexion con el cliente
  console.log("Cliente conectado");

  socket.emit("array", products);

  socket.on("product", (newProduct) => {
    console.log(newProduct.code);
    const codeArr = products.map((product) => product.code);
    if (codeArr.includes(newProduct.code)) {
      io.emit("error-message", "Codigo de producto existente, intente otro");
    } else {
      let id;
      products.length === 0
        ? (id = 1)
        : (id = products[products.length - 1].id + 1);
      products.push({ id, ...newProduct });
      io.emit("array", products);
    }
  }); // recibo el nuevo producto y lo agrego al array

  socket.on("deleteProduct", (id) => {
    products = products.filter((product) => parseInt(product.id) !== id);
    io.emit("array", products);
  });

  socket.on("deleteAllProducts", (data) => {
    products = data;
    io.emit("array", products);
  });
});

//Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/users", routerUser) // Ruta de MongoDB

//HBS: home
app.get("/", (req, res) => {
  const products = [
    {
      id: 1,
      title: "Botas Hombre",
      description: "Indumentaria",
      img: "img/BotasHombre.jpeg",
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
        "Borcegos de cuero reforzado, con suela febo con cierre lateral. Plantilla termoformada, forrer??a interior absorbente.",
      img: "img/BotasMujer.jpeg",
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
      img: "img/Camisa.jpeg",
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
      img: "img/Cargo.jpeg",
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
      img: "img/Chaleco.jpeg",
      price: 6200,
      code: "A7J-P6S",
      stock: 7,
      category: "Chaleco",
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
