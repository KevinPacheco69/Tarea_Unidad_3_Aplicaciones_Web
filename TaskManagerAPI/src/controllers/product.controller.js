const pool = require("../config/db");

// ==========================================
// GET: Obtener todos los productos
// ==========================================
const getAllProducts = async (req, res) => {
    try {
        const [products] = await pool.execute(
            "SELECT * FROM products ORDER BY created_at DESC"
        );

        return res.status(200).json({
            success: true,
            total: products.length,
            data: products
        });

    } catch (error) {
        console.error("Error al consultar productos:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error interno al obtener los productos."
        });
    }
};

// ==========================================
// GET: Obtener un producto por ID
// ==========================================
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "El ID debe ser un numero entero positivo."
            });
        }

        const [products] = await pool.execute(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado."
            });
        }

        return res.status(200).json({
            success: true,
            data: products[0]
        });

    } catch (error) {
        console.error("Error al consultar producto:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error interno al consultar el producto."
        });
    }
};

// ==========================================
// EXPORTAR CONTROLADORES
// ==========================================
module.exports = {
    getAllProducts,
    getProductById
};
