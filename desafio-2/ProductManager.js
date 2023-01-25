import { promises as fs } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async addProduct(object) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      const objCode = data.map((product) => product.code);
      const objExist = objCode.includes(object.code);
      if (objExist) {
        console.log("Codigo de producto existente, intente otro");
      } else if (Object.values(object).includes("")) {
        console.log(
          "Todos los campos del producto deben estar completos para poder ser ingresado"
        );
      } else {
        let id;
        id = data.length + 1;
        const newObject = { ...object, id };
        data.push(newObject);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return console.log(
          `Agregaste el producto con id: ${newObject.id} exitosamente`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf8");
      return JSON.parse(read);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const product = data.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const productoEliminado = JSON.stringify(data.find((product) => product.id === id));
      const newData = data.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
      return console.log(`El producto ${productoEliminado} ha sido eliminado exitosamente`)
    } catch (error) {
      console.log(error);
    }
   
  }
  async updateProduct(id, entry) {

  }
}

const products = new ProductManager("./data.json");

products.addProduct({
  title: "Cafe",
  description: "Blend colombiano",
  price: 6500,
  thumbnail: "http://www.starbucks.com",
  code: 789,
  stock: 40,
})

products.addProduct({
  title: "Yerba",
  description: "Hierbas",
  price: 850,
  thumbnail: "http://www.taragui.com",
  code: 420,
  stock: 30,
});