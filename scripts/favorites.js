export const urlFavorites = "http://localhost:3000/favorites"
import {  getProductsFromUrl } from "./products.js";
console.log("conectado a favorites.js")
export const productContainerFavorites = document.querySelector('.container-products-favorites');


  // *********************Pintar cards de productos favoritos ********************************

export const printProductsInFavorites = async () => {
  const products = await getProductsFromUrl(urlFavorites);
  products.forEach((product) => {
    printProduct(productContainerFavorites, product);
  });
  // console.log(products);
};
 document.addEventListener('DOMContentLoaded', async () => {
  await printProductsInFavorites();
 });


 // agrego el elemento al html
 export const printProduct = (container, product) => {
  container.innerHTML += `
  <!-- ***************cards de producto***************** -->
  <div class="col  card-product">
    <div class="card h-100">
    <i class="fa-sharp fa-solid fa-circle-xmark fs-2 close-btn" data-delete-favorite="favorite" id=${product.id}></i>
        <div class="new" >

    </div>
    <div class="d-flex justify-content-center" >
    <img src="${product.img}" class="" alt="..." style="max-height:150px">
    </div>
      <div class="card-body">
        <p class="card-text text-truncate">${product.category}</p>
        <h5 class="card-title title fs-6">${product.name} ${product.weight}</h5>
        <p class="card-text text-truncate">${product.weight}</p>
        <p class="card-text text-truncate text-success">$${product.price} <span class="text-decoration-line-through text-dark"> $${product.price - (product.price * product.discount / 100)}</span></p>
      </div>
      <div>
        <div class="row bg-success justify-content-center align-items-center mx-2  mb-3 py-1 rounded-pill">
          <div class="col text-start">
            <i class="fa-solid fa-minus rounded-circle bg-light p-2"></i>
          </div>
          <div class="col">
            <p class="card-text text-center" data-product="add" id=${product.id}>ADD</p>
          </div>
          <div class="col text-end">
            <i class="fa-solid fa-plus rounded-circle bg-light p-2 m-0"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ***************cards de producto***************** -->
    `;
}


// *******************eliminar un producto de favoritos************************

document.addEventListener("click", (event) => {
  // console.log(event.target);
//indico el atributo donde quiero escuchar el click
  const favoriteId = event.target.getAttribute("id");
  const dataDeleteFavorite = event.target.getAttribute("data-delete-favorite")

if (dataDeleteFavorite === "favorite") {
  console.log("voy a borrar", favoriteId)

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

async function deleteData(id) {
  try {
    const response = await axiosInstance.delete(`/favorites/${id}`);
  } catch (error) {
    console.error(error);
  }
}
deleteData(Number(favoriteId))
}
});

// const printHeart = document.querySelector('.print-heart-red')
// console.log(printHeart)

//4. Escucho el click sobre cada product
document.addEventListener("click", (event) => {
  // console.log(event.target);
 //indico el atributo donde quiero escuchar el click
 const productTarget = event.target.getAttribute("data-product");
   if (productTarget === "add") {
     event.preventDefault();
     console.log('voy a agregar a carrito');
     const productToCart = event.target.getAttribute("id");
     //pasar el objeto al json
     localStorage.setItem("productToCart", JSON.stringify(productToCart));
     //  traer el id del json
     const productIdFromJson = JSON.parse(localStorage.getItem("productToCart")) || 0;
     obtenerObjetoPorId(productIdFromJson, urlShopping);
   }
 });
