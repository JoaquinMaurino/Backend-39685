import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const router = Router();
const manager = new ProductManager("src/models/data.json");

router.get("/", async (req, res) => {
  const products = await manager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(JSON.stringify(products.slice(0, limit)));
  } else {
    res.send(JSON.stringify(products));
  }
});

router.get("/:id", async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.json({ Error: "id not found" });
  }
});

router.post("/", async (req, res) => {
  const product = await manager.addProduct(req.body);
  res.send(`Producto ${JSON.stringify(product)} creado`);
});

router.put("/:id", async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  if (product) {
    const product = await manager.updateProduct(
      req.params.id,
      req.query.params,
      req.query.params
    );
    res.send(`Producto ${JSON.stringify(product)} actualizado`);
  } else {
    res.json({ Error: "id not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const product = await manager.getById(parseInt(req.params.id));
  if (product) {
    await manager.deleteProduct(req.params.id);
    res.send(`Producto ${JSON.stringify(product)} eliminado`);
  } else {
    res.json({ Error: "id not found" });
  }
});


export default router;