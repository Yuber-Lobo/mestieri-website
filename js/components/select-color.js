export default function selectColor() {

    const $select = document.getElementById("doc-type");

    let value, selectClass;

    document.addEventListener("change", (e) => {

        if (e.target.id === "doc-type") {

            value = $select.value;
            selectClass = $select.classList.contains("form__select--selected");

            if (value != "none" && !selectClass) {
                $select.classList.remove("form__select--unselected");
                $select.classList.add("form__select--selected");

            }
        }
    })


}

