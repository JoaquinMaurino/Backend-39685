import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const  routerCarts = Router();
const cartManager = new CartManager("src/models/carts.json");

routerCarts.get('/:id', async (req, res)=>{
    const prodsInCart = await cartManager.getProducts(parseInt(req.params.id));
    console.log(prodsInCart);
    res.send(`El carrito con el ID: ${req.params.id} contiene los siguientes productos: ${JSON.stringify(prodsInCart)}`)
    
})

routerCarts.post('/', async (req, res)=>{
    const newCart = await cartManager.createCart(req.body)
    console.log(newCart);
    res.send(`Nuevo carrito ${JSON.stringify(newCart)} creado`)
})


routerCarts.post('/:cId/products/:pId', async (req, res)=>{
    const newProdInCart = await cartManager.createProductInCart(parseInt(req.params.cId), parseInt(req.params.pId))
    console.log(newProdInCart);
    res.send(`El producto: ${JSON.stringify(newProdInCart)} fue agregado al carrito con el ID: ${req.params.cId}`)
})



export default routerCarts;