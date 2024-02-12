export default function loadProducts(products) {

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



