import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("URL inicial:", window.location.href);

    // Usamos query-string para analizar la queryString de la URL
    const parsed = queryString.parse(window.location.hash); // Extraemos el hash
    console.log("Parsed URL parameters:", parsed); // Para depuración

    const accessToken = parsed.access_token;
    const tokenType = parsed.token_type;
    const expiresIn = parsed.expires_in;

    console.log("Access Token:", accessToken); // Para depuración

    // Verificar si el token está presente
    if (accessToken) {
      console.log("Token encontrado");
      localStorage.setItem("spotifyAccessToken", accessToken); // Guardamos el token en el almacenamiento local
      setTimeout(() => navigate("/widget"), 100); // Redirigir al widget
    } else {
      console.error("No se encontró el token de acceso");
      setTimeout(() => navigate("/"), 100); // Redirige a la página de inicio en caso de error
    }
  }, [navigate]);

  return <div>Procesando autenticación...</div>;
}

export default Callback;
