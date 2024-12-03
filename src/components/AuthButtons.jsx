import React from "react";

function AuthButtons() {
  const handleAuth = (platform) => {
    if (platform === "spotify") {
      // Redirigir al endpoint de autenticación de Spotify
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
      const scopes = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
      ].join(" ");

      // Generar la URL de autenticación para Spotify
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;

      console.log("Spotify Auth URL:", spotifyAuthUrl); // Verifica en la consola

      window.location.href = spotifyAuthUrl; // Redirige a Spotify
    } else if (platform === "ytmusic") {
      // Lógica para YouTube Music (a implementar)
      console.log("Conexión con YouTube Music aún no implementada.");
    }
  };

  return (
    <div className="auth-buttons">
      <button onClick={() => handleAuth("spotify")}>
        Iniciar sesión con Spotify
      </button>
      <button onClick={() => handleAuth("ytmusic")}>
        Iniciar sesión con YouTube Music
      </button>
    </div>
  );
}

export default AuthButtons;
