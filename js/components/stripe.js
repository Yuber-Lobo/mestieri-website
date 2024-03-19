import KEYS from "./stripe-keys.js"
import {
    STRIPE_PRODUCT_API_URL, STRIPE_PRICE_API_URL, PRODUCT_API_URL, CART_API_URL, STRIPE_CHECKOUT_API_URL
} from "./api-routes.js"
import { fetchJson, getData } from "./fetch-data.js"
import { updateQuantityShoppingCart } from "./shopping-cart.js";

const HEADER_AUTHORIZATION = `Bearer ${KEYS.secret}`;

export default async function loadProductInSprite() {

    const products = await getData(PRODUCT_API_URL);

    const stripeProducts = await getStripeItems(PRODUCT_API_URL);

    for (const product of products) {

        const productExisting = stripeProducts.find(p => p.metadata.id == product.id);

        if (!productExisting) {
            const data = await createProduct(product);
            await createPrice(data, product);
        }

    };
}

export async function getStripeItems(apiUrl) {
    let itemsStripe = [];
    let lastItem, data;

    do {
        data = await fetchJson(`${apiUrl}?limit=100${lastItem ? `&starting_after=${lastItem}` : ''}`, {
            headers: {
                Authorization: HEADER_AUTHORIZATION
            }
        });

        if (data.data.length == undefined) {
            return itemsStripe;
        } else {
            itemsStripe = itemsStripe.concat(data.data);
            lastItem = data.data[data.data.length - 1].id;
        }

    } while (itemsStripe.length < data.total_count);

    return itemsStripe;
}

async function createProduct(product) {

    return await fetchJson(STRIPE_PRODUCT_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': HEADER_AUTHORIZATION,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'name': product.titulo,
            'description': product.descripcion || "Sin descripción",
            // 'images': [product.img],
            'metadata[id]': product.id.toString()
        })
    });

}

async function createPrice(data, product) {

    await fetchJson(STRIPE_PRICE_API_URL, {
        method: 'POST',
        headers: {
            Authorization: HEADER_AUTHORIZATION,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'unit_amount': (product.precio) * 100,
            'currency': 'cop',
            'product': data.id,
            'metadata[id]': product.id.toString()
        })
    })
}

export async function payWithStripe(e) {

    const target = e.target;

    if (target.closest(".go-to-pay-btn")) {

        let products = [];
        const data = await getData(CART_API_URL);

        data.forEach(product => {
            products.push({ price: product.precio_id, quantity: product.cantidad })
        });

        await createCheckoutSessions(products);
    }

}

async function createCheckoutSessions(line_items) {

    let params = new URLSearchParams();

    // Añadir los line_items uno por uno
    line_items.forEach((item, index) => {
        params.append(`line_items[${index}][price]`, item.price);
        params.append(`line_items[${index}][quantity]`, item.quantity);
    });

    // Añadir el resto de los parámetros
    params.append('mode', 'payment');
    // params.append('return_url', 'http://127.0.0.1:5500/shopping-cart.html');
    params.append('cancel_url', 'http://127.0.0.1:5500/cancel.html');
    params.append('success_url', 'http://127.0.0.1:5500/success.html');

    let session = await fetchJson(STRIPE_CHECKOUT_API_URL, {
        method: 'POST',
        headers: {
            Authorization: HEADER_AUTHORIZATION,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })

    if (session) {
        localStorage.setItem('sessionId', session.id);
        window.location.href = session.url;
    }
}

export async function confirmPayment() {

    const sessionId = localStorage.getItem('sessionId');


    const session = await fetchJson(`${STRIPE_CHECKOUT_API_URL}/${sessionId}`,
        {
            headers: {
                Authorization: HEADER_AUTHORIZATION,
            }
        }

    );

    if (session.payment_status === 'paid') {

        const response = await fetchJson(`${STRIPE_CHECKOUT_API_URL}/${sessionId}/line_items`,
            {
                headers: {
                    Authorization: HEADER_AUTHORIZATION,
                }
            }

        );

        resetCar(response.data);
    } else {
        // El pago no fue exitoso
        console.log('Pago no exitoso');
        // Puedes manejar el pago no exitoso aquí
    }

}

function resetCar(products) {

    let productId;

    products.forEach(async product => {

        productId = product.price.metadata.id;

        await updateQuantityShoppingCart(productId, 0);

    });

}