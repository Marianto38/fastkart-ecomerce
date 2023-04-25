console.log("conectado a formConfirmOrder.js");
export const urlBuys =  "http://localhost:3000/buys"
export const urlAllBuys =  "http://localhost:3000/allbuys"
import { urlShopping } from "./cart.js";
import { getProductsFromUrl  } from "./products.js";


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
        Swal.fire(`El campo "${input.name}" no puede estar vacío.`)
        hasErrors = true;
        break; // Detiene el bucle si se encuentra un campo vacío
      }
      userBuyer[input.name] = input.value; // Agrega el valor del elemento al objeto userBuyer
    }
  }

  if (!hasErrors) {
    console.log(userBuyer); // Imprime el objeto con los datos del formulario
    addObjectToArray(urlBuys, userBuyer);
    const productsInShopping = await getProductsFromUrl(urlShopping);
    addObjectToArray(urlBuys, productsInShopping);
    const objectInBuys = await getProductsFromUrl(urlBuys);
    addObjectToArray(urlAllBuys, {objectInBuys});
    await deleteObject("buys", 1)
    await deleteObject("buys", 2)
    await deleteObject("buys", 3)

  }
});

export const addObjectToArray = async (url, objectToAdd) => {
  try {
    const response = await axios.post(url, objectToAdd);
    console.log(response.data); // manejar la respuesta según sea necesario
  } catch (error) {
    console.error(error);
  }
};



const deleteObject = async (objectName, id) => {
  // Crear una instancia de Axios
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  try {
    const response = await axiosInstance.delete(`/${objectName}/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
