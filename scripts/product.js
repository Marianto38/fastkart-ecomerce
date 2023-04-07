import {printProduct, url  } from "./products.js";

console.log("conectado a product.js")
const containerProduct = document.querySelector('.container-product-id')
console.log(containerProduct);

 //escuchar el id en el local
 const productId = JSON.parse(localStorage.getItem("productId")) || 0;
console.log(productId)
let data = {}

const getProductById = async (id) => {
  const response = await fetch(`${url}/${id}`);
  data = await response.json();
  console.log("Data del product by id", data);
  printProduct(containerProduct, data)
}
const productById = getProductById(productId);
console.log(productById);
console.log("Data del product by id 44", data);
