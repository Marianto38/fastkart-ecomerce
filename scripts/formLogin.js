console.log("conectado a formLogin.js");
import { getProductsFromUrl  } from "./products.js";
const urlUsers = "http://localhost:3000/users"
const formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();

  const userInfo = {};
  let hasErrors = false; // validar errores en el formulario

  // Recorre todos los elementos del formulario
  for (let key in event.target.elements) {
    const input = event.target.elements[key];
    if (input.nodeName === 'INPUT') {
      // Verifica si el campo está vacío o solo contiene espacios en blanco
      if (input.value.trim().length === 0) {
       alert(`El campo "${input.name}" no puede estar vacío.`);
        hasErrors = true;
        break;
      }
      userInfo[input.name] = input.value; // Agrega el valor del elemento al objeto userInfo
    }
  }

  if (!hasErrors) {
    validateUser(userInfo);
  }
});

const validateUser = async (userInfo) => {
  const users = await getProductsFromUrl(urlUsers);
  const userFinded = users.find((user) => user.name.toLowerCase() === userInfo.Nombre.toLowerCase() && user.password === Number(userInfo.Contraseña));
  if (userFinded) {
    alert("Usuario Logeado")
    window.location.href = "../pages/editProduct.html";

  } else {
    alert("El usuario o contraseña ingresado no es correcto, Por favor digite nuevamente su información")
  }
}
