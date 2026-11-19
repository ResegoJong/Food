
let cart = JSON.parse(localStorage.getItem("freshBitesCart")) || [];

function saveCart() {
    localStorage.setItem("freshBitesCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    alert(name + " added to your cart!");
}

function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function increaseItem(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

function decreaseItem(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function updateCart() {

    const count = document.getElementById("cart-count");
    const total = document.getElementById("cart-total");
    const checkoutTotal = document.getElementById("checkout-total");
    const cartItems = document.getElementById("cart-items");

    if (count) {
        count.textContent = getCartCount();
    }

    if (total) {
        total.textContent = getCartTotal().toFixed(2);
    }

    if (checkoutTotal) {
        checkoutTotal.textContent = getCartTotal().toFixed(2);
    }

    if (cartItems) {

        if (cart.length === 0) {
            cartItems.innerHTML =
                "<p>Your cart is empty. Visit our menu to add meals.</p>";
            return;
        }

        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>Price: P${item.price.toFixed(2)}</p>
                    <p>Subtotal: P${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div class="quantity-controls">
                    <button onclick="decreaseItem(${index})">−</button>
                    <strong>${item.quantity}</strong>
                    <button onclick="increaseItem(${index})">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                </div>

            </div>
        `).join("");
    }
}

document.addEventListener("DOMContentLoaded", updateCart);
