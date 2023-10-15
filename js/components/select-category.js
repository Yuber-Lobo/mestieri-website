export default function selectCategory() {

    const $categoryBtn = document.querySelectorAll(".category");

    let id, categoryAll = $categoryBtn[0].getAttribute("id");

    $categoryBtn.forEach(btn => {
        btn.addEventListener("click", () => {

            const $cards = document.querySelectorAll(".card");

            id = btn.getAttribute("id");
            activateCategory(id, $categoryBtn);
            hiddenCards($cards, categoryAll, id);

        });
    });
}

function hiddenCards(cards, categoryAll, id) {

    cards.forEach(card => {

        if (id == categoryAll) {
            card.classList.remove("card--hidden");
        }
        else {
            if (card.dataset.category == id) {
                card.classList.remove("card--hidden");
            } else {
                card.classList.add("card--hidden");
            }
        }
    });
}

function activateCategory(id, categoryBtn) {

    categoryBtn.forEach(btn => {
        if (btn.getAttribute("id") == id) {
            btn.lastElementChild.classList.add("category__type--active");
        } else {
            btn.lastElementChild.classList.remove("category__type--active");

        }
    });
}
