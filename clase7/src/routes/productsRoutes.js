import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const routerProducts = Router();
const manager = new ProductManager("src/models/products.json");

routerProducts.get("/", async (req, res) => {
  const products = await manager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(JSON.stringify(products.slice(0, limit)));
  } else {
    res.send(JSON.stringify(products));
  }
});

routerProducts.get("/:id", async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.json({ Error: "id not found" });
  }
});

routerProducts.post("/", async (req, res) => {
  const product = await manager.addProduct(req.body);
  res.send(`Producto ${JSON.stringify(product)} creado`);
});

routerProducts.put("/:id", async (req, res) => {
  //const { title, description, price, thumbnail, code, stock } = req.body;
  const product = await manager.updateProduct(
    parseInt(req.params.id),
    req.body
  );
  res.send(`Producto ${JSON.stringify(product)} actualizado`);
});

routerProducts.delete("/:id", async (req, res) => {
  const product = await manager.deleteProduct(parseInt(req.params.id));
  res.send(`Producto ${JSON.stringify(product)} eliminado`);
});

export default routerProducts;
