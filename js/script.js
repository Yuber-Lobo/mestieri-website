import menu from "./components/menu.js";
import selectColor from "./components/select-color.js";
import { addCart, quantityItems } from "./components/shopping-cart.js";

document.addEventListener("DOMContentLoaded", () => {
    menu();
    quantityItems();
    addCart();
    selectColor();
})