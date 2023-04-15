console.log("conectado a formLogin.js");

const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario

  const formData = {}; // Objeto para almacenar los datos del formulario
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
      formData[input.name] = input.value; // Agrega el valor del elemento al objeto formData
    }
  }

  if (!hasErrors) {
    console.log(formData); // Imprime el objeto con los datos del formulario
    // addObjectToArray(urlBuys, formData);
  }
});

// const addObjectToArray = async (url, objectToAdd) => {
//   try {
//     const response = await axios.post(url, objectToAdd);
//     console.log(response.data); // manejar la respuesta según sea necesario
//   } catch (error) {
//     console.error(error);
//   }
// };