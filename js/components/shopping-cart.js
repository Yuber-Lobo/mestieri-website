import { updateQuantity } from "./fetch-data.js";
const apiUrl = "http://localhost:3000/productos";

// document.addEventListener("click", handleOnClick);

export function handleOnClick(e) {
    quantityItems(e);
    // updateQuantity(e);

}

let cant = 0;
export async function quantityItems(e) {
    const quantityBtn = e.target.parentElement;
    if (quantityBtn.classList.contains("modal-card__quantity-btn")) {
        const $input = quantityBtn.querySelector(".card__num-items");
        cant = parseInt($input.value); // Obtener el valor actual del input

        if (e.target.matches(".card__add")) {
            cant++; // Incrementar el valor
            $input.value = cant; // Asignar el nuevo valor al input
        }

        if (e.target.matches(".card__remove")) {
            if (cant >= 2) {
                cant--; // Decrementar el valor
                $input.value = cant; // Asignar el nuevo valor al input
            }
        }
    }

    if (e.target.matches(".modal-card__add-cart-btn *")) {

        // e.preventDefault();

        const productId = e.target.closest(".modal-card__add-cart-btn").dataset.productId;

        await updateQuantity(apiUrl, productId, cant);
    }
}
