import 'dotenv/config'

import express from 'express'
import { Server } from 'socket.io'
import { getManagerMessages } from './dao/daoManager.js'
import {engine} from 'express-handlebars'
import * as path from "path";
import { __dirname } from "./path.js";


const app = express()
const managerMessage = getManagerMessages()

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
const messages = [];
const io = new Server(server)

io.on("connection", async (socket)=>{

    socket.on("message", async (info)=>{
        await managerMessage.getElements([info])
        const messages = await managerMessage.getElements()
        console.log(messages);
        socket.emit("allMessages", messages)
    })
})

//Routes
app.use("/", express.static(__dirname + "/public"));

// Messages View
app.get("/messages", (req, res)=>{
    res.render("messages")
})
