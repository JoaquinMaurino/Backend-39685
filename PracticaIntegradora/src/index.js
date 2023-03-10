import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io'
import { ManagerMessageMongoDB } from './dao/MongoDB/models/Message.js'
import {engine} from 'express-handlebars'
import * as path from "path";
import { __dirname } from "./path.js";
import routerProducts from './routes/productsRoutes.js'
const app = express()
const managerMessage = new ManagerMessageMongoDB()

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
let messagesArr = [];
const io = new Server(server)
io.on("connection", async (socket)=>{
    socket.on("message", async (info)=>{
        messagesArr.push(info)
        await managerMessage.addElements([info])
/*         const messages = await managerMessage.getElements()
        console.log(messages); */
        socket.emit("allMessages", messagesArr)
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