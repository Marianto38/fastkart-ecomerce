export const url = "http://localhost:3000/products"
export const urlProducts = "http://localhost:3000/products"
import {  urlShopping } from "./cart.js";
import {  urlFavorites } from "./favorites.js";
export const productContainer = document.querySelector('.container-products');
const product =
  {
    "id": 1,
    "name": "Papa",
    "weight": "1000g",
    "price": 500,
    "discount": 15,
    "category": "vegetables",
    "stock": 5,
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUQcOiph6tQHO9a_n5Jl6O_pP1dQIGZqwxA&usqp=CAU"
  }

    // *********************Funcion para obtener todos los productos desde una url********************************

    export const getProductsFromUrl = async (urlToGet) => {
      try {
        const response = await axios.get(urlToGet);
        const data = response.data;
        const products = [];

        for (const product of Object.values(data)) {
          // console.log("un producto", product);
          products.push(product);
        }

        return products; // retorno el array de productos
      } catch (error) {
        console.error(error);
      }
    };

    // función para obtener un objeto por id y enviar al array de objetos
export async function obtenerObjetoPorId(id, urlToPost) {
  try {
    const response = await axios.get(`${url}/${id}`);
    const response2 = await axios.post(urlToPost, response.data);
    console.log(response2);

  } catch (error) {
    console.error(error);
  }
}


  // *********************Pintar cards de productos ********************************

  export const printProductsInHome = async () => {
    const products = await getProductsFromUrl(urlProducts);
    products.forEach((product) => {
      printProduct(productContainer, product);
    });
    // console.log(products);
  };

  document.addEventListener('DOMContentLoaded', async () => {
    await printProductsInHome();
  });


 // agrego el elemento al html
 export const printProduct = (container, product) => {
  container.innerHTML += `
  <!-- ***************cards de producto***************** -->
  <div class="col  card-product">
    <div class="card h-100">
    <i class="fa-sharp fa-solid fa-circle-xmark fs-2 close-btn"></i>
    <div class="row justify-content-center card-links" >
      <div class="col px-3" data-product="product" id=${product.id}>
        <i class="fa-solid fa-eye"  data-product="product" id=${product.id}></i>
      </div>
      <div class="col border-start border-end px-3">
        <i class="fa-solid fa-arrows-rotate"></i>
      </div>
      <div class="col px-3" data-product="favorite" id=${product.id}>
        <i class="fa-solid fa-heart text-dark" data-product="favorite" id=${product.id}></i>
      </div>
    </div>
    <div class="new" >

    </div>
    <div class="d-flex justify-content-center" >
    <img src="${product.img}" class="" alt="..." style="max-height:150px">
    </div>
      <div class="card-body">
        <p class="card-text text-truncate">${product.category}</p>
        <h5 class="card-title title fs-6">${product.name} ${product.weight}</h5>
        <p class="card-text text-truncate">${product.weight}</p>
        <p class="card-text text-truncate"> $${product.price - (product.price * product.discount / 100)} <span class="text-decoration-line-through"> $${product.price}</span></p>
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


//4. Escucho el click sobre cada product

document.addEventListener("click", (event) => {

 console.log(event.target);
//indico el atributo donde quiero escuchar el click
  const productTarget = event.target.getAttribute("data-product");
  if (productTarget === "product") {
    event.preventDefault();
    console.log('voy a ver product');
    const productToShow = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("productToShow", JSON.stringify(productToShow));
    window.location.href = "./product.html";
  }
  else if (productTarget === "favorite") {
    event.preventDefault();
    console.log('voy a agregar a favoritos');
    const productToFavorite = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("productToFavorite", JSON.stringify(productToFavorite));
    //escuchar el id en el local
    const productId = JSON.parse(localStorage.getItem("productToFavorite")) || 0;
    console.log(productId)
    obtenerObjetoPorId(productId, urlFavorites)

  }
  else if (productTarget === "add") {
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
