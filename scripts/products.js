export const url = "http://localhost:3000/products"
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

// ************************Consultar todos los productos****************************

const getAllProducts = async () => {
   const response = await fetch(url);
    const data = await response.json();
    console.log("data del getAllProducts", data);
}
// getAllProducts();

// ***************************renderizar un producto*****************************


// *********************Consultar un producto por id******************************

const getProductById = async (id) => {
  const response = await fetch(`${url}/${id}`);
   const data = await response.json();
  console.log("Data del product by id", data);
  }
  // const productById = getProductById(3);
  // console.log(productById);

  // **********************Consultar un producto por categoria*************************

const getProductByCategory = async (category) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(typeof(data));
  console.log("Data de products by category", data);
  const productByCategory = data.filter(object => object.category === category);
  console.log(productByCategory)
  console.log(productByCategory[0].name)
  }
// const productByCategory = getProductByCategory('vegetables & fruits');
// console.log("Product by category", productByCategory.name)

// ******************************Crear un nuevo producto**********************************

  const newProduct = async(product) => {
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product),
    }
    const result =  await fetch(url, options)
    const data = await result.json()
    console.log(data);
  }

  // newProduct(product);



  // *********************Pintar cards de productos ********************************

export const productContainer = document.querySelector('.container-products');
console.log(productContainer);

export const getProducts = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log("data del getProducts", data);

    // recorro el objeto data entregado por el fetch
    for (const key in data) {
      if (data.hasOwnProperty.call(data, key)) {
        const product = data[key];
        console.log("un producto", product);

        printProduct(productContainer, product);
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
    <i class="fa-sharp fa-solid fa-circle-xmark fs-2 close-btn"></i>
    <div class="row justify-content-center card-links">
      <div class="col px-3" data-product="product" id=${product.id}>
        <i class="fa-solid fa-eye"  data-product="product" id=${product.id}></i>
      </div>
      <div class="col border-start border-end px-3">
        <i class="fa-solid fa-arrows-rotate"></i>
      </div>
      <div class="col px-3" data-favorite="favorite" id=${product.id}>
        <i class="fa-solid fa-heart text-dark" data-favorite="favorite" id=${product.id}></i>
      </div>
    </div>
    <div class="new" >

    </div>
      <img src="${product.img}" class="card-img-top" alt="...">
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
//getProducts();
//printProduct(productContainer, product);

// const containerProduct = document.getElementById('container-product-id')
// console.log(containerProduct)


//4. Escucho el click sobre cada product
document.addEventListener("click", (event) => {
  console.log(event.target);
//indico el atributo donde quiero escuchar el click
  const productTarget = event.target.getAttribute("data-product");
  const productFavorite = event.target.getAttribute("data-favorite");
  const addProductToCart = event.target.getAttribute("data-add-to-cart");
  if (productTarget === "product") {
    // event.preventDefault();
    console.log('voy a ver product');
    const productId = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("productId", JSON.stringify(productId));
    window.location.href = "./product.html";
  }
  else if (productFavorite === "favorite") {
    event.preventDefault();
    console.log('voy a agregar a favoritos');
    const productToFavorite = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("productToFavorite", JSON.stringify(productToFavorite));
    //  window.location.href = "./product.html";
  }
  else if (addProductToCart === "add") {
    event.preventDefault();
    console.log('voy a agregar a carrito');

    const productToCart = event.target.getAttribute("id");
    //pasar el objeto al json
    localStorage.setItem("productToCart", JSON.stringify(productToCart));
    //  window.location.href = "./product.html";
  }
});
