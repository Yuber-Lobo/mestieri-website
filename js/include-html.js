document.addEventListener("DOMContentLoaded", includeHTML);

async function includeHTML() {

    document
        .querySelectorAll("[data-include]")
        .forEach(async (el) => await getHTML(el, el.getAttribute("data-include")));

}

async function getHTML(el, url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        el.outerHTML = html;

    } catch (error) {
        let message = error.message || "Error al cargar el archivo";
        el.outerHTML = `<div> <p>${message}</p> </div>`;
    }

}