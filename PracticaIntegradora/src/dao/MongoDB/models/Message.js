import {Schema} from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB

const messageSchema = new Schema({
    nombre: String, 
    email: {
        type: String, 
        unique: true
    },
    message: String
})

export class ManagerMessageMongoDB extends ManagerMongoDB {
    constructor(){
        super(url, 'messages', messageSchema)

        //atributos propios de la clase
    }
    
    //metodos propios de la clase
}