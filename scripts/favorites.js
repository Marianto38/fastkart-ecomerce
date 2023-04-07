import {printProduct, url  } from "./products.js";
export const urlFavorites = "http://localhost:3000/favorites"

console.log("conectado a favorites.js")
const containerProduct = document.querySelector('.container-products-favorites')
console.log(containerProduct);

 //escuchar el id en el local
 const productId = JSON.parse(localStorage.getItem("productToFavorite")) || 0;
console.log(productId)
let productFromLs = {}

// función para obtener un objeto por id
async function obtenerObjetoPorId(id) {
  try {
    const response = await axios.get(`${url}/${id}`);
    productFromLs = response.data;
    console.log(productFromLs)
    for (const key in productFromLs) {
      if (productFromLs.hasOwnProperty.call(productFromLs, key)) {
        const productNew =
          {
            "id": `${productFromLs.id}`,
            "name": `${productFromLs.name}`,
            "weight": `${productFromLs.weight}`,
            "price": `${productFromLs.price}`,
            "discount": `${productFromLs.discount}`,
            "category": `${productFromLs.category}`,
            "img": `${productFromLs.img}`
          }

          async function enviarObjeto(objeto) {
            try {
              const response = await axios.post(urlFavorites, objeto);
              return response.data;
            } catch (error) {
              console.error(error);
            }
          }
          enviarObjeto(productNew)

      }
    }
  } catch (error) {
    console.error(error);
  }
}
obtenerObjetoPorId(productId)



  // *********************Pintar cards de productos ********************************

export const productContainerFavorites = document.querySelector('.container-products-favorites');
console.log(productContainerFavorites);

export const getProducts = async () => {
  try {
    const response = await axios.get(urlFavorites);
    const data = response.data;
    console.log("data del getProducts", data);

    // recorro el objeto data entregado por el fetch
    for (const key in data) {
      if (data.hasOwnProperty.call(data, key)) {
        const product = data[key];
        console.log("un producto", product);

        printProduct(productContainerFavorites, product);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

getProducts();
