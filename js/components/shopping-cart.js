const $numItems = document.querySelector(".card__num-items");

let cart = [];

export function addCart() {

    let parentElement, nextBrother, previousBrother;

    document.addEventListener("click", (e) => {

        if (e.target.matches(".card__add-cart-btn *")) {

            parentElement = e.target.parentElement;

            parentElement.classList.add("card__add-cart-btn--hidden")

            parentElement.nextElementSibling.classList.remove("card__quantity-btn--hidden")

        }

    });


}

export function quantityItems() {
    let i = 1;

    const $removeBtn = document.querySelectorAll(".card__remove");
    const $addBtn = document.querySelectorAll(".card__add");

    $addBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            i++;
            btn.previousElementSibling.value = i;
        });
    })

    $removeBtn.forEach(btn => {

        btn.addEventListener("click", (e) => {

            if (i > 1) {
                i--;
                btn.nextElementSibling.value = i;
            }
        });
    });

}