const botonesCompra = document.querySelectorAll('.boton')

botonesCompra.forEach((boton) => {
  boton.addEventListener('click', (e) => {
    const tarjeta = boton.closest('.tarjeta')
    const titulo = tarjeta.querySelector('h1').textContent
    const precio = tarjeta.querySelector('h3').textContent
    .replace('Precio: $', '') // Eliminar el texto inicial
    .replace(/\./g, '') // Eliminar todos los puntos
    .trim(); // Eliminar espacios en blanco
    const imagen = tarjeta.querySelector('img').src

    const producto = {
      titulo,
      precio: parseFloat(precio),
      imagen,
    }

    const carrito = JSON.parse(localStorage.getItem('carrito')) || []
    carrito.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carrito))

    alert(`${titulo} ha sido agregado al carrito`)
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const listaCarrito = document.getElementById('lista_carrito')
  const totalCarrito = document.getElementById('total_carrito')
  const vaciarCarritoBtn = document.getElementById('vaciar_carrito')
  const finalizarCompraBtn = document.getElementById('finalizar_compra')

  const carrito = JSON.parse(localStorage.getItem('carrito')) || []

  if (carrito.length === 0) {
    document.getElementById('carrito_vacio').textContent = 'Tu carrito esta vacio.'
    totalCarrito.textContent = ''
    return
  }

  document.getElementById('carrito_vacio').textContent = ''

  carrito.forEach((producto, index) => {
    const li = document.createElement('li')
    li.className = 'producto_carrito'

    li.innerHTML = `
      <div class='producto_contenido'>
        <img src='${producto.imagen}' alt='${producto.titulo}' class='imagen_producto'>
        <span class="titulo_producto">${producto.titulo}</span>
        <span class="precio_producto">$ ${producto.precio.toLocaleString('es-Es')}</span>
        <button class="eliminar_producto" data-index="${index}">Eliminar</button>
      </div>
    `

    listaCarrito.appendChild(li)
  })

  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0)
  totalCarrito.textContent = `Total de compra: $${total.toLocaleString()}`

  vaciarCarritoBtn.addEventListener('click', () => {
    localStorage.removeItem('carrito')
    window.location.reload()
  })

  finalizarCompraBtn.addEventListener('click', () => {
    localStorage.removeItem('carrito')

    window.location.href = 'compra_proceso.html'
  })

  listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar_producto')) {
      const index = e.target.dataset.index
      carrito.splice(index, 1)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      window.location.reload()
    }
  })
})