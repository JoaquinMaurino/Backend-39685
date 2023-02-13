import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const  routerCarts = Router();
const cartManager = new CartManager("src/models/carts.json");

routerCarts.get('/:id', async (req, res)=>{
    const prodsInCart = await cartManager.getProducts(parseInt(req.params.id));
    if(prodsInCart.length === 0 ){
        res.send(`There are no products in this Cart ID: ${req.params.id}`)
    }else{
        res.send(`The Cart (ID: ${req.params.id}) contains the following products: ${JSON.stringify(prodsInCart)}`)
    
    }
    
})

routerCarts.post('/', async (req, res)=>{
    const newCart = await cartManager.createCart(req.body)
    res.send(`New Cart ${JSON.stringify(newCart)} created`)
})


routerCarts.post('/:cId/products/:pId', async (req, res)=>{
    const newProdInCart = await cartManager.createProductInCart(parseInt(req.params.cId), parseInt(req.params.pId))
    res.send(`New product added to Cart with ID: ${req.params.cId}`)
})


export default routerCarts;