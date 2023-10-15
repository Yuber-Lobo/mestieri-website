export default function loadAllProducts() {

    fetchData("/products.json");
}

async function fetchData(url) {
    try {
        const response = await fetch(url); // Esperamos la respuesta de la solicitud
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json(); // Esperamos los datos JSON
        // console.log('Datos JSON obtenidos:', data);
        loadProducts(data);
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}

function loadProducts(products) {

    const $cards = document.querySelector(".cards");
    const $template = document.getElementById("template-card").content;
    const $fragment = document.createDocumentFragment();
    let $clone;

    products.forEach(producto => {
        $template.querySelector(".card").setAttribute("id", producto.id);
        $template.querySelector(".card").dataset.category = producto.categoria.id;
        $template.querySelector(".card__img").setAttribute("src", producto.img);
        $template.querySelector(".card__img").setAttribute("alt", producto.titulo);
        $template.querySelector(".card__title").textContent = producto.titulo;
        $template.querySelector(".card__score").textContent = producto.puntuacion;
        $template.querySelector(".card__description").textContent = producto.descripcion;
        $template.querySelector(".card__value").textContent = producto.precio;

        $clone = document.importNode($template, true);
        $fragment.appendChild($clone);
    });

    $cards.appendChild($fragment);
}