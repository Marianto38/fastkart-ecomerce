const url = "http://localhost:3000/products"
import { printProduct, productContainer, urlProducts, getProductsFromUrl} from "./products.js";

const containerCategories = document.getElementById('container-categories')
console.log(containerCategories)
const categories = ["all"]

const categoriesFromProducts = async () => {



  const products = await getProductsFromUrl(urlProducts);
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });
  console.log("21", categories)
  categories.forEach(category => {
    containerCategories.innerHTML += `
  <li class="d-flex align-items-center"><a class="dropdown-item" id="${category}" href="#">
  <img src="${category}" alt="" style="max-width:20px";><apan class="ps-2"> ${category}</apan> </a></li>
  `;

  });


  const itemCategories = document.getElementById('category-filter')
  console.log("escuchando item categories", itemCategories)
  let categoryFilter = ['all']
  containerCategories.addEventListener("click", (event) => {
    event.preventDefault()
    console.log(event.target)
    categoryFilter = event.target.id
    console.log(categoryFilter)
    if (categoryFilter == "all") {
      productContainer.innerHTML = "";
        products.forEach((product) => {
          printProduct(productContainer, product);
        });
    } else {
      console.log("voy a mostrar la categoria", categoryFilter)
      const filteredProducts = products.filter((product) => product.category == categoryFilter);
      console.log(filteredProducts)

      productContainer.innerHTML = "";
      filteredProducts.forEach(product => {
        printProduct(productContainer, product);
      });


    }

  });
 }
categoriesFromProducts();
