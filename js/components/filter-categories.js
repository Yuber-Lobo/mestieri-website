import { getData } from "./fetch-data.js";
import { PRODUCT_API_URL } from "./api-routes.js";
import { createProducts } from "./load-products.js";

export default async function filterCategory(e) {

    const products = await getData(PRODUCT_API_URL);

    if (e.target.closest(".category")) {

        const categoryId = parseInt(e.target.closest("[data-category]").dataset.category);

        if (categoryId !== 1) {
            const filteredProducts = products.filter(producto => producto.categoria_id === categoryId);
            // console.info(filteredProducts);
            createProducts(filteredProducts);
        } else {
            createProducts(products)
        }
    }
}