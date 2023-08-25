export default function selectColor() {

    const $select = document.getElementById("doc-type");

    let value, selectClass;

    $select.addEventListener("change", (e) => {

        value = $select.value;
        selectClass = $select.classList.contains("form__select--selected");

        if (value != "none" && !selectClass) {
            $select.classList.remove("form__select--unselected");
            $select.classList.add("form__select--selected");

        }
    })


}

