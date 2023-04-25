console.log("conectado a cart.js")
import { getProductsFromUrl  } from "./products.js";
const urlBuys =  "http://localhost:3000/buys"
export const urlShopping = "http://localhost:3000/shopping"
export const urlCoupon = "http://localhost:3000/coupons"
export const containerCartDropdown = document.querySelector('.container-cart-dropdown')
const containerShowProductsInCart = document.querySelector('.container-products-in-cart')
const containerSectionSubtotal = document.querySelector('.container-section-subtotal')
const btnToSum = document.querySelector('.btn-sum')
const btnToSubtrac = document.querySelector('.btn-subtrac')
const containerSubTotalInDrop = document.querySelector('.sub-drop')
const baged = document.querySelector('.baged-qty')
const containerTotalInCartHtml = document.querySelector('.container-total')
const containerDiscount = document.querySelector('.container-discount')
const containerShipping = document.querySelector('.container-shipping')
const containerTotal = document.querySelector('.container-total')
let  itemId = ""
let axiosInstance = ""


// *******************muestro los productos en el carrito al hacer click en barra***********************

 export const printProductsInDropdown = async () => {
    const products = await getProductsFromUrl(urlShopping);
    products.forEach((product) => {
      printProductInDropdown(containerCartDropdown, product);
    });

    console.log(products.length);
    baged.innerHTML +=`
    <p>${products.length}</p>

    `
   printSectionSubtotal(containerSubTotalInDrop, subtotal)
  };

  document.addEventListener('DOMContentLoaded', async () => {
    await printProductsInDropdown();
  });


  // *******************mostrar los productos en cart.html**************************

    const printProductsInCartHtml = async () => {
      const products = await getProductsFromUrl(urlShopping);
      products.forEach((product) => {

        printProductInCart(containerShowProductsInCart, product);
        calculateSubtotal(product)

      });
      applyCoupon(subtotal);
      printSectionSubtotal(containerSectionSubtotal, subtotal)
    };

    document.addEventListener('DOMContentLoaded', async () => {
      await printProductsInCartHtml();
     });


// *************************función para calcular el subtotal en el carrito************************

let subtotal = 0;
    const calculateSubtotal = (product) => {
      const totalItem = product.quantity * product.price;
      subtotal += totalItem;
    }


//  *********************muestro los productos al dropdown en la barra de navegacion*********************
 export const printProductInDropdown = (container, product) => {
  container.innerHTML += `
  <div class="dropdown-item">
    <div class="card mb-0" style="max-width: 400px;">
      <div class="row g-0 pt-2">
        <div class="d-flex justify-content-end mb-0 pe-2" ><i class="fa-solid fa-xmark"  data-delete="delete-of-cart" id=${product.id} style="color: #000000;"></i></div>
          <div class="col-md-4 text-center">
            <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}" style="max-width: 50px">
          </div>
          <div class="col-md-8">
            <div class="card-body py-0">
              <h5 class="card-title text-truncate text-success">${product.name}</h5>
              <p class="card-text"><small class="text-muted"> <span>${product.quantity}</span> x $${product.price - (product.price * product.discount / 100)}</small></p>
            </div>
          </div>
      </div>
    </div>
  </div>
    `;
}


//  *********************muestro los productos en el cart.html*********************
 export const printProductInCart = (container, product) => {
    container.innerHTML += `
    <div class="row border-bottom">
      <div class="col d-none d-md-block d-flex align-items-center text-center">
        <img src="${product.img}" class="img-fluid rounded-start" alt="${product.name}" style="max-width:50px">
      </div>
      <div class="col bg-info">
        <div class="row"><p class="text-truncate" style="max-width: 150px;">${product.name}</p></div>
        <div class="row"><p>Sold By: </p></div>
        <div class="row"><p>Quantity: ${product.weight} </p></div>
      </div>
      <div class="col">
        <div class="row"><p>Price</p></div>
        <div class="row"><p>$${product.price - (product.price * product.discount / 100)} <span class="text-decoration-line-through"> $${product.price}</span></p></div>
        <div class="row"><p class="text-success">You Save:  $${product.price - (product.price -  (product.price * product.discount / 100))} </p></div>
      </div>
      <div class="col">
        <div class="row"><p>Qty</p></div>
        <div class="row p-0">
          <div class="row bg-success justify-content-center align-items-center  rounded-pill">
            <div class="col text-start" id=${product.id} data-item="btn-subtrac">
              <i class="fa-solid fa-minus rounded-circle bg-light" id=${product.id} data-item="btn-subtrac" style="cursor: pointer;"></i>
            </div>
            <div class="col">
              <p class="card-text text-center" data-add-to-cart="add" id=${product.id}>${product.quantity}</p>
            </div>
            <div class="col text-end" id=${product.id} data-item="btn-sum">
              <i class="fa-solid fa-plus rounded-circle bg-light" id=${product.id} data-item="btn-sum" style="cursor: pointer;"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row"><p>Total</p></div>
        <div class="row"><p>${product.quantity * product.price}</p></div>
        <div class="row"><p></p></div>
      </div>
      <div class="col">
        <div class="row"><p>Action</p></div>
        <div class="row" data-favorite="favorite" id=${product.id}><a href="#" class="link-success" data-favorite="favorite" id=${product.id}>Save for later</a></div>
        <div class="row" data-delete="delete-of-cart" id=${product.id}><a href="#" class="link-danger" data-delete="delete-of-cart" id=${product.id}>Remove</a></div>
      </div>
    </div>
    `;
}

// ********************************imprimir seccion de subtotales en cart.html**********************************
export const printSectionSubtotal = (container, subTotal) => {
  //Vacio el contenedor
  //container.innerHTML = "";
  container.innerHTML += `
      <div class="row justify-content-between">
        <div class="col d-flex justify-content-between">
          <p>Subtotal</p>
          <p>$${subTotal}</p>
        </div>
      </div>

 `
}



const printSectionCouponAplied = async (container, discountAplied) => {
  //Vacio el contenedor
  container.innerHTML = "";
  container.innerHTML += `
      <div class="row justify-content-between">
        <div class="col d-flex justify-content-between">
          <p>Coupon Discount</p>
          <p>(-) ${discountAplied}</p>
        </div>
      </div>`
};
let shipping = 5000

const printSectionShipping = async (container, shipping) => {
  //Vacio el contenedor
  container.innerHTML = "";
  container.innerHTML += `
  <div class="row justify-content-between">
  <div class="col d-flex justify-content-between">
    <p>Shipping</p>
    <p>$${shipping}</p>
  </div>
</div>`
};

document.addEventListener('DOMContentLoaded', async () => {
  await printSectionShipping(containerShipping, shipping);
});



const printSectionTotal = async (container, total) => {
  //Vacio el contenedor
  container.innerHTML = "";
  container.innerHTML += `
  <div class="row justify-content-between">
  <div class="col d-flex justify-content-between">
    <p>Total</p>
    <p>$${total}</p>
  </div>
</div>`
};


const applyCoupon = async (subtotal) => {

  let discountByCoupon = 0;

  const formDiscount = document.getElementById('form-discount');
  formDiscount.addEventListener('submit', async (event) => {
    event.preventDefault();
    const codeDiscount = event.target.discount;
    const coupons = await getProductsFromUrl(urlCoupon);
    const couponFinded = coupons.find((coupon) => coupon.code === codeDiscount.value);

    if (couponFinded) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cupon agregado exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
      const containerDiscount = document.querySelector('.container-discount')

      discountByCoupon = couponFinded.discount;
      console.log(couponFinded);
      // alert("soy subtotal"+ subtotal + "soy descuento"+ discountByCoupon)
      const discountAmount = (subtotal * discountByCoupon) / 100;
      await printSectionCouponAplied(containerDiscount, discountAmount);
      await axios.post(urlBuys, {couponFinded});


      // calculateDiscountByCoupon(subtotal, discountByCoupon);

    } else {
      // alert("cupon no encontrado");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El cupon no ha sido encontrado! Digite nuevamente su codigo!',
        showConfirmButton: false,
        timer: 1500
      })
      formDiscount.reset();
    }
  });

};



// *******Trae el cupon y pintarlo en el html*********
const printCoupon = async () => {
const couponInBuy = await getProductsFromUrl(urlBuys);
const couponValue = couponInBuy[0].couponFinded.discount
const productsInCart = await getProductsFromUrl(urlShopping);

const discountValue = subtotal * couponValue / 100
printSectionCouponAplied(containerDiscount, discountValue)
const totalToPay = (subtotal - discountValue - shipping)
await printSectionTotal(containerTotal, totalToPay)
// addObjectToArray(urlBuys, addObjectToArray)
// alert(totalToPay)

}
printCoupon()


const addObjectToArray = async (url, objectToAdd) => {
  try {
    const response = await axios.post(url, objectToAdd);
    console.log(response.data); // manejar la respuesta según sea necesario
  } catch (error) {
    console.error(error);
  }
};


// *******************eliminar un producto de cart************************

document.addEventListener("click", (event) => {
   event.preventDefault
  // //indico el atributo donde quiero escuchar el click
  const cartItemId = event.target.getAttribute("id");
  const dataDeleteCartItem = event.target.getAttribute("data-delete")
  // console.log("datadelete", dataDeleteCartItem)
  if (dataDeleteCartItem === "delete-of-cart") {
      console.log("voy a borrar", cartItemId)

      // Crear una instancia de Axios
      axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
      });
      const deleteData = async (id) => {
        try {
          const response = await axiosInstance.delete(`/shopping/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      deleteData(Number(cartItemId));
      JSON.parse(localStorage.removeItem("productToCart"))
  }
});


// ***************************sumar o restar cantidades de items**************************


document.addEventListener("click", (event) => {
  event.preventDefault
   itemId = event.target.getAttribute("id");
  const dataItem = event.target.getAttribute("data-item")
  // console.log("DATA DEL ITEM", dataItem)
  if (dataItem === "btn-subtrac") {
    console.log("voy a restar")
    substracItem();
  }
  else if (dataItem === "btn-sum") {
    console.log("voy a sumar")
    sumItem()
  }
});

// ***************************funcion para editar el objeto json shopping****************
const editQuantity = async (id, newQty) => {
  try {
    const response = await axios.patch(`${urlShopping}/${id}`, { quantity: newQty });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// *********************** funcion para restar un item****************************
const substracItem = async () => {
  // para utilizar los productos fuera de la función, asigno el resultado de getProductsFromUrl a una variable
  const product = await axios.get(`${urlShopping}/${itemId}`);
  let newQuantity = product.data.quantity
  newQuantity = Number(newQuantity)
  // const products = await getProductsFromUrl();
  if (product.data.quantity > 0) {
    newQuantity = newQuantity = newQuantity - 1
    console.log(newQuantity);
  }
  editQuantity(itemId, newQuantity)
};

// *********************** funcion para sumar un item****************************
const sumItem = async () => {
  // para utilizar los productos fuera de la función, asigno el resultado de getProductsFromUrl a una variable
  const product = await axios.get(`${urlShopping}/${itemId}`);
  let newQuantity = product.data.quantity
  newQuantity = Number(newQuantity)

  // const products = await getProductsFromUrl();
  if (product.data.quantity >= 0) {
    newQuantity = newQuantity = newQuantity + 1
    console.log(newQuantity);
  }
  editQuantity(itemId, newQuantity)
};
