export default function loadAllProducts() {

    fetchData("../db.json");
}

async function fetchData(url) {
    try {
        const response = await fetch(url); // Esperamos la respuesta de la solicitud
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json(); // Esperamos los datos JSON
        loadProducts(data.productos);
        loadCategories(data.categorias);
        filterCategory(data.productos);
        // console.info(data.categorias);
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

function loadProducts(products) {

    const $cards = document.querySelector(".cards");
    const $template = document.getElementById("template-card").content;
    const $fragment = document.createDocumentFragment();
    // Clonar el template una sola vez
    const $cardTemplate = document.importNode($template, true);

    products.forEach(product => {
        const $clone = $cardTemplate.cloneNode(true); // Clonar el nodo del template

        // Acceder a las propiedades del producto usando destructuring
        const { id, categoria, img, titulo, puntuacion, descripcion, precio } = product;

        // Modificar los nodos clonados
        const $card = $clone.querySelector(".card");
        $card.setAttribute("id", id);
        $card.dataset.category = categoria.id;
        $clone.querySelector(".card__img").setAttribute("src", img);
        $clone.querySelector(".card__img").setAttribute("alt", titulo);
        $clone.querySelector(".card__title").textContent = titulo;
        $clone.querySelector(".card__score").textContent = puntuacion;
        $clone.querySelector(".card__description").textContent = descripcion;
        $clone.querySelector(".card__value").textContent = precio;

        $fragment.appendChild($clone);
    });
    $cards.innerHTML = "";
    $cards.appendChild($fragment);
}

function loadCategories(categories) {
    const $categories = document.querySelector(".categories__container");
    const $template = document.getElementById("template-categories").content;
    const $fragment = document.createDocumentFragment();
    // Clonar el template una sola vez
    const $cardTemplate = document.importNode($template, true);

    categories.forEach(category => {
        const $clone = $cardTemplate.cloneNode(true); // Clonar el nodo del template

        // Acceder a las propiedades del producto usando destructuring
        const { id, nombre } = category;

        // Modificar los nodos clonados
        const $category = $clone.querySelector(".category");

        $category.dataset.category = id;
        $category.querySelector(".category__type").textContent = nombre;


        $fragment.appendChild($clone);
    });

    $categories.appendChild($fragment);
}

function filterCategory(products) {

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