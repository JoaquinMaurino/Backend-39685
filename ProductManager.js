class ProductManager {
  constructor() {
    this.products = [];
  }
  addProduct(object) {
    const objCode = this.products.map((product) => product.code);
    const objExist = objCode.includes(object.code);
    if (objExist) {
      console.log("Codigo de producto existente, intente otro");
    } else if (Object.values(object).includes("")) {
      console.log(
        "Todos los campos del producto deben estar completos para poder ser ingresado"
      );
    } else {
      let id;
      this.products.length === 0 ? (id = 1) : (id = this.products.length + 1);
      const newObject = { ...object, id };
      this.products.push(newObject);
    }
  }
  getProducts() {
    return this.products;
  }
  getPorductById(id) {
    const productFind = this.products.find((product) => id === product.id);
    if (productFind) {
      return JSON.stringify(productFind);
    } else {
      console.log("Not Found");
    }
  }
}

const clase1 = new ProductManager();

console.log(clase1);

clase1.addProduct({
  title: "Cafe",
  description: "Blend colombiano",
  price: 6500,
  thumbnail: "http://www.starbucks.com",
  code: 789,
  stock: 40,
});

console.log(clase1);

clase1.addProduct({
  title: "Yerba",
  description: "Hierbas",
  price: 850,
  thumbnail: "http://www.taragui.com",
  code: 420,
  stock: 30,
});

clase1.addProduct({
  title: "Yerba",
  description: "Hierbas",
  price: 850,
  thumbnail: "http://www.taragui.com",
  code: 420,
  stock: 30,
});

clase1.addProduct({
  title: "Yerba",
  description: "",
  price: 850,
  thumbnail: "http://www.taragui.com",
  code: 598,
  stock: 30,
});

console.log(clase1);

console.log("El producto seleccionado es:" + clase1.getPorductById(2));

/* {title: 
description :
price:
thumbnail:
code:
stock:} */
