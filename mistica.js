// mistica.js
document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    const menuToggle = document.querySelector("#menuToggle");
    const sidebarMenu = document.querySelector("#sidebarMenu");
    const productosToggle = document.querySelector("#productosToggle");
    const productosSubmenu = document.querySelector("#productosSubmenu");
    const cartButton = document.querySelector("#cartButton");
    const cartModal = new bootstrap.Modal(document.querySelector("#cartModal"));
    const cartItemsContainer = document.querySelector("#cartItems");
    const clearCartButton = document.querySelector("#clearCart");

    let cart = []; // Arreglo para almacenar los productos en el carrito

    // Alternar visibilidad del menú lateral al hacer clic en el botón
    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que el clic se propague al documento
        sidebarMenu.classList.toggle("show");
    });

    // Alternar visibilidad del submenú de productos
    productosToggle.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que el clic se propague
        productosSubmenu.classList.toggle("d-none");
    });

    // Ocultar el menú lateral al hacer clic fuera de él
    document.addEventListener("click", function (event) {
        if (!sidebarMenu.contains(event.target) && sidebarMenu.classList.contains("show")) {
            sidebarMenu.classList.remove("show");
        }
    });

    // Manejo básico de enlaces del menú
    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach(link => {

    });

    // Función para actualizar el contenido del carrito en el modal
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement("li");
                cartItem.classList.add("list-group-item");
                cartItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <span>${item.name}</span>
                        <span>$${item.price.toFixed(2)}</span>
                        <button class="btn btn-danger btn-sm" data-index="${index}">&times;</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Agregar eventos para eliminar productos
            const removeButtons = cartItemsContainer.querySelectorAll(".btn-danger");
            removeButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const index = parseInt(this.getAttribute("data-index"), 10);
                    cart.splice(index, 1);
                    updateCartDisplay();
                });
            });
        }
    }

    // Manejo del botón del carrito para abrir el modal
    cartButton.addEventListener("click", function () {
        updateCartDisplay();
        cartModal.show();
    });

    // Manejo del botón para vaciar el carrito
    clearCartButton.addEventListener("click", function () {
        cart = [];
        updateCartDisplay();
    });

    // Manejo de los botones "Comprar" en los productos
    const buyButtons = document.querySelectorAll(".btn-primary");
    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".card");
            const productName = productCard.querySelector(".card-title").textContent;
            const productPrice = parseFloat(productCard.getAttribute("data-price"));

            cart.push({ name: productName, price: productPrice });
            alert(`${productName} ha sido agregado al carrito.`);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector("#carouselContainer");
    const carouselImages = document.querySelectorAll(".carousel-image");
    let currentIndex = 0;
    let interval;

    // Función para mostrar la imagen actual y ocultar las demás
    function showImage(index) {
        carouselImages.forEach((image, i) => {
            if (i === index) {
                image.classList.add("active");
            } else {
                image.classList.remove("active");
            }
        });
    }

    // Función para iniciar el carrusel
    function startCarousel() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        }, 2000); // Cambiar cada 2 segundos
    }

    // Función para detener el carrusel
    function stopCarousel() {
        clearInterval(interval);
    }

    // Configurar eventos para detener y reanudar el carrusel
    carouselImages.forEach((image) => {
        image.addEventListener("mouseover", function () {
            stopCarousel();
            this.classList.add("zoom"); // Añadir clase para el efecto de zoom
        });

        image.addEventListener("mouseout", function () {
            this.classList.remove("zoom"); // Quitar la clase de zoom
            startCarousel();
        });
    });

    // Iniciar el carrusel al cargar la página
    startCarousel();
});
