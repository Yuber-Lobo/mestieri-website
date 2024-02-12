import fetchData from "./components/fecth-data.js";
import loadProducts from "./components/load-products.js";
import loadCategories from "./components/load-categories.js";
import filterCategory from "./components/filter-categories.js";
import menu from "./components/menu.js";
import selectCategory from "./components/select-category.js";
import selectColor from "./components/select-color.js";
import { addCart, quantityItems } from "./components/shopping-cart.js";

const menuPath = "/menu.html";

let currentPath = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {

    if (currentPath === menuPath) {
        // selectCategory();
        menuProducts();
        addCart();
    }
    menu();
    quantityItems();
    selectColor();
})

async function menuProducts() {
    try {
        const data = await fetchData("../db.json");
        if (data) {
            loadProducts(data.productos);
            loadCategories(data.categorias);
            filterCategory(data.productos);
        }
    } catch (error) {
        console.error('Hubo un error al cargar los productos:', error);
    }
}

