import {Schema} from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = ''

const productSchema = new Schema({
    nombre: String, 
    marca: String,
    price: Number,
    sock: Number
})

export class ManagerProductMongoDB extends ManagerMongoDB {
    constructor(){
        super(url, 'products', productSchema)
    }
}