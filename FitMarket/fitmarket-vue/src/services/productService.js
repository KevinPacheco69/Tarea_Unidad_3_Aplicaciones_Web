const API_URL = "http://localhost:3000/api/products";

// Obtener todos los productos
export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Error al obtener productos: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message || "No se pudieron obtener los productos."
        );
    }

    return result.data;
}

// Obtener un producto por su ID
export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(
            `Error al obtener el producto: ${response.status}`
        );
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message || "No se pudo obtener el producto."
        );
    }

    return result.data;
}
