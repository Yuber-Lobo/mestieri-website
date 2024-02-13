import loadProducts from "./load-products.js";

export default function filterCategory(products) {

    document.addEventListener("click", handleCategoryClick);

    function handleCategoryClick(e) {
        // console.info(e.target.closest(".categories__container").classList.contains("categories__container"));
        if (e.target.matches("[data-category] *") && e.target.closest(".categories__container").classList.contains("categories__container")) {

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