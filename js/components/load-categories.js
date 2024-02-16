import { getData } from "./fetch-data.js";


const apiUrl = "http://localhost:3000/categorias";

export default async function loadCategories() {

    const categories = await getData(apiUrl);

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