const url = "http://localhost:3000/products"
import {printProduct  } from "./products.js";
// //4. Escucho el click sobre cada product
// const containerProduct = document.getElementById('container-product-id')
// document.addEventListener("click", (event) => {
//   console.log("evento en la 149", event.target);
// //indico el atributo donde quiero escuchar el click
//   const productTarget = event.target.getAttribute("data-product");
//   if (productTarget === "product") {
//     //event.preventDefault();
//     console.log('voy a ver product');
//     const productId = event.target.getAttribute("id");
//     window.location.href = "./product.html";
//     console.log("elproductid", productId)
//     //pasar el objeto al json
//      localStorage.setItem("productId", JSON.stringify(productId));

//     // const productIdLoc = JSON.parse(localStorage.getItem("productId"))
//     // console.log("169", productIdLoc)
//     // printProduct(containerProduct, product);
//     // printProduct(containerProduct, productId);
//         //  console.log(getProductById(productId));
//   }
// });


console.log("conectado a product.js")
const containerProduct = document.querySelector('.container-product-id')
console.log(containerProduct);

 //escuchar el id en el local
 const productId = JSON.parse(localStorage.getItem("productId")) || 0;
console.log(productId)
let data = {}

const getProductById = async (id) => {
  const response = await fetch(`${url}/${id}`);
  data = await response.json();
  console.log("Data del product by id", data);
  printProduct(containerProduct, data)
}
const productById = getProductById(productId);
console.log(productById);
console.log("Data del product by id 44", data);

// const showOneVideo = (container, video) => {
//   // creao el elemento article
//   const article = document.createElement('article');
//   // creo contenido de elemento
//   article.innerHTML = `
//   <iframe src=${video.src} class="video-show" title=${video.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//     <article class="details">
//     <div class="avatar-show">
//       <img class="img-creator" src="${video.img}" alt="">
//     </div>
//     <div class="title-detail">
//       <h3 class="title-video-show" >${video.title}</h3>
//       <p class="views-show"> ${video.views} Vistas - ${video.min}</p>
//     </div>
//   </article>
//   `;
//   // agrego el elemento al html
//   container.appendChild(article);
// };

//   document.addEventListener("DOMContentLoaded", () => {
//   //escuchar el id en el local
//   const videoIdParse = JSON.parse(localStorage.getItem("videoId")) || 0;
//   console.log(videoIdParse)
//   // convierto a number el string que me devuelve jsonParse
//   const idToNumber = Number(videoIdParse);
//   console.log(idToNumber)
//   //Teniendo el id voy al array de videos
//   const videoFinded = videos.find(
//     (video) => video.id === idToNumber
//   );
//   console.log(videoFinded)

//   showOneVideo(showVideo, videoFinded);
