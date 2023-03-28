const url = "http://localhost:3000/products"
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

  const productContainer = document.querySelector('.container-products');
  console.log(productContainer);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data del getProducts", data);

      //Vacio el contenedor
      productContainer.innerHTML = "";

      //recorro el objeto data entregado por el fetch
      for (const key in data) {
        if (data.hasOwnProperty.call(data, key)) {
          const product = data[key];
          console.log("un producto", product)

      // agrego el elemento al html

      productContainer.innerHTML += `
      <!-- ***************cards de producto***************** -->
      <div class="col  card-product">
        <div class="card h-100">
        <i class="fa-sharp fa-solid fa-circle-xmark fs-2 close-btn"></i>
        <div class="row justify-content-center card-links">
          <div class="col px-3">
            <i class="fa-solid fa-eye"></i>
          </div>
          <div class="col border-start border-end px-3">
            <i class="fa-solid fa-arrows-rotate"></i>
          </div>
          <div class="col px-3">
            <i class="fa-solid fa-heart fa-beat text-dark"></i>
          </div>
        </div>
        <div class="new" >

        </div>
          <img src="${product.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text text-truncate">${product.category}</p>
            <h5 class="card-title title">${product.name} ${product.weight}</h5>
            <p class="card-text text-truncate">${product.weight}</p>
            <p class="card-text text-truncate">$${product.price} <span class="text-decoration-line-through"> $${product.price - (product.price * product.discount / 100)}</span></p>
          </div>
          <div>
            <div class="row bg-success justify-content-center align-items-center  mb-3 mx-5 py-2 rounded-pill">
              <div class="col text-start">
                <i class="fa-solid fa-minus rounded-circle bg-light p-2"></i>
              </div>
              <div class="col">
                <p class="card-text text-center">ADD</p>
              </div>
              <div class="col text-end me-0">
                <i class="fa-solid fa-plus rounded-circle bg-light p-2 m-0"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ***************cards de producto***************** -->
        `;
      }
    }

  }

getProducts();
