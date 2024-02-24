import { updateQuantity, createItem, getItem, getData, deleteItem } from "./fetch-data.js";
const apiUrl = "http://localhost:3000/productos";
const apiUrlCart = "http://localhost:3000/carrito";


export function handleOnClick(e) {
    quantityItems(e);
    addToCart(e);
}

export async function quantityItems(e) {
    const target = e.target;
    const productQuantityBtn = target.closest('.product-quantity');

    if (productQuantityBtn) {

        const cantidadInput = productQuantityBtn.querySelector('.product-quantity__input');

        // product-quantity__add-btn *
        if (target.matches(".product-quantity__add-btn *")) {
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
        } else if (target.matches(".product-quantity__remove-btn *")) {
            if (parseInt(cantidadInput.value) > 1) {
                cantidadInput.value = parseInt(cantidadInput.value) - 1;
            } else {
                const cant = "0";
                dataShoppingCart(productQuantityBtn, cant);
            }
        }

        totalToPay(productQuantityBtn);
    }
}

async function addToCart(e) {

    if (e.target.closest(".modal-card__add-cart-btn")) {
        e.preventDefault();

        const $btn = e.target.closest(".modal-card__cart-btn");
        const cant = $btn.querySelector('.product-quantity__input').value;
        const productId = $btn.querySelector(".modal-card__add-cart-btn");

        const data = await getItem(apiUrl, productId.dataset.productId);

        const addCart = {
            id: data.id,
            img: data.img,
            titulo: data.titulo,
            precio: data.precio,
            cantidad: cant,
        }

        // console.info(addCart);
        const cartItems = await getData(apiUrlCart);

        const existingItem = cartItems.find(item => item.id === addCart.id);

        if (existingItem) {

            dataShoppingCart(productId, cant);


        } else {

            dataShoppingCart(productId, cant);
            createItem(apiUrlCart, addCart);
        }

    }
}


async function dataShoppingCart(id, cant) {
    //recuerda asignar id
    const productId = id.dataset.productId;

    await updateQuantity(apiUrl, productId, cant);

    if (cant >= 1) {

        await updateQuantity(apiUrlCart, productId, cant);

    } else {
        //Toca actualizar el carrito
        await deleteItem(apiUrlCart, productId);
    }

}

function totalToPay(product) {
    const cantidadInput = product.querySelector('.product-quantity__input');//input
    console.info(product.nextElementSibling);
    const precioTotalElemento = product.nextElementSibling.querySelector(".total-value");
    const price = product.dataset.price;
    const parsedPrice = parseFloat(price.replace(".", ""));

    const cantidad = parseInt(cantidadInput.value);
    const precioTotal = parsedPrice * cantidad;
    precioTotalElemento.innerText = precioTotal.toLocaleString('de-DE');

}

//No es necesario
export function getValueInput() {

    document.addEventListener("input", e => {

        const target = e.target;
        const producto = target.closest(".modal-card__cart-btn");

        if (target.matches('.card__num-items')) {
            if (parseInt(target.value) <= 0) {
                target.value = 1;
                const id = producto.querySelector(".modal-card__add-cart-btn");
                const cant = "0";
                dataShoppingCart(id, cant);
            }
            totalToPay(producto);
        }
    });
}

