
const API_URL = "http://localhost:3000/api/products";

// Función centralizada para realizar peticiones HTTP
async function request(url, options = {}) {
    let response;

    try {
        response = await fetch(url, options);
    } catch (error) {
        // No convertir las cancelaciones en errores de conexión
        if (error.name === "AbortError") {
            throw error;
        }

        throw new Error(
            "No se pudo conectar con el servidor. Verifica que la API esté funcionando."
        );
    }

    // Comprobar si la respuesta HTTP fue correcta
    if (!response.ok) {
        throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
        );
    }

    // Intentar interpretar la respuesta como JSON
    let result;

    try {
        result = await response.json();
    } catch {
        throw new Error(
            "El servidor devolvió una respuesta que no es JSON válido."
        );
    }

    // Comprobar la respuesta de nuestra API
    if (!result.success) {
        throw new Error(
            result.message || "La operación no pudo completarse."
        );
    }

    return result.data;
}

// Obtener todos los productos
export async function getProducts(options = {}) {
    const products = await request(API_URL, options);

    if (!Array.isArray(products)) {
        throw new Error(
            "La respuesta del servidor no contiene una lista válida de productos."
        );
    }

    return products;
}

// Obtener un producto por su ID
export async function getProductById(id, options = {}) {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        throw new Error("El ID del producto no es válido.");
    }

    const product = await request(
        `${API_URL}/${encodeURIComponent(id)}`,
        options
    );

    if (!product || typeof product !== "object" || Array.isArray(product)) {
        throw new Error(
            "La respuesta del servidor no contiene un producto válido."
        );
    }

    return product;
}
