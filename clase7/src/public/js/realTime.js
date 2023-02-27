const socket = io.connect();
const form = document.getElementById("formId");
const productTitle = document.getElementById("title");
const productDesc = document.getElementById("desc");
const productPrice = document.getElementById("price");
const productImg = document.getElementById("img");
const productCode = document.getElementById("code");
const productStock = document.getElementById("stock");
const productCat = document.getElementById("cat");
const btnDelete = document.getElementById("deleteAll");


//Renderiza los productos del array dentro de la table-row
function renderData(data) {
  document.getElementById("products").innerHTML = "";
  data.map((product) => {
    document.getElementById("products").innerHTML += `
      <tr>
        <th scope="row"></th>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td><img src="${product.img}"/></td>
        <td>${product.price}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td>${product.category}</td>
        <td>${product.status}</td>
        <td scope="col"><Button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</Button></th>
      </tr>
    `;
  });
}
//Elimina un producto, envia su id al servidor
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

//Boton que elimina todos los producos, envia un array vacio al servidor
btnDelete.addEventListener("click", () => {
  socket.emit("deleteAllProducts", []);
});


//Recibo error del servidor por CODE de producto existente
socket.on("error-message", error=>{
  document.getElementById("errorCode").innerHTML = "*" + error
})

// Invoco la funcion renderData y le paso como parametro el array que recibo del servidor
socket.on("array", (data) => {
  renderData(data);
});


// Formulario para cargar producto
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (productTitle.value &&  productDesc.value && productCode.value && productStock.value && productCat.value && productPrice.value) {
    const newProduct = {
      title: productTitle.value,
      description: productDesc.value,
      img: productImg.value,
      price: productPrice.value,
      code: productCode.value,
      stock: productStock.value, 
      category: productCat.value, 
      status: "True"
    };
    productTitle.value = "";
    productDesc.value = "";
    productCode.value = "";
    productStock.value = "";
    productCat.value = "";
    productImg.value = "";
    productPrice.value = "";
    socket.emit("product", newProduct);
  } else {
    const error = document.getElementById("error");
    error.innerHTML =
      "*Debe completar todos los campos del formulario para agregar producto";
  }
});
