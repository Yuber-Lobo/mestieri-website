
export async function fetchJson(url, options) {
    try {
        const response = await fetch(url, options); // Esperamos la respuesta de la solicitud

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }

        const data = await response.json(); // Esperamos los datos JSON
        return data;
        // console.info(data.categorias);
    } catch (error) {
        console.error('Error en la solicitud HTTP:', error);
        // throw error;
    }
}


export async function getData(apiUrl) {

    return await fetchJson(apiUrl);

}

export async function getItem(apiUrl, productId) {

    return await fetchJson(`${apiUrl}/${productId}`);

}


export async function createItem(apiUrl, data) {

    return await fetchJson(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

}

export async function updateItems(apiUrl, productId, newData) {

    return await fetchJson(`${apiUrl}/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newData),
    });

}

export async function updateQuantity(apiUrl, productId, newQuantity) {
    return await fetchJson(`${apiUrl}/${productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ cantidad: newQuantity }),
    });

}

export async function deleteItem(apiUrl,productId) {
    return await fetchJson(`${apiUrl}/${productId}`, {
        method: 'DELETE',
    });
}