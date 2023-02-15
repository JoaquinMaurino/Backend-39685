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
        return "Codigo de producto existente, intente otro";
      } else if (Object.values(object).includes(""||null||false)) {
        return "Todos los campos del producto deben estar completos para poder ser ingresado";
      } else {
        let id;
        data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
        const newObject = {id,...object};
        data.push(newObject);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return newObject;
      }
    } catch (error) {
      throw error;
    }
  }
  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  async deleteProduct(id) {
    const array = await this.getProducts();
    try {
      const productoEliminado = array.find((product) => product.id === id);
      if (!productoEliminado) {
        throw new Error();
      }
      const newData = array.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newData, null, 2), "utf-8");
      return productoEliminado;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, code, stock, category, status }
  ) {
    const array = await this.getProducts();
    try {
      if (array.some((product) => product.id === id)) {
        const index = array.findIndex((product) => product.id === id);
        array[index].title = title;
        array[index].description = description;
        array[index].price = price;
        array[index].thumbnail = thumbnail;
        array[index].code = code;
        array[index].stock = stock;
        array[index].category = category;
        array[index].status = status;
        await fs.writeFile(this.path, JSON.stringify(array, null, 2), "utf8");
        return this.getById(id);
      } else {
        return "Porducto no encontrado";
      }
    } catch (error) {
      console.log("Not found");
    }
  }
}

export default ProductManager;
