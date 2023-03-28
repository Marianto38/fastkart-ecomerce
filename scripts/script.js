console.log("conectado a script")

const product = {
  "name": "Tomate",
  "weight": "500g",
  "price": 500,
  "discount": 15,
  "category": "vegetables & fruits",
  "stock": 5,
  "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcUQcOiph6tQHO9a_n5Jl6O_pP1dQIGZqwxA&usqp=CAU"
}


// const crearProducto= async(producto) => {
//   const opciones= {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(producto),

//   }

//   const resultado=  await fetch("http://localhost:3000/products", opciones)
//   const data= await resultado.json()
//   console.log(data)

// }

// crearProducto(product);
