import {printProduct, urlProducts  } from "./products.js";

console.log("conectado a product.js")
const containerProduct = document.querySelector('.container-product-id')
console.log(containerProduct);

 //escuchar el id en el local
 const productId = JSON.parse(localStorage.getItem("productToShow")) || 0;
console.log(productId)
let data = {}

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${urlProducts}/${id}`);
    const data = response.data;
    console.log("Data del product by id", data);
    printProduct(containerProduct, data);
    return data;
  } catch (error) {
    console.log("Error al obtener el producto por ID", error);
  }
}

document.addEventListener("DOMContentLoaded", getProductById(productId));

