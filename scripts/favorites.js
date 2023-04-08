import { url  } from "./products.js";
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
          async function getProductos() {
            try {
              const response = await axios.get(urlFavorites);
              const data = response.data;
              for (const key in data) {
                if (data.hasOwnProperty.call(data, key)) {
                  const element = data[key];
                  console.log(element.id)
                  console.log(typeof(productNew.id))
                  if (element.id == Number(productNew.id)) {
                      console.log(`El producto con id ${productNew.id} ya existe en el array`);
                    } else {
                      enviarObjeto(productNew)
                      console.log(`El producto con id ${productNew.id} no existe en el array`);
                    }
                }
              }
              // return data;
            } catch (error) {
              console.error(error);
            }
          }

          getProductos();


          async function enviarObjeto(objeto) {
            try {
              const response = await axios.post(urlFavorites, objeto);
              return response.data;
            } catch (error) {
              console.error(error);
            }
          }


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





 // agrego el elemento al html
 export const printProduct = (container, product) => {
  //Vacio el contenedor
  // container.innerHTML = "";
  container.innerHTML += `
  <!-- ***************cards de producto***************** -->
  <div class="col  card-product">
    <div class="card h-100">
    <i class="fa-sharp fa-solid fa-circle-xmark fs-2 close-btn" data-delete-favorite="favorite" id=${product.id}></i>
        <div class="new" >

    </div>
      <img src="${product.img}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text text-truncate">${product.category}</p>
        <h5 class="card-title title fs-6">${product.name} ${product.weight}</h5>
        <p class="card-text text-truncate">${product.weight}</p>
        <p class="card-text text-truncate">$${product.price} <span class="text-decoration-line-through"> $${product.price - (product.price * product.discount / 100)}</span></p>
      </div>
      <div>
        <div class="row bg-success justify-content-center align-items-center mx-2  mb-3 py-1 rounded-pill">
          <div class="col text-start">
            <i class="fa-solid fa-minus rounded-circle bg-light p-2"></i>
          </div>
          <div class="col">
            <p class="card-text text-center" data-add-to-cart="add" id=${product.id}>ADD</p>
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
  console.log(event.target);
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
    console.log(response.data); // Imprimir la respuesta del servidor en la consola
  } catch (error) {
    console.error(error); // Manejar cualquier error que ocurra durante la solicitud
  }
}
deleteData(Number(favoriteId))
}
});






// async function getFavorites() {
//   // Obtener el array de objetos desde el servidor
// const response = await axios.get(urlFavorites);
//   // Identificar el objeto que deseas eliminar del array
// const objectToDelete = response.data.find(obj => obj.id === Number(favoriteId));
// console.log(objectToDelete)
// }

// getFavorites()

// // Crear una nueva instancia de Axios para enviar la solicitud DELETE
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// // Enviar la solicitud DELETE al endpoint correspondiente
// await axiosInstance.delete(`/favorites/${objectToDelete.id}`);

// // // Actualizar el array de objetos en tu aplicación
// // const updatedFavorites = response.data.filter(obj => obj.id !== objectToDelete.id);
