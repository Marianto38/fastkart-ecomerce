const url = "http://localhost:3000/products"
const containerCategories = document.getElementById('container-categories')
console.log(containerCategories)

const categories = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data en categori", data);

  //Vacio el contenedor
  containerCategories.innerHTML = "";

  data.forEach(element => {
  containerCategories.innerHTML += `
  <li><a class="dropdown-item" id="${element.category}" href="#">${element.category}</a></li>
  `;

  });
const itemCategories = document.getElementById('category-filter')
console.log("escuchando item categories", itemCategories)
document.addEventListener("click", (event) => {
 console.log(event.target)
 const categoryFilter = event.target.id
 console.log(categoryFilter)
 if (categoryFilter == "all") {
  console.log("todas")
  getProducts();
 } else {
  console.log("voy a mostrar la categoria", categoryFilter)
  const productByCategory = data.filter(object => object.category === categoryFilter);
  console.log(productByCategory)
  console.log(productByCategory[0].name)
 }
});
}
categories();
