/**
 * Módulo para manejar el carrito de compras.
 * @module ShoppingCart
 */
import { updateQuantity, createItem, getItem, getData, deleteItem } from "./fetch-data.js";
import { PRODUCT_API_URL, CART_API_URL } from "./api-routes.js";
import { totalToPay } from "./load-shopping-cart.js";

// Importación de funciones y URLs de API desde archivos externos
const BTN_SELECTOR = "";
const ADD_TO_CART_BTN_SELECTOR = ".modal-card__add-cart-btn";
const PRODUCT_QUANTITY_BTN_SELECTOR = ".product-quantity";
const PRODUCT_QUANTITY_INPUT_SELECTOR = ".product-quantity__input";
const PRODUCT_QUANTITY_BTN_ADD_SELECTOR = ".product-quantity__add-btn";
const PRODUCT_QUANTITY_BTN_REMOVE_SELECTOR = ".product-quantity__remove-btn";

/**
 * Maneja los eventos del carrito de compras.
 * @param {Event} e - Evento de clic.
 */
export function shoppingCart(e) {

    const target = e.target;

    if (target.closest(PRODUCT_QUANTITY_BTN_SELECTOR)) {
        quantityItems(target);
    } else if (target.closest(ADD_TO_CART_BTN_SELECTOR)) {
        addToCart(target);
    }

}

/**
 * Maneja la cantidad de productos en el carrito.
 * @param {HTMLElement} target - Elemento HTML que disparó el evento.
 */
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
            // Si la cantidad es 1 y se intenta disminuir, se elimina el producto del carrito
            updateQuantityShoppingCart(productQuantityBtn.dataset.productId, 0);
        }
    }

    quantityInput.value = quantity;
    totalProduct(productQuantityBtn);
    
    if (target.closest(".table-cart__data")) {
        // Si la acción proviene de un elemento dentro de la tabla del carrito, actualiza la cantidad en la base de datos y recalcula el total a pagar
        updateQuantityShoppingCart(productQuantityBtn.dataset.productId, quantity);
        totalToPay();
    }
}

/**
 * Agrega productos al carrito.
 * @param {HTMLElement} target - Elemento HTML que disparó el evento.
 */
async function addToCart(target) {

    // e.preventDefault();

    const $btn = target.closest(".modal-card__cart-btn");
    const quantity = $btn.querySelector(PRODUCT_QUANTITY_INPUT_SELECTOR).value;
    const productId = $btn.querySelector(".modal-card__add-cart-btn").dataset.productId;
    const priceId = $btn.querySelector(".modal-card__add-cart-btn").dataset.stripePrice;

    const productData = await getItem(PRODUCT_API_URL, productId);
    const cartItems = await getData(CART_API_URL);
    const existingItem = cartItems.find(item => item.id === productData.id);

    if (existingItem) {
        // Si el producto ya existe en el carrito, actualiza su cantidad
        updateQuantityShoppingCart(productId, quantity);

    } else {
        // Si el producto no existe en el carrito, lo añade
        updateQuantityShoppingCart(productId, quantity);
        const { id, img, titulo, precio } = productData;
        createItem(CART_API_URL, { id, img, titulo, precio, cantidad: quantity, precio_id: priceId });
    }

}

/**
 * Actualiza la cantidad de un producto en el carrito.
 * @param {string} productId - ID del producto.
 * @param {number} quantity - Cantidad del producto.
 */
export async function updateQuantityShoppingCart(productId, quantity) {
    // Actualiza la cantidad en la base de datos
    await updateQuantity(PRODUCT_API_URL, productId, quantity);

    // Si la cantidad es mayor o igual a 1, actualiza la cantidad en el carrito
    if (quantity >= 1) {
        await updateQuantity(CART_API_URL, productId, quantity);

    } else {
        // Si la cantidad es 0, elimina el producto del carrito
        await deleteItem(CART_API_URL, productId);
        //Toca actualizar el carrito
    }

}

/**
 * Calcula y muestra el precio total del producto.
 * @param {HTMLElement} product - Elemento HTML del producto.
 */
function totalProduct(product) {
    const quantityInput = product.querySelector(PRODUCT_QUANTITY_INPUT_SELECTOR);

    const precioTotalElemento = product.nextElementSibling.querySelector(".total-value");
    const price = product.dataset.price;

    const quantity = parseInt(quantityInput.value);
    const precioTotal = price * quantity;
    precioTotalElemento.innerText = formatPrice(precioTotal);

}

/**
 * Escucha cambios en los campos de cantidad de producto y actualiza los cálculos del carrito.
 */
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

                totalProduct(producto);
            }
        }

        totalToPay();

    });
}

/**
 * Formatea el precio en formato de moneda local.
 * @param {number} price - Precio a formatear.
 * @returns {string} - Precio formateado.
 */
export function formatPrice(price) {
    return price.toLocaleString('es-ES');
}
