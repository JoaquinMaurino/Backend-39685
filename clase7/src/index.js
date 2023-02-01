/* import http from 'http'

const PORT = 4000

const server = http.createServer((req, res)=>{
    res.end(`Hola este es mi primer servidor`)
})

server.listen(PORT, ()=>{
console.log(`Server run on port ${PORT}`);
}) */

import express from "express";

import ProductManager from "../../desafio-2/ProductManager.js";

const manager = new ProductManager("../../Backend 39685/desafio-2/data.json");

const app = express(); // app es igual a la ejecucion de express

app.use(express.urlencoded({extended: true})) // Permite realizar consultas den la URL (req.query)

const PORT = 4000;

//Ruta raiz
app.get("/", (req, res) => {
  res.send("Primer servidor con express");
});


app.get("/products", async (req, res)=>{
const products = await manager.getProducts()
let {limit} = req.query
if(limit){
    res.send(products.slice(0, limit))
}else{
    res.send(products)
}

})

app.get("/products/:id", async (req, res)=>{
const product = await manager.getById(parseInt(req.params.id))
console.log(product);
res.send(product)
})

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
