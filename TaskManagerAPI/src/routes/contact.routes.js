
const express = require("express");
const router = express.Router();

const {
    createContactMessage,
    getContactMessages
} = require("../controllers/contact.controller");

// Consultar todos los mensajes
router.get("/", getContactMessages);

// Registrar un nuevo mensaje
router.post("/", createContactMessage);

module.exports = router;
