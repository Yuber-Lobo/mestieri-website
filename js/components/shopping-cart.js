import { updateQuantity, createItem, getItem, getData, deleteItem } from "./fetch-data.js";
import { PRODUCT_API_URL, CART_API_URL } from "./api-routes.js";

const BTN_SELECTOR = "";
const ADD_TO_CART_BTN_SELECTOR = ".modal-card__add-cart-btn";
const PRODUCT_QUANTITY_BTN_SELECTOR = ".product-quantity";
const PRODUCT_QUANTITY_INPUT_SELECTOR = ".product-quantity__input";
const PRODUCT_QUANTITY_BTN_ADD_SELECTOR = ".product-quantity__add-btn";
const PRODUCT_QUANTITY_BTN_REMOVE_SELECTOR = ".product-quantity__remove-btn";

export function shoppingCart(e) {

    const target = e.target;

    if (target.closest(PRODUCT_QUANTITY_BTN_SELECTOR)) {
        quantityItems(target);
    } else if (target.closest(ADD_TO_CART_BTN_SELECTOR)) {
        addToCart(target);
    }

}

export async function quantityItems(target) {

    const productQuantityBtn = target.closest(PRODUCT_QUANTITY_BTN_SELECTOR);
    const quantityInput = productQuantityBtn.querySelector(PRODUCT_QUANTITY_INPUT_SELECTOR);

    let quantity = parseInt(quantityInput.value);
    if (target.closest(PRODUCT_QUANTITY_BTN_ADD_SELECTOR)) {
        quantity++;
    } else if (target.closest(PRODUCT_QUANTITY_BTN_REMOVE_SELECTOR)) {
        if (parseInt(quantityInput.value) > 1) {
            quantity--;
        } else {
            updateQuantityShoppingCart(productQuantityBtn.dataset.productId, 0);
        }
    }

    quantityInput.value = quantity;
    totalToPay(productQuantityBtn);

}

async function addToCart(target) {

    // e.preventDefault();

    const $btn = target.closest(".modal-card__cart-btn");
    const quantity = $btn.querySelector(PRODUCT_QUANTITY_INPUT_SELECTOR).value;
    const productId = $btn.querySelector(".modal-card__add-cart-btn").dataset.productId;

    const productData = await getItem(PRODUCT_API_URL, productId);
    const cartItems = await getData(CART_API_URL);
    const existingItem = cartItems.find(item => item.id === productData.id);

    if (existingItem) {

        updateQuantityShoppingCart(productId, quantity);

    } else {

        updateQuantityShoppingCart(productId, quantity);
        const { id, img, titulo, precio } = productData;
        createItem(CART_API_URL, { id, img, titulo, precio, cantidad: quantity });
    }


}


async function updateQuantityShoppingCart(productId, quantity) {

    await updateQuantity(PRODUCT_API_URL, productId, quantity);

    if (quantity >= 1) {

        await updateQuantity(CART_API_URL, productId, quantity);

    } else {
        await deleteItem(CART_API_URL, productId);
        //Toca actualizar el carrito
    }

}

function totalToPay(product) {
    const quantityInput = product.querySelector(PRODUCT_QUANTITY_INPUT_SELECTOR);

    const precioTotalElemento = product.nextElementSibling.querySelector(".total-value");
    const price = product.dataset.price;

    const quantity = parseInt(quantityInput.value);
    const precioTotal = price * quantity;
    precioTotalElemento.innerText = formatPrice(precioTotal);

}

export function getValueInput() {

    document.addEventListener("input", e => {

        const target = e.target;
        const producto = target.closest(PRODUCT_QUANTITY_BTN_SELECTOR);

        if (target.matches(PRODUCT_QUANTITY_INPUT_SELECTOR)) {
            if (parseInt(target.value) <= 0) {
                target.value = 1;
                const id = target.dataset.productId;
                // updateQuantityShoppingCart(id, 0);
            }

            if (target.value != "") {

                totalToPay(producto);
            }
        }
    });
}

export function formatPrice(price) {
    return price.toLocaleString('es-ES');
}
