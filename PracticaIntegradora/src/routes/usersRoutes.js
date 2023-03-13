import { Router } from "express";
import  ManagerUsersMongoDB  from "../dao/MongoDB/models/user.js";

const routerUsers = Router()
const managerUsers = new ManagerUsersMongoDB();

routerUsers.get("/", async (req, res)=>{
    const users = await managerUsers.getElements()
    res.send({result: "success", payload: users})
})

export default routerUsers;