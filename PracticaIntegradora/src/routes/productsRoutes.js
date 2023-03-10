import { Router } from "express";
import ManagerProductMongoDB from "../dao/MongoDB/models/Product.js";

const routerProducts = Router();
const managerProducts = new ManagerProductMongoDB();

routerProducts.get("/", async (req, res) => {
  let products;
  let { limit } = req.query;
  limit
    ? (products = await managerProducts.getElements(0))
    : (products = await managerProducts.getElements(limit));
});

routerProducts.get("/:id", async (req, res) => {
  const product = await managerProducts.getElementById(req.params.id);
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.json({ Error: "id not found" });
  }
});

routerProducts.post("/", async (req, res) => {
  const product = await managerProducts.addElements(req.body);
  res.send({ product });
});

routerProducts.put("/:id", async (req, res) => {
  const product = await managerProducts.updateElement(req.params.id, req.body);
  res.send(JSON.stringify(product));
});

routerProducts.delete("/:id", async (req, res) => {
  const product = await managerProducts.deleteElement(req.params.id);
  res.send(`Producto ${JSON.stringify(product)} eliminado`);
});

export default routerProducts;
