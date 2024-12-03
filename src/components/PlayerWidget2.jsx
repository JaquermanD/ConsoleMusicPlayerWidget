import React, { useState, useEffect } from "react";
import spotifyService from "../services/spotifyService.js";

function PlayerWidget() {
  const [song, setSong] = useState({
    title: "No music playing",
    artist: "Unknown artist",
    progress: 0, // Progreso en porcentaje
    startTime: "00:00",
    endTime: "00:00",
  });

  const updateSongInfo = async () => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    if (!accessToken) {
      console.error(
        "No se encontró el token de acceso en el almacenamiento local."
      );
      return;
    }

    try {
      const track = await spotifyService.getCurrentTrack(accessToken);

      if (track && track.item) {
        const progressMs = track.progress_ms || 0;
        const durationMs = track.item.duration_ms || 1;

        setSong({
          title: track.item.name,
          artist: track.item.artists.map((artist) => artist.name).join(", "),
          progress: (progressMs / durationMs) * 100,
          startTime: formatTime(progressMs),
          endTime: formatTime(durationMs),
        });
      } else {
        console.log("No hay música reproduciéndose en Spotify.");
        setSong({
          title: "No music playing",
          artist: "Unknown artist",
          progress: 0,
          startTime: "00:00",
          endTime: "00:00",
        });
      }
    } catch (error) {
      console.error("Error al obtener la canción actual:", error);
    }
  };

  // Función para formatear milisegundos a formato MM:SS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return ${minutes}:${seconds};
  };

  // Genera la barra de progreso estilo consola
  const renderProgressBar = () => {
    const totalBlocks = 20; // Número total de bloques en la barra
    const filledBlocks = Math.round((song.progress / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    return [${"#".repeat(filledBlocks)}${"-".repeat(emptyBlocks)}];
  };

  // Actualiza la información de la canción cada 5 segundos
  useEffect(() => {
    updateSongInfo();
    const interval = setInterval(updateSongInfo, 5000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="console">
      <div className="header">root@jaquerman</div>
      <div className="body">
        <p>
          <span className="user">root@jaquerman&gt;</span>{" "}
          <span className="command">./ConsoleMusicPlayer</span>{" "}
          <span className="flag">--nowplaying</span>
        </p>
        <p>
          Title: <span id="title">{song.title}</span>
        </p>
        <p>
          Artist: <span id="artist">{song.artist}</span>
        </p>
        <p>{renderProgressBar()}</p>
        <p>
          <span id="start-time">{song.startTime}</span> -{" "}
          <span id="end-time">{song.endTime}</span>
        </p>
      </div>
    </div>
  );
}

export default PlayerWidget;