const $numItems = document.querySelector(".card__num-items");

export function addCart() {

    const $addCardBtn = document.querySelectorAll(".card__add-cart-btn");
    const $quantityBtn = document.querySelectorAll(".card__quantity-btn");

    let nextBrother, previousBrother;

    $quantityBtn.forEach(btn => {

        btn.addEventListener("click", (e) => {
            e.preventDefault();
        });

    });

    // Activar la opción de numero de productos
    $addCardBtn.forEach(btn => {

        btn.addEventListener("click", (e) => {
            e.preventDefault();

            if (e.currentTarget.matches(".card__add-cart-btn")) {

                btn.classList.add("card__add-cart-btn--hidden");

                nextBrother = btn.nextElementSibling;
                nextBrother.classList.remove("card__quantity-btn--hidden");
                nextBrother.children[1].value = 1;
            }
        });

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