import { getData } from "./components/fetch-data.js";
import loadProducts from "./components/load-products.js";
import loadCategories from "./components/load-categories.js";
import loadShoppingCart from "./components/load-shopping-cart.js";
import filterCategory from "./components/filter-categories.js";
import menu from "./components/menu.js";
import selectCategory from "./components/select-category.js";
import selectColor from "./components/select-color.js";
import { getValueInput, handleOnClick } from "./components/shopping-cart.js";

const menuPath = "/menu.html";

let currentPath = window.location.pathname;

document.addEventListener("DOMContentLoaded", () => {

    if (currentPath === menuPath) {

        loadCategories();
        loadProducts();
        getValueInput();
    }
    document.addEventListener("click", handleOnClick);
    loadShoppingCart();
    menu();
    selectColor();
})

// async function menuProducts() {
//     try {
//         const data = await getProducts("http://localhost:3000/productos");
//         console.info(data);
//         if (data) {
//             loadProducts(data);
//             loadCategories(data.categorias);
//             filterCategory(data.productos);
//         }
//     } catch (error) {
//         console.error('Hubo un error al cargar los productos:', error);
//     }
// }

