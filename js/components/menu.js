export default function menu() {

    const $menuBtn = document.querySelector(".menu-btn");
    const $menu = document.querySelector(".nav");

    document.addEventListener("click", (e) => {

        if (e.target.matches(".menu-btn *")) {
            $menu.classList.toggle("nav--active");
            $menuBtn.firstElementChild.classList.toggle("menu_bars--hidden")
            $menuBtn.lastElementChild.classList.toggle("menu_close--hidden");
        }

        if (e.target.matches(".nav__link")) {
            $menu.classList.remove("nav--active");
            $menuBtn.firstElementChild.classList.remove("menu_bars--hidden")
            $menuBtn.lastElementChild.classList.add("menu_close--hidden");

        }

    });

}