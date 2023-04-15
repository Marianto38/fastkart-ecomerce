  console.log("conectado a search.js");

  // *************search*******************

  const search = document.getElementById('form-search');
  search.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(getelementByName('q'))
      const searchByTitle = event.target.buscador;
      console.log(searchByTitle.value)
  });


  // const searchKeyUp = document.getElementById('mySearch');
  //   searchKeyUp.addEventListener("keyup", (event) => {
  //     event.preventDefault();
  //     const searchByTitle = event.target;
  //     console.log(searchByTitle.value)

  // });
  const search2 = document.getElementById('mySearch2');
  search2.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(getelementByName('q'))
      const searchByTitle = event.target.buscador;
      console.log(searchByTitle.value)
  });
