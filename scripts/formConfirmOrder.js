console.log("conectado a formConfirmOrder.js");
export const urlBuys =  "http://localhost:3000/buys"
import { urlShopping } from "./cart.js";
import { getProductsFromUrl  } from "./products.js";

// const formCheckout = document.getElementById('form-checkout');
// formCheckout.addEventListener("submit", (event) => {
//   event.preventDefault();
//   // const searchByTitle = event.target.name;
//   // console.log(searchByTitle.value)



// });
// console.log(formCheckout.children);


// const formCheckout = document.getElementById('form-checkout');

// formCheckout.addEventListener('submit', (event) => {
//   event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

//   const formData = {}; // Objeto para almacenar los datos del formulario

//   // Recorre todos los elementos del formulario
//   for (let key in event.target.elements) {
//     const input = event.target.elements[key];
//     if (input.nodeName === 'INPUT') {
//       formData[input.name] = input.value; // Agrega el valor del elemento al objeto formData
//     }
//   }

//   console.log(typeof(formData)); // Imprime el objeto con los datos del formulario
//   addObjectToArray(urlBuys, formData)


// });
// const addObjectToArray = async (url, objectToAdd) => {
//   try {
//     const response = await axios.post(url, objectToAdd);
//     console.log(response.data); // manejar la respuesta según sea necesario
//   } catch (error) {
//     console.error(error);
//   }
// };


const formCheckout = document.getElementById('form-checkout');

formCheckout.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

  const userBuyer = {}; // Objeto para almacenar los datos del formulario
  let hasErrors = false; // Bandera para indicar si se encontraron errores

  // Recorre todos los elementos del formulario
  for (let key in event.target.elements) {
    const input = event.target.elements[key];
    if (input.nodeName === 'INPUT') {
      // Verifica si el campo está vacío o solo contiene espacios en blanco
      if (input.value.trim().length === 0) {
        // Muestra un mensaje de error al usuario
        alert(`El campo "${input.name}" no puede estar vacío.`);
        hasErrors = true;
        break; // Detiene el bucle si se encuentra un campo vacío
      }
      userBuyer[input.name] = input.value; // Agrega el valor del elemento al objeto userBuyer
    }
  }

  if (!hasErrors) {
    console.log(userBuyer); // Imprime el objeto con los datos del formulario
    addObjectToArray(urlBuys, {userBuyer});
    const productsInShopping = await getProductsFromUrl(urlShopping);
    addObjectToArray(urlBuys, {productsInShopping});
  }
});

const addObjectToArray = async (url, objectToAdd) => {
  try {
    const response = await axios.post(url, objectToAdd);
    console.log(response.data); // manejar la respuesta según sea necesario
  } catch (error) {
    console.error(error);
  }
};
