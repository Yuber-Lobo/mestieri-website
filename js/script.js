import { getData } from "./components/fetch-data.js";
import loadProducts from "./components/load-products.js";
import loadCategories from "./components/load-categories.js";
import loadShoppingCart from "./components/load-shopping-cart.js";
import filterCategory from "./components/filter-categories.js";
import menu from "./components/menu.js";
import selectColor from "./components/select-color.js";
import { getValueInput, shoppingCart } from "./components/shopping-cart.js";
import loadProductInSprite, { confirmPayment, payWithStripe } from "./components/stripe.js";

const menuPath = "/menu.html";
const shoppingCartPath = "/shopping-cart.html";
const success = "/success.html"

let currentPath = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {

    if (currentPath === menuPath) {

        loadCategories();
        loadProducts();

        document.addEventListener("click", filterCategory);
    }
    if (currentPath === shoppingCartPath) {

        loadShoppingCart();
        loadProductInSprite();
        document.addEventListener("click", payWithStripe);
    }
    if (currentPath === success) {
        confirmPayment();
    }
    document.addEventListener("click", shoppingCart);
    getValueInput();
    menu();
    selectColor();
})


