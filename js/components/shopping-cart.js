const $numItems = document.querySelector(".card__num-items");
let i = 1;

export function addCart() {

    const $addCardBtn = document.querySelector(".card__add-cart-btn");
    const $quantityBtn = document.querySelector(".card__quantity-btn");

    $quantityBtn.addEventListener("click", (e) => {
        e.preventDefault();
    })

    $addCardBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.matches(".card__add-cart-btn *")) {
            console.log(e);
            $addCardBtn.classList.add("card__add-cart-btn--hidden");
            $quantityBtn.classList.remove("card__quantity-btn--hidden");
            $numItems.value = i;
        }
    });



}

export function quantityItems() {

    const $removeBtn = document.querySelector(".card__remove");
    const $addBtn = document.querySelector(".card__add");

    $addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target);

        if (e.target.matches("svg.card__add")) {
            i++;
            $numItems.value = i;
            // console.log(`algo ${$numItems.value = i}`);
        }

        console.log(i);

    })

    $removeBtn.addEventListener("click", (e) => {
        // e.preventDefault();
        console.log(e.target);

        if (e.target.matches("svg.card__remove")) {

            if (i > 1) {
                i--;
                $numItems.value = i;
            }
        }

        console.log(i);

    })

}