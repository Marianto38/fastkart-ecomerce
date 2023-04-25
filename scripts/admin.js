console.log("conectado admin");
import { getProductsFromUrl, urlProducts } from "./products.js";
const containerFormEditProduct = document.getElementById("form-edit-product");
const formNewProduct = document.querySelector(".form-new-product");
const urlAllBuys = "http://localhost:3000/allbuys";
const urlUsers = "http://localhost:3000/users";
let itemId = "";

// **************Crear Productos******************

const createProduct = () => {
  document.addEventListener("submit", (event) => {
    event.preventDefault();

    const productInfo = {};
    let hasErrors = false; // validar errores en el formulario

    // Recorre todos los elementos del formulario
    for (let key in event.target.elements) {
      const input = event.target.elements[key];
      if (input.nodeName === "INPUT") {
        // Verifica si el campo está vacío o solo contiene espacios en blanco
        if (input.value.trim().length === 0) {
          Swal.fire(`El campo "${input.name}" no puede estar vacío.`);

          hasErrors = true;
          break;
        }
        productInfo[input.name] = input.value; // Agrega el valor del elemento al objeto productInfo
      }
    }

    if (!hasErrors) {
      if (formNewProduct == "form-new-product") {
        addObjectToArray(urlProducts, productInfo);
      }
    }
  });
};
createProduct();

// *****Agregar productos al array de Products en json******

const addObjectToArray = async (url, objectToAdd) => {
  try {
    const response = await axios.post(url, objectToAdd);
    console.log(response.data); // manejar la respuesta según sea necesario
  } catch (error) {
    console.error(error);
  }
};

// *******Implementación de datatable*************
$(document).ready(function () {
  $("#dataTable").DataTable();
});

const containerShowProductInTable = document.getElementById(
  "container-show-product-in-table"
);
const printProductsDataTable = async () => {
  const products = await getProductsFromUrl(urlProducts);
  products.forEach((product) => {
    printProduct(product);
  });
  // console.log(products);
};
printProductsDataTable();

const printProduct = (product) => {
  // Obtener la tabla existente por su ID y configurar DataTables
  var myTable = $("#dataTable").DataTable();

  // Crear un nuevo arreglo de datos para la nueva fila
  var newRowData = [
    product.id,
    product.name,
    `<img src="${product.img}" class="" alt="..." style="max-height:50px">`,
    product.weight,
    product.price,
    product.discount,
    product.quantity,
    `<div class="text-center"><span class="p-1"><button type="button" data="edit" id="${product.id}" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <i data="edit" id="${product.id}" class="fa-solid fa-pen-to-square ">
</button></i></span><span class="p-1 ms-1" data="delete" id="${product.id}"><i class="fa-solid fa-trash-can text-danger" data="delete" id="${product.id}"></i></span></div>`,
  ];

  // Agregar la nueva fila a la tabla
  myTable.row.add(newRowData).draw();
};

// *******Escuchar evento para editar o eliminar un producto en Products******

document.addEventListener("click", async (event) => {
  // event.preventDefault();
  itemId = event.target.getAttribute("id");
  console.log(typeof itemId);
  const dataItem = event.target.getAttribute("data");

  if (dataItem === "edit") {
    localStorage.setItem("productToEdit", JSON.stringify(itemId));
    await loadProductToEdit();

    // window.location.href = "../pages/formEditProduct.html";
  } else if (dataItem === "delete") {
    Swal.fire({
      title: "Estas seguro de borrar el producto?",
      text: "No podrás reversar esta operación!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("productToDelete", JSON.stringify(itemId));
        deleteProductById();
        Swal.fire("Borrado!", "El producto ha sido borrado", "success");
      }
    });
  }
});

// ********Cargar el formulario con información del producto a editar******

const loadProductToEdit = async () => {
  const productIdFromJson =
    JSON.parse(localStorage.getItem("productToEdit")) || 0;
  const product = await axios.get(
    `${urlProducts}/${Number(productIdFromJson)}`
  );
  const nombre = product.data.name;
  console.log(product);
  const form = document.querySelector("#product-form");
  console.log(form);
  const productNameInput = document.querySelector(".name");
  const productWeightInput = document.querySelector(".weight");
  const productPriceInput = document.querySelector(".price");
  const productDiscountInput = document.querySelector(".discount");
  const productCategoryInput = document.querySelector(".category");
  const productIconInput = document.querySelector(".icon");
  const productImgInput = document.querySelector(".img");
  const productQuantityInput = document.querySelector(".quantity");
  console.log("soy datos", product.data.name);
  productNameInput.value = product.data.name;
  productWeightInput.value = product.data.weight;
  productPriceInput.value = product.data.price;
  productDiscountInput.value = product.data.discount;
  productCategoryInput.value = product.data.category;
  productIconInput.value = product.data.icon;
  productImgInput.value = product.data.img;
  productQuantityInput.value = product.data.quantity;

  console.log(form);
  editProduct(Number(productIdFromJson));
};

const editProduct = (id) => {
  document.addEventListener("submit", (event) => {
    event.preventDefault();

    const productInfo = {};
    let hasErrors = false; // validar errores en el formulario

    // Recorre todos los elementos del formulario
    for (let key in event.target.elements) {
      const input = event.target.elements[key];
      if (input.nodeName === "INPUT") {
        // Verifica si el campo está vacío o solo contiene espacios en blanco
        if (input.value.trim().length === 0) {
          Swal.fire(`El campo "${input.name}" no puede estar vacío.`);
          hasErrors = true;
          break;
        }
        productInfo[input.name] = input.value; // Agrega el valor del elemento al objeto productInfo
      }
    }

    if (!hasErrors) {
      editObjectInArray(urlProducts, id, productInfo);
    }
  });
};

// **********************Editar un producto de Products****************

const editObjectInArray = async (url, id, productEdited) => {
  try {
    const response = await axios.get(url);
    const objects = response.data;
    const index = objects.findIndex((obj) => obj.id === id);
    if (index !== -1) {
      const response = await axios.patch(`${url}/${id}`, productEdited);
      console.log(response.data);
      return response.data;
    } else {
      console.error(`Object with ID ${id} not found in ${url}`);
    }
  } catch (error) {
    console.error(error);
  }
};

// **********************eliminar un producto de Products****************

const deleteProductById = async () => {
  const productIdToDelete =
    JSON.parse(localStorage.getItem("productToDelete")) || 0;
  const numberId = Number(productIdToDelete);
  try {
    // Crear una instancia de Axios
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
    });

    const response = await axiosInstance.delete(`/products/${numberId}`);
    console.log(response.data);

    localStorage.removeItem("productToDelete");
  } catch (error) {
    console.error(error);
  }
};

// ********imprimir compras para el administrador**************

const containerBuy = document.getElementById("container-buy");
console.log(containerBuy);

const printBuysInShowBuys = async () => {
  const buys = await getProductsFromUrl(urlAllBuys);
  buys.forEach((buy) => {
    console.log(buy.objectInBuys[0].Nombre);
    buy.objectInBuys[1].forEach((products) => {
      console.log(products.name);
    });
    printBuy(containerBuy, buy);
  });
};
printBuysInShowBuys();

const printBuy = (container, buy) => {
  container.innerHTML += `
  <div class="col-1 d-flex align-items-center  border-bottom">
  <p>${buy.id}</p>
  </div>
    <div class="col-4  border-bottom">
      <ul>
        <li>${buy.objectInBuys[0].Nombre}</li>
        <li>${buy.objectInBuys[0].dirección}</li>
        <li>${buy.objectInBuys[0].Teléfono}</li>
      </ul>
    </div>
    <div class=" row col-7  border-bottom">
          ${buy.objectInBuys[1]
            .map(
              (element) =>
                `<div class="row"><div class="col">${element.name}</div> <div class="col">${element.weight}</div> <div class="col">${element.price}</div> <div class="col">${element.quantity}</div> </div>`
            )
            .join("")}
    </div>
    <hr>
  `;
};
