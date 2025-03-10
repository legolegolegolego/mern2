const express = require("express");
const Product = require("../Models/Product"); // Asegúrate de tener un modelo Product
const ensureAuthenticated = require("../middlewares/Auth"); // Middleware para proteger las rutas
const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Obtiene todos los productos
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el producto" });
  }
});

module.exports = router;
