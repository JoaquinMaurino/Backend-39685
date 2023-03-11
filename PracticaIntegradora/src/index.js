import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'
import {engine} from 'express-handlebars'
import * as path from "path";
import { __dirname } from "./path.js";
import routerProducts from './routes/productsRoutes.js'
import { info } from 'console'
const app = express()


//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//HBS Engine:
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//puerto 
app.set("port", process.env.PORT || 8080)

const server = app.listen(app.get("port"), ()=>{
    console.log(`Server running on Port: ${app.get("port")}`);
})

//socket.io
const io = new Server(server)

const data = await getManagerMessages();
const managerMessage = new data.ManagerMessageMongoDB;
let messagesArr = []

io.on("connection", async (socket)=>{
    console.log("Socket connected");
    socket.emit("allMessages", messagesArr)
    socket.on("message", async (info)=>{
        await managerMessage.addElements([info])
        messagesArr.push(info)
        io.emit("allMessages", messagesArr)
    })
    socket.on("emptyArr", info=>{
        messagesArr = info
        io.emit("allMessages", info)
    })
})

//Routes
app.use("/", express.static(__dirname + "/public"));

// Messages View
app.get("/chat", (req, res)=>{
    res.render("chat")
})

//Products
app.get("/products", routerProducts)