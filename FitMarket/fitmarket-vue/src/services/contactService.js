const API_URL = "http://localhost:3000/api/contact";

// Enviar un mensaje de contacto a la API
export async function sendContactMessage(contactData) {
    let response;

    try {
        response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactData)
        });
    } catch (error) {
        throw new Error(
            "No se pudo conectar con el servidor. Inténtalo nuevamente."
        );
    }

    // Comprobar respuesta HTTP
    if (!response.ok) {
        let errorData;

        try {
            errorData = await response.json();
        } catch {
            errorData = null;
        }

        throw new Error(
            errorData?.message || `Error del servidor: ${response.status}`
        );
    }

    // Interpretar respuesta JSON
    const result = await response.json();

    if (!result.success) {
        throw new Error(
            result.message || "No se pudo enviar el mensaje."
        );
    }

    return result;
}
