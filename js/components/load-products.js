export default function loadProducts(products) {

    const $cards = document.querySelector(".cards");
    const $fragment = document.createDocumentFragment();

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
    const $card = document.importNode($templateCard, true).querySelector(".card");

    const $img = $card.querySelector(".card__img img");
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

    return $templateCard;
}

function createModalCard(product) {
    const { id, img, titulo, puntuacion, descripcion, precio, ingredientes } = product;

    const $templateCardModal = document.getElementById("template-modal_card").content.cloneNode(true);
    const $cardModal = document.importNode($templateCardModal, true).querySelector(".modal-card");
    const $heroImage = $cardModal.querySelector('.modal-card__header.hero-image');
    const $title = $cardModal.querySelector(".modal-card__title");
    const $score = $cardModal.querySelector(".modal-card__score");
    const $description = $cardModal.querySelector(".modal-card__description");
    const $priceValue = $cardModal.querySelector(".modal-card__price .card__value");
    const $totalValue = $cardModal.querySelector(".card__value-total");
    const $customizePurchase = $cardModal.querySelector(".customize-purchase");

    $cardModal.id = `card-${id}`;
    $heroImage.style.setProperty('--hero-image-url', `url(${img})`);
    $title.textContent = titulo;
    $score.textContent = puntuacion;
    $description.textContent = descripcion;
    $priceValue.textContent = precio;
    $totalValue.textContent = `$ ${precio}`;
    $customizePurchase.appendChild(loadIngredientes(ingredientes));

    return $templateCardModal;
}