import {Schema} from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB

const productSchema = new Schema({
    nombre: String, 
    marca: String,
    price: Number,
    sock: Number
})

export default class ManagerProductMongoDB extends ManagerMongoDB {
    constructor(){
        super(url, 'products', productSchema)
    }
}