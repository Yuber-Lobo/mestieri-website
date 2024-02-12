import loadProducts from "./load-products.js";

export default function filterCategory(products) {

    document.addEventListener("click", handleCategoryClick);

    function handleCategoryClick(e) {

        if (e.target.matches("[data-category] *")) {

            const categoryId = e.target.closest("[data-category]").dataset.category;

            if (categoryId !== "1") {
                const filteredProducts = products.filter(producto => producto.categoria.id === categoryId);
                // console.info(filteredProducts);
                loadProducts(filteredProducts);
            } else {
                loadProducts(products)
            }
        }
    }
}