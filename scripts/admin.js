console.log("conectado admin");
import { getProductsFromUrl, urlProducts  } from "./products.js";
const urlUsers = "http://localhost:3000/users"
const formNewProduct = document.querySelector('.form-new-product');
const containerFormEditProduct = document.getElementById('form-edit-product')

const createProduct = () => {
  document.addEventListener('submit', (event) => {
    event.preventDefault();

    const productInfo = {};
    let hasErrors = false; // validar errores en el formulario

    // Recorre todos los elementos del formulario
    for (let key in event.target.elements) {
      const input = event.target.elements[key];
      if (input.nodeName === 'INPUT') {
        // Verifica si el campo está vacío o solo contiene espacios en blanco
        if (input.value.trim().length === 0) {
         alert(`El campo "${input.name}" no puede estar vacío.`);
          hasErrors = true;
          break;
        }
        productInfo[input.name] = input.value; // Agrega el valor del elemento al objeto productInfo
      }
    }

    if (!hasErrors) {
      if (formNewProduct == "form-new-product") {

        addObjectToArray(urlProducts, productInfo)

      }
    }
  });
}
createProduct()


const addObjectToArray = async (url, objectToAdd) => {
  try {
    const response = await axios.post(url, objectToAdd);
    console.log(response.data); // manejar la respuesta según sea necesario
  } catch (error) {
    console.error(error);
  }
};



// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable();
});

const containerShowProductInTable = document.getElementById('container-show-product-in-table')
const printProductsDataTable = async () => {
  const products = await getProductsFromUrl(urlProducts);
  products.forEach((product) => {
    printProduct(product);
  });
  // console.log(products);
};
printProductsDataTable();

const printProduct = ( product) => {

// Obtener la tabla existente por su ID y configurar DataTables
var myTable = $('#dataTable').DataTable();

// Crear un nuevo arreglo de datos para la nueva fila
var newRowData = [
  product.id,
  product.name,
  `<img src="${product.img}" class="" alt="..." style="max-height:50px">`,
  product.weight,
  product.price,
  product.discount,
  `<div class="text-center"><span class="p-1"><button type="button" data="edit" id="${product.id}" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <i data="edit" id="${product.id}" class="fa-solid fa-pen-to-square ">
</button></i></span><span class="p-1"><i class="fa-solid fa-trash-can text-danger"></i></span></div>`
];

// Agregar la nueva fila a la tabla
myTable.row.add(newRowData).draw();


}

let itemId = ""


document.addEventListener("click", async (event) => {
  // event.preventDefault();
  itemId = event.target.getAttribute("id");
  console.log(typeof(itemId))
  const dataItem = event.target.getAttribute("data")
  if (dataItem === "edit") {
    // alert("voy a editar info")
    localStorage.setItem("productToEdit", JSON.stringify(itemId));
    await loadProductToEdit();

    // window.location.href = "../pages/formEditProduct.html";
   }
});

const loadProductToEdit = async () => {
  const productIdFromJson = JSON.parse(localStorage.getItem("productToEdit")) || 0;
  // alert(productIdFromJson)
  // alert(typeof(Number(productIdFromJson)))
  // alert(urlProducts)
  const product = await axios.get(`${urlProducts}/${Number(productIdFromJson)}`);
  const nombre = product.data.name
  // alert(nombre)
  console.log(product)
  const form = document.querySelector('#product-form');
  console.log(form)
  const productNameInput = document.querySelector('.name');
  const productWeightInput = document.querySelector('.weight');
  const productPriceInput = document.querySelector('.price');
  const productDiscountInput = document.querySelector('.discount');
  const productCategoryInput = document.querySelector('.category');
  const productIconInput = document.querySelector('.icon');
  const productImgInput = document.querySelector('.img');
  const productQuantityInput = document.querySelector('.quantity');
console.log("soy datos", product.data.name)
productNameInput.value = product.data.name
  productWeightInput.value = product.data.weight
  productPriceInput.value = product.data.price
  productDiscountInput.value = product.data.discount
  productCategoryInput.value = product.data.category
  productIconInput.value = product.data.icon
  productImgInput.value = product.data.img
  productQuantityInput.value = product.data.quantity

console.log(form)
editProduct(Number(productIdFromJson))
}

const editProduct = (id) => {
  document.addEventListener('submit', (event) => {
    event.preventDefault();

    const productInfo = {};
    let hasErrors = false; // validar errores en el formulario

    // Recorre todos los elementos del formulario
    for (let key in event.target.elements) {
      const input = event.target.elements[key];
      if (input.nodeName === 'INPUT') {
        // Verifica si el campo está vacío o solo contiene espacios en blanco
        if (input.value.trim().length === 0) {
         alert(`El campo "${input.name}" no puede estar vacío.`);
          hasErrors = true;
          break;
        }
        productInfo[input.name] = input.value; // Agrega el valor del elemento al objeto productInfo
      }
    }

    if (!hasErrors) {
      editObjectInArray(urlProducts, id, productInfo)
    }
  });
}



const editObjectInArray = async (url, id, productEdited) => {
  try {
    const response = await axios.get(url);
    const objects = response.data;
    const index = objects.findIndex(obj => obj.id === id);
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
}
