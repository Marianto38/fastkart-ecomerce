import { url, printProduct  } from "./products.js";
export const urlShopping = "http://localhost:3000/shopping"
const containerCartDropdown = document.querySelector('.container-cart-dropdown')
const containerShowProductsInCart = document.querySelector('.container-products-in-cart')

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

  export const getProducts = async () => {
    try {
      const response = await axios.get(urlShopping);
      const data = response.data;
      console.log("data del getProducts en linea 85 del cart", data);

      const products = [];

      // recorro el array de productos entregado por el fetch y agrego cada producto al array products
      for (const product of Object.values(data)) {
        console.log("un producto", product);
        products.push(product);
      }

      return products; // retorno el array de productos
    } catch (error) {
      console.error(error);
    }
  };

  // función que se ejecutará después de que se resuelva la promesa de getProducts
  const printProductsInDropdown = async () => {
    // para utilizar los productos fuera de la función, asigno el resultado de getProducts a una variable
    const products = await getProducts();

    // recorro el array de productos y ejecuto la función para cada producto
    products.forEach((product) => {
      printProductInDropdown(containerCartDropdown, product);
    });

    console.log(products);
  };


  // llamo a la función printProductsInDropdown para imprimir los productos
  printProductsInDropdown();

  // *******************mostrar los productos en cart.html**************************

    const printProductsInCartHtml = async () => {
      const products = await getProducts();
      products.forEach((product) => {
        printProductInCart(containerShowProductsInCart, product);
      });
    };


    // llamo a la función printProductsInCartHtml para imprimir los productos
    printProductsInCartHtml();





 // agrego el elemento al html
 export const printProductInDropdown = (container, product) => {
  //Vacio el contenedor
  //container.innerHTML = "";
  container.innerHTML += `
  <!-- ***************cards de producto***************** -->
  <div class="dropdown-item" href="#"><div class="card mb-0" style="max-width: 400px;">
    <div class="row g-0 pt-2">
      <div class="d-flex justify-content-end mb-0 pe-2" ><i class="fa-solid fa-xmark"  data-delete="delete-of-cart" id=${product.id} style="color: #000000;"></i></div>
        <div class="col-md-4">
          <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body py-0">
            <h5 class="card-title text-truncate text-success">${product.name}</h5>
            <p class="card-text"><small class="text-muted"> x $${product.price - (product.price * product.discount / 100)}</small></p>
          </div>
        </div>
    </div>
  </div>
</div>

  <!-- ***************cards de producto***************** -->
    `;
}


// agrego el elemento al html
 export const printProductInCart = (container, product) => {
  //Vacio el contenedor
  //container.innerHTML = "";
  container.innerHTML += `
  <!-- ***************productos en carrito cart.html***************** -->
  <div class="row border-bottom">
    <div class="col d-flex align-items-center">
      <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}">
    </div>
    <div class="col bg-info">
      <div class="row"><p class="text-truncate" style="max-width: 150px;">${product.name}</p></div>
      <div class="row"><p>Sold By: </p></div>
      <div class="row"><p>Quantity: </p></div>
    </div>
    <div class="col">
      <div class="row"><p>Price</p></div>
      <div class="row"><p>$${product.price - (product.price * product.discount / 100)} <span class="text-decoration-line-through"> $${product.price}</span></p></div>
      <div class="row"><p>Quantity: </p></div>
    </div>
    <div class="col">
      <div class="row"><p>Qty</p></div>
      <div class="row p-0">
        <div class="row bg-success justify-content-center align-items-center  rounded-pill">
          <div class="col text-start">
            <i class="fa-solid fa-minus rounded-circle bg-light "></i>
          </div>
          <div class="col">
            <p class="card-text text-center" data-add-to-cart="add" id=${product.id}>0</p>
          </div>
          <div class="col text-end">
            <i class="fa-solid fa-plus rounded-circle bg-light"></i>
          </div>
        </div>

      </div>
    </div>
    <div class="col">
      <div class="row"><p>Total</p></div>
      <div class="row"><p>toal</p></div>
      <div class="row"><p></p></div>
    </div>
    <div class="col">
      <div class="row"><p>Action</p></div>
      <div class="row"><p>Save for later</p></div>
      <div class="row"><p>Remove</p></div>
  </div>

  <!-- ***************productos en carrito cart.html***************** -->
    `;
}

// // *******************eliminar un producto de favoritos************************

document.addEventListener("click", (event) => {
 // event.preventDefault
  console.log(event.target);
// //indico el atributo donde quiero escuchar el click
  const cartItemId = event.target.getAttribute("id");
  const dataDeleteCartItem = event.target.getAttribute("data-delete")
  console.log("datadelete", dataDeleteCartItem)
 if (dataDeleteCartItem === "delete-of-cart") {
   console.log("voy a borrar", cartItemId)

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

async function deleteData(id) {
  try {
    const response = await axiosInstance.delete(`/shopping/${id}`);
    console.log(response.data); // Imprimir la respuesta del servidor en la consola
  } catch (error) {
    console.error(error); // Manejar cualquier error que ocurra durante la solicitud
  }
}
deleteData(Number(cartItemId))
}
});
