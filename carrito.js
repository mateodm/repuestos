const buscadorProductos = document.querySelector("#buscador");



/* SECCIÓN CARRITO */


/* CARRITO LOCAL STORAGE(ARRAY) */
let carrito = [];
if (localStorage.getItem("carrito")) carrito = JSON.parse(localStorage.getItem("carrito"));

function agregarAlCarrito(id) {
    const producto = stock.find((producto) => producto.id === id);
    const productoEnElCarrito = carrito.find((producto) => producto.id === id);

    if (productoEnElCarrito) {
        productoEnElCarrito.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
            text: "Sumaste un producto al carrito",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#3f51b5"
            }
        }).showToast();
    }
    else {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
            text: "Añadiste un producto al carrito",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#3f51b5"
            }
        }).showToast();
    }
    mostrarCarrito()
    carritoLength()
    totalProductos()
}

const estructuraCarrito = document.getElementById("carritoGenerar");


/* CARRITO CARD FUNCION */
function mostrarCarrito() {
    borrarCardCarrito()
    carrito.map((producto) => {
        const filaProducto = document.createElement("div")
        filaProducto.innerHTML = `
            <div id="borrarProducto" class="row">
                <div class="col-md-1"> </div>
                <div class="card col-md-10 mb-4">
                <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img class="carrito-imagen img-fluid" src="${producto.img}" alt="${producto.nombre}">
                    </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <div>
                        <p class="small text-muted mb-4 pb-2">Nombre</p>
                        <p class="lead fw-normal mb-0">${producto.nombre}</p>
                    </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <div data-bs-target="#foo">
                        <p class="small text-muted mb-4 pb-2">Cantidad</p>
                        <p id="cantidadP" class="lead fw-normal mb-0"><img onclick="restarCantidad(${producto.id})" class="menos-carrito" src="./imagenes/menos.png">${producto.cantidad}<img onclick="sumarCantidad(${producto.id})" class="mas-carrito" src="./imagenes/mas.png"></p>
                    </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <div>
                        <p class="small text-muted mb-4 pb-2">Precio</p>
                        <p class="lead fw-normal mb-0">${producto.precio} ars</p>
                    </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <div>
                        <p class="small text-muted mb-4 pb-2">Categoria</p>
                        <p class="lead fw-normal mb-0">${producto.categoria}</p>
                    </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <div>
                        <img id="borrar${producto.id}" class="tacho"style="width: 5vh; margin-top: 2vh;" src="./imagenes/tachobasura.png">
                    </div>
                </div>
                </div>
                </div>
            </div>
        `
        estructuraCarrito.appendChild(filaProducto);
        /* Borrar producto según ID del carrito */
        const borrarCarrito = document.getElementById(`borrar${producto.id}`)
        borrarCarrito.addEventListener("click", () => {
            eliminarProductoCarrito(producto.id)
        })
    })
}


/* Función que borra producto del carrito según el ID */
const eliminarProductoCarrito = (id) => {
    const elemento = carrito.find((producto) => producto.id === id);
    elemento.cantidad = 1
    const posicion = carrito.indexOf(elemento);
        carrito.splice(posicion, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito()
        carritoLength()
        totalProductos()
}
/* SUMA TOTAL PRODUCTO * CANTIDAD  */

const montoTotal = document.getElementById("montoTotal")
const totalProductos = () => {
    let precioProductoTotal = 0
    carrito.map((producto) => {
        precioProductoTotal += producto.precio * producto.cantidad;
    })
    if (precioProductoTotal == 0) {
        montoTotal.innerHTML = `No hay ningún producto en el carrito en este momento.`
    }
    else {
        montoTotal.innerHTML = `El monto total a pagar es de: $${precioProductoTotal} ars`
    }
}

/* Borrar card carritos para que no se dupliquen al cerrar el modal */
function borrarCardCarrito() {
    estructuraCarrito.innerHTML = ``
}

/* Contador Carrito */
function carritoLength() {
    let contador = carrito.length
    const contadorUbicacion = document.getElementById("contadorCarrito")
    contadorUbicacion.innerHTML = `${contador}`
}
function sumarCantidad(id) {
    const sumarC = carrito.find((producto) => producto.id === id)
    sumarC.cantidad++
    mostrarCarrito()
    totalProductos()
}
function restarCantidad(id) {
    const restarC = carrito.find((producto) => producto.id === id)
    if (restarC.cantidad > 1){
        restarC.cantidad--
    }
    else {
        return
    }
    mostrarCarrito()
    totalProductos()
}

totalProductos()
carritoLength()










