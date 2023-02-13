import { promises as fs } from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }
  async createCart(object) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      let id;
      data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
      const newObject = { id, ...object };
      data.push(newObject);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return newObject;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(id) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      const index = data.findIndex((cart) => cart.id === id);
      const prodsInCart = data[index].products;
      prodsInCart.map((product) => {
        product;
      });
      return prodsInCart;
    } catch (error) {
      throw error;
    }
  }

  async createProductInCart(cId, pId) {
    try {
      const read = await fs.readFile(this.path, "utf8")
      const data = JSON.parse(read)
      const cart = data.find(cart => cart.id === cId)
      const prodsInCart = cart.products
      const isInCart = prodsInCart.find(product => product.id === pId)
      if (!isInCart){
        prodsInCart.quantity = 1;
      }else{
        prodsInCart.quantity = quantity++;
      }
      const newProduct = {
        "quantity": prodsInCart.quantity, 
        "id": pId
      }
      prodsInCart.push(newProduct)
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;
