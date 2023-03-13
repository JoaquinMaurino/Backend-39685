import { Schema } from "mongoose";
import { ManagerMongoDB } from "../../../db/mongoDBManager.js";

const url = process.env.URLMONGODB

const userSchema = new Schema({
    name: String, 
    surname: String, 
    email: {
        type: String,
        unique: true
    }, 
    password: String
})

export default class ManagerUsersMongoDB extends ManagerMongoDB {
    constructor(){
        super(url, 'users', userSchema)
    }
}