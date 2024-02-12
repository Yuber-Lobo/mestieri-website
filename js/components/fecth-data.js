export default async function fetchData(url) {
    try {
        const response = await fetch(url); // Esperamos la respuesta de la solicitud
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const data = await response.json(); // Esperamos los datos JSON
        return data;
        // console.info(data.categorias);
    } catch (error) {
        console.error('Hubo un error:', error);
    }
}