import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Por favor, elige una opción:</p>
      <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
      <button onClick={() => navigate("/signup")}>Registrarse</button>
    </div>
  );
};

export default Start;
