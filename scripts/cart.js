import { url  } from "./products.js";
export const urlShopping = "http://localhost:3000/shopping"

console.log("conectado a cart.js")
// const containerCartDropdown = document.querySelector('.container-cart-dropdown')
// console.log(containerCartDropdown);

 //escuchar el id en el local
 const productId = JSON.parse(localStorage.getItem("productToCart")) || 0;
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
              const response = await axios.get(urlShopping);
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
              const response = await axios.post(urlShopping, objeto);
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

// export const productContainerFavorites = document.querySelector('.container-products-favorites');
// console.log(productContainerFavorites);

export const getProducts = async () => {
  try {
    const response = await axios.get(urlShopping);
    const data = response.data;
    console.log("data del getProducts", data);

    // recorro el objeto data entregado por el fetch
    for (const key in data) {
      if (data.hasOwnProperty.call(data, key)) {
        const product = data[key];
        console.log("un producto", product);

const containerCartDropdown = document.querySelector('.container-cart-dropdown')
        printProduct(containerCartDropdown, product);
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
  //container.innerHTML = "";
  container.innerHTML += `
  <!-- ***************cards de producto***************** -->
  <a class="dropdown-item" href="#"><div class="card mb-0" style="max-width: 400px;">
  <div class="row g-0 pt-2">
  <div class="d-flex justify-content-end mb-0 pe-2"><i class="fa-solid fa-xmark" style="color: #000000;"></i></div>
    <div class="col-md-4">
      <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}">
    </div>
    <div class="col-md-8">
      <div class="card-body py-0">
        <h5 class="card-title text-truncate text-success">${product.name}e</h5>
        <p class="card-text"><small class="text-muted"> x $${product.price}</small></p>
      </div>
    </div>

  </div>
</div></a>

  <!-- ***************cards de producto***************** -->
    `;
}


// // *******************eliminar un producto de favoritos************************

// document.addEventListener("click", (event) => {
//   console.log(event.target);
// //indico el atributo donde quiero escuchar el click
//   const favoriteId = event.target.getAttribute("id");
//   const dataDeleteFavorite = event.target.getAttribute("data-delete-favorite")

// if (dataDeleteFavorite === "favorite") {
//   console.log("voy a borrar", favoriteId)

// // Crear una instancia de Axios
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000',
// });

// async function deleteData(id) {
//   try {
//     const response = await axiosInstance.delete(`/favorites/${id}`);
//     console.log(response.data); // Imprimir la respuesta del servidor en la consola
//   } catch (error) {
//     console.error(error); // Manejar cualquier error que ocurra durante la solicitud
//   }
// }
// deleteData(Number(favoriteId))
// }
// });
