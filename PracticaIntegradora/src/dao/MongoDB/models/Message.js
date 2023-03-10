import {Schema} from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    name: String, 
    email: String, 
    message: String
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor(){
        super(url, 'messages', messageSchema)

        //atributos propios de la clase

    }
    //metodos propios de la clase
}