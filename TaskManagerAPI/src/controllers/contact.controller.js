
const pool = require("../config/db");

// ==========================================
// POST: Registrar un mensaje de contacto
// ==========================================
const createContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validar que todos los campos estén presentes
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios."
            });
        }

        // Validar longitudes y contenido
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Los datos enviados no son válidos."
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();

        if (
            !cleanName ||
            !cleanEmail ||
            !cleanSubject ||
            !cleanMessage
        ) {
            return res.status(400).json({
                success: false,
                message: "Los campos no pueden estar vacíos."
            });
        }

        if (cleanName.length > 150 ||
            cleanEmail.length > 150 ||
            cleanSubject.length > 200) {
            return res.status(400).json({
                success: false,
                message: "Uno o más campos superan la longitud permitida."
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "El correo electrónico no es válido."
            });
        }

        if (cleanMessage.length < 10) {
            return res.status(400).json({
                success: false,
                message: "El mensaje debe tener al menos 10 caracteres."
            });
        }

        // Insertar el mensaje en MySQL
        const [result] = await pool.execute(
            `INSERT INTO contact_messages
            (name, email, subject, message)
            VALUES (?, ?, ?, ?)`,
            [cleanName, cleanEmail, cleanSubject, cleanMessage]
        );

        return res.status(201).json({
            success: true,
            message: "Mensaje recibido correctamente.",
            data: {
                id: result.insertId
            }
        });

    } catch (error) {
        console.error("Error al guardar mensaje:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error interno al guardar el mensaje."
        });
    }
};

// ==========================================
// GET: Consultar todos los mensajes
// ==========================================
const getContactMessages = async (req, res) => {
    try {
        const [messages] = await pool.execute(
            `SELECT id, name, email, subject, message, created_at
             FROM contact_messages
             ORDER BY created_at DESC`
        );

        return res.status(200).json({
            success: true,
            total: messages.length,
            data: messages
        });

    } catch (error) {
        console.error("Error al consultar mensajes:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error interno al consultar los mensajes."
        });
    }
};

// ==========================================
// EXPORTAR CONTROLADOR
// ==========================================
module.exports = {
    createContactMessage,
    getContactMessages
};