const form = document.getElementById("formId");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productID = document.getElementById("id");
const socket = io.connect();

function renderData(data) {
  data.map((product) => {
    document.getElementById("products").innerHTML += `
    <div>
    <p>Title: ${product.title}</p>
    <p>ID: ${product.id}</p>
    <p>Price: ${product.price}</p>
    <button onclick="deleteProduct(${product.id})">Eliminar</button>
    </div>
    `
  });
}

function deleteProduct(id){
  socket.emit("deleteProduct", id)
}

/*<p>Id: ${product.id}</p>
<p>Description: ${product.description}</p>
<p>Img: ${product.img}</p>
<p>Code: ${product.code}</p>
<p>Stock: ${product.stock}</p>
<p>Category: ${product.category}</p>
<p>Status: ${product.status}</p>*/

socket.on("array", (data) => {
  renderData(data);
});

form.addEventListener("submit", (e) => {
  if (productTitle.value && productPrice.value && productID.value) {
    const newProduct = {
      id: productID.value,
      title: productTitle.value,
      price: productPrice.value,
    };
    productID.value = "";
    productTitle.value = "";
    productPrice.value = "";
    socket.emit("product", newProduct);
  } else {
    e.preventDefault();
    const error = document.getElementById("error");
    error.innerHTML =
    "Completar los campos del formulario para agregar producto";
  }
});
