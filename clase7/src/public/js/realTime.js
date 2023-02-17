const socket = io.connect();
const form = document.getElementById("formId");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const btnDelete = document.getElementById("deleteAll");

function renderData(data) {
  document.getElementById("products").innerHTML = "";
  data.map((product) => {
    document.getElementById("products").innerHTML += `
      <tr>
        <th scope="row"></th>
        <td>${product.title}</td>
        <td>${product.id}</td>
        <td>$${product.price}</td>
        <td scope="col"><Button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</Button></th>
      </tr>
    `;
  });
}
function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

btnDelete.addEventListener("click", () => {
  socket.emit("deleteAllProducts", []);
});

socket.on("array", (data) => {
  renderData(data);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (productTitle.value && productPrice.value) {
    const newProduct = {
      title: productTitle.value,
      price: productPrice.value,
    };
    productTitle.value = "";
    productPrice.value = "";
    socket.emit("product", newProduct);
  } else {
    const error = document.getElementById("error");
    error.innerHTML =
      "Completar los campos del formulario para agregar producto";
  }
});
