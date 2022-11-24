const ubicacionPaginas = document.getElementById("paginasBoton");
const ubicacionProductos = document.getElementById("cardsProductos")
let cantidadPorPagina = 16
let indice = 0
let Pages = [];

function restock() {
    stock = copiaArray
}



function creadorProductos(array) {
    array = array.slice(indice, cantidadPorPagina)
    ubicacionProductos.innerHTML = ""
    array.map((producto) => {
        const div = document.createElement("div")
        div.classList.add("producto", "col-xl-3", "col-lg-4", "col-md-6", "col-sm-12")
        div.innerHTML = `
          <div class="card col-md-12 col-sm-12 mb-4 ml-5 card-producto">
              <img id="imagen" src=${producto.img} class="card-imagen card-img-top my-3" alt="Panel Led Indoor 100w"/>
          <div class="card-body">
              <h5 id="nombre" class="card-title"> ${producto.nombre}</h5>
              <h5 style="display: none;"> ${producto.categoria} </h5>
              <p id="precio" class="card-text card-precio"> $${producto.precio} ars</p>
              <div class="count-input">
          <div class="row">
              <button onclick="agregarAlCarrito(${producto.id})" class="d-block botonesproductos" value="save" type="submit">Agregar al carrito</button>
              </div>
          </div>
  `
        ubicacionProductos.appendChild(div)
    })
}
/* PÁGINAS */
const ArrayPaginador = (array, cantidad) => {
    while (array.length) {
        const Product = array.slice(0, cantidad);
        array = array.slice(cantidad);

        Pages.push(Product);
    }

    let obj = {};
  
    Pages.map((_, i) => obj[`Página_${i+1}`] = Pages[i]);
    return obj;
};

function paginador() {
    ubicacionPaginas.innerHTML = ""
    let paginaInicial = 0
    Pages.map(() => {
        paginaInicial++
        const li = document.createElement("li")
        li.classList.add("page-link")
        li.innerHTML = 
        `
        <h5 onclick="stringPagina(${paginaInicial})">${paginaInicial}</h5>
        `
        ubicacionPaginas.appendChild(li)  
    }
    )
    }
    function stringPagina(id) {
        if (id === 1) {
            cantidadPorPagina = 16
            indice = 0
            ubicacionProductos.innerHTML= ""
            creadorProductos(stock)
        }
        else if (id > 1) {
            cantidadPorPagina = id * 16
            indice = cantidadPorPagina/2
            ubicacionProductos.innerHTML= ""
            creadorProductos(stock)
        }
    }
    function filtrosPaginador(array, cantidad) {
        Pages = []
        ArrayPaginador(array, cantidad)
        creadorProductos(array)
        paginador()
        stringPagina(1) 
    }

