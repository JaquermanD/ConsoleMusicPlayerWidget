import axios from "axios";

const ytMusicService = {
  authenticate: () => {
    // Lógica de autenticación con YouTube Music
  },
  getCurrentTrack: async (accessToken) => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  },
};

export default ytMusicService;
