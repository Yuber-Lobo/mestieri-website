import { getData } from "./fetch-data.js";
import { CART_API_URL } from "./api-routes.js";
import { formatPrice } from "./shopping-cart.js";


export default async function loadShoppingCart() {

    const products = await getData(CART_API_URL);

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
        $price.textContent = formatPrice(precio);
        $quantity.value = cantidad;

        if (cantidad >= 1) {

            $totalValue.textContent = formatPrice(precio * cantidad);

        } else {

            $totalValue.textContent = formatPrice(precio);
        }

        $fragment.appendChild($row);

    });

    $cartBody.appendChild($fragment);

    totalToPay();
}

export function totalToPay() {

    const $items = document.querySelectorAll(".table-cart__row-content");
    const $totalPurchase = document.getElementById("sub-total");
    let totalPrice = 0;

    $items.forEach(item => {

        const itemPrice = parseInt((item.querySelector(".total-value").textContent).replace(".", ""));

        totalPrice += itemPrice;

    });

    $totalPurchase.textContent = formatPrice(totalPrice);

}