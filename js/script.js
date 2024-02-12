import loadAllProducts from "./components/load-products.js";
import menu from "./components/menu.js";
import selectCategory from "./components/select-category.js";
import selectColor from "./components/select-color.js";
import { addCart, quantityItems } from "./components/shopping-cart.js";

const menuPath = "/menu.html";

let currentPath = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {

    if (currentPath === menuPath) {
        loadAllProducts();
        // selectCategory();
        addCart();
    }
    menu();
    quantityItems();
    selectColor();
})

