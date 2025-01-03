document.addEventListener("DOMContentLoaded", () => {
    const cart = [];

    //DOM
    const cartButton = document.getElementById("cartButton");
    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const clearCart = document.getElementById("clearCart");
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartUI();
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Actualizar los productos en el modal del carrito
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" data-name="${item.name}">Eliminar</button>
                </td>
            `;

            cartItems.appendChild(row);
        });

        // Actualizar el total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);

        // Añadir manejadores de eventos para los botones de eliminar
        const deleteButtons = cartItems.querySelectorAll("button[data-name]");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                decreaseItemQuantity(button.getAttribute("data-name"));
            });
        });
    }

    // Función para disminuir la cantidad de un producto del carrito
    function decreaseItemQuantity(name) {
        const item = cart.find(item => item.name === name);

        if (item) {
            item.quantity -= 1;
            if (item.quantity === 0) {
                const itemIndex = cart.indexOf(item);
                cart.splice(itemIndex, 1); // Eliminar completamente si la cantidad llega a 0
            }
            updateCartUI();
        }
    }

    // Función para vaciar el carrito
    clearCart.addEventListener("click", () => {
        cart.length = 0; // Vaciar el carrito
        updateCartUI();
    });

    // Añadir eventos a los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            addToCart(name, price);
        });
    });

    // Inicialización
    updateCartUI();

    // Manejo del botón del carrito para abrir el modal
    cartButton.addEventListener("click", () => {
        cartModal.show();
    });
});
