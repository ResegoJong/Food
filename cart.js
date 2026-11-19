
// Get saved cart or create an empty cart
let cart = JSON.parse(localStorage.getItem("freshBitesCart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("freshBitesCart", JSON.stringify(cart));
}

// Add food to cart
function addToCart(name, price) {

    let item = cart.find(food => food.name === name);

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

// Calculate total number of items
function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Calculate total price
function getCartTotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );
}

// Increase quantity
function increaseItem(index) {
    cart[index].quantity++;
    saveCart();
    updateCart();
}

// Decrease quantity
function decreaseItem(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

// Remove item completely
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

// Update cart display
function updateCart() {

    let count = document.getElementById("cart-count");
    let total = document.getElementById("cart-total");

    if (count) {
        count.textContent = getCartCount();
    }

    if (total) {
        total.textContent = getCartTotal().toFixed(2);
    }

    let cartItems = document.getElementById("cart-items");

    if (cartItems) {

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
        } else {

            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">

                    <div>
                        <h3>${item.name}</h3>
                        <p>P${item.price.toFixed(2)} each</p>
                        <p>Subtotal: P${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div class="quantity-controls">
                        <button onclick="decreaseItem(${index})">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseItem(${index})">+</button>
                        <button onclick="removeItem(${index})">Remove</button>
                    </div>

                </div>
            `).join("");
        }
    }

    let checkoutTotal = document.getElementById("checkout-total");

    if (checkoutTotal) {
        checkoutTotal.textContent = getCartTotal().toFixed(2);
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", updateCart);
