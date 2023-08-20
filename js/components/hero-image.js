export default function heroImage() {

    const $heroImages = document.querySelectorAll(".hero-image");

    let $heroImage, opacityColor, attachment, img;

    for (let i = 0; i < $heroImages.length; i++) {
        $heroImage = $heroImages[i];

        // Obtener el valor de cada atributo de datos
        opacityColor = $heroImage.dataset.opacityColor;
        img = $heroImage.dataset.url;
        attachment = $heroImage.dataset.attachment;

        // Asignar el valor al estilo CSS correspondiente
        $heroImage.style.backgroundImage = `linear-gradient(${opacityColor}, ${opacityColor}), ${img}`;
        $heroImage.style.backgroundAttachment = attachment;
    }
}