import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://mern2-front-msv4.onrender.com/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Obtener el token
  
    if (!token) {
      alert("No tienes autorización. Inicia sesión.");
      return;
    }
  
    try {
      await axios.post("https://mern2-front-msv4.onrender.com/products/", newProduct, {
        headers: { Authorization: `Bearer ${token}` }, // Enviar token en la cabecera
      });
  
      setNewProduct({ name: "", price: "" }); // Limpiar formulario
      fetchProducts(); // Recargar la lista de productos
    } catch (error) {
      console.error("Error al agregar el producto:", error.response?.data || error);
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Añadir Producto</button>
      </form>

      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      {/* Botón para volver al login */}
      <button onClick={() => navigate("/login")}>Volver al Login</button>
    </div>
  );
};

export default Home;
