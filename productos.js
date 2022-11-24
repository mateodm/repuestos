let stock = []
obtenerValorArray()
async function obtenerValorArray() {
    const respuesta = await fetch("./json/productos.json");
    const productos = await respuesta.json();
    console.log(productos)
    darValorVariable(productos)
}
  function darValorVariable(productos){
    productos.forEach((producto) => {
        stock.push(producto)
    })
    copiaArray = stock
    creadorProductos(productos)
    ArrayPaginador(stock, 16)
    paginador()
    stringPagina(1)
  }

