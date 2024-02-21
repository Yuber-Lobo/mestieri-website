import { getData } from "./fetch-data.js";


const apiUrl = "http://localhost:3000/productos";


export default async function loadProducts() {

    const products = await getData(apiUrl);

    const $cards = document.querySelector(".cards");
    const $fragment = document.createDocumentFragment();
    console.info(products);
    products.forEach(product => {

        const $card = createCard(product);
        const $cardModal = createModalCard(product);

        $fragment.appendChild($card);
        $fragment.appendChild($cardModal);

    });

    $cards.innerHTML = "";
    $cards.appendChild($fragment);

}

function loadIngredientes(ingredientes) {

    const $templateIngredient = document.getElementById("template-ingredient").content
    const $fragment = document.createDocumentFragment();
    const $ingredientTemplate = document.importNode($templateIngredient, true);

    // console.info(ingredientes.nombre);

    ingredientes.forEach(ingrediente => {
        const $clone = $ingredientTemplate.cloneNode(true);
        const $label = $clone.querySelector("label");
        const $checkbox = $clone.querySelector('input[type="checkbox"]');

        const { id, nombre, incluido } = ingrediente;

        $label.setAttribute('for', id);
        $label.textContent = nombre;
        $checkbox.setAttribute('id', id);
        $checkbox.checked = incluido;

        $fragment.appendChild($clone);

    });
    return $fragment;
}

function createCard(product) {
    const { id, img, titulo, puntuacion, descripcion, precio } = product;

    const $templateCard = document.getElementById("template-card").content;
    const $clonedNode = document.importNode($templateCard, true);

    const $card = $clonedNode.querySelector(".card");
    const $img = $card.querySelector(".card__img");
    const $title = $card.querySelector(".card__title");
    const $score = $card.querySelector(".card__score");
    const $description = $card.querySelector(".card__description");
    const $value = $card.querySelector(".card__value");

    $card.id = id;
    $card.href = `#card-${id}`;
    $img.src = img;
    $img.alt = titulo;
    $title.textContent = titulo;
    $score.textContent = puntuacion;
    $description.textContent = descripcion;
    $value.textContent = precio;

    return $clonedNode;
}

function createModalCard(product) {

    const { id, img, titulo, puntuacion, descripcion, precio, ingredientes, cantidad } = product;

    const $templateCardModal = document.getElementById("template-modal_card").content.cloneNode(true);
    const $clonedNode = document.importNode($templateCardModal, true);

    const $cardModal = $clonedNode.querySelector(".modal-card");
    const $heroImage = $cardModal.querySelector('.modal-card__header.hero-image');
    const $title = $cardModal.querySelector(".modal-card__title");
    const $score = $cardModal.querySelector(".modal-card__score");
    const $description = $cardModal.querySelector(".modal-card__description");
    const $priceValue = $cardModal.querySelector(".modal-card__price .card__value");
    const $totalValue = $cardModal.querySelector(".card__value-total");
    const $customizePurchase = $cardModal.querySelector(".customize-purchase");
    const $quantityInput = $cardModal.querySelector(".modal-card__quantity-btn .card__num-items");
    const $btnAddCart = $cardModal.querySelector(".modal-card__cart-btn .modal-card__add-cart-btn");

    $cardModal.id = `card-${id}`;
    $heroImage.style.setProperty('--hero-image-url', `url(${img})`);
    $title.textContent = titulo;
    $score.textContent = puntuacion;
    $description.textContent = descripcion;
    $priceValue.textContent = precio;
    $customizePurchase.appendChild(loadIngredientes(ingredientes));
    $btnAddCart.dataset.productId = id;

    if (cantidad >= 1) {
        $quantityInput.value = cantidad;
    }

    if (cantidad >= 1) {
        let price = parseFloat(precio.replace(".", ""));
        $totalValue.textContent = (price * cantidad).toLocaleString('de-DE');

    } else {

        $totalValue.textContent = precio;
    }

    return $clonedNode;
}