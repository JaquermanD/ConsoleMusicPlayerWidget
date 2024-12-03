import axios from "axios";

const spotifyService = {
  authenticate: () => {
    // Aquí iría la lógica de autenticación si decides implementarla
  },

  getCurrentTrack: async (accessToken) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        console.log("No hay música reproduciéndose en Spotify.");
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 204) {
        // 204 No Content: Cuando no hay música actualmente reproduciéndose
        console.log(
          "No hay contenido disponible. No se está reproduciendo música."
        );
        return null;
      }
      console.error("Error al obtener la canción actual:", error);
      throw error;
    }
  },
};

export default spotifyService;
