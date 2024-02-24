import { getData } from "./fetch-data.js";

const apiUrl = "http://localhost:3000/carrito";

export default async function loadShoppingCart() {

    const products = await getData(apiUrl);

    const $cartBody = document.querySelector(".table-cart__body");
    const $template = document.getElementById("template-shopping-cart").content;
    const $fragment = document.createDocumentFragment();
    const $cartTemplate = document.importNode($template, true);

    products.forEach(product => {
        const $clone = $cartTemplate.cloneNode(true);

        const $row = $clone.querySelector(".table-cart__row-content");
        const $img = $row.querySelector(".table-cart__img");
        const $title = $row.querySelector(".table-cart__title");
        const $price = $row.querySelector(".table-cart__price-by-unit");
        const $quantityBtn = $row.querySelector(".product-quantity");
        const $quantity = $row.querySelector(".product-quantity__input");
        const $totalValue = $row.querySelector(".total-value");

        const { id, img, titulo, precio, cantidad } = product;

        $row.dataset.producId = id;
        $quantityBtn.dataset.productId = id;
        $quantityBtn.dataset.price = precio;
        $img.src = img;
        $img.alt = titulo;
        $title.textContent = titulo;
        $price.textContent = precio;
        $quantity.value = cantidad;

        if (cantidad >= 1) {
            let price = parseFloat(precio.replace(".", ""));
            $totalValue.textContent = (price * cantidad).toLocaleString('de-DE');

        } else {

            $totalValue.textContent = precio;
        }

        $fragment.appendChild($row);

    });

    $cartBody.appendChild($fragment);
}

