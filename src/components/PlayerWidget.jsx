import React, { useState, useEffect } from "react";
import spotifyService from "../services/spotifyService";

function PlayerWidget() {
  const [song, setSong] = useState({
    title: "Song Title",
    artist: "Artist Name",
    progress: 0, // En porcentaje
    duration: "00:00", // Duración total
    current: "00:00", // Tiempo actual
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (token) {
      setIsAuthenticated(true);
      fetchCurrentTrack(token);
    } else {
      setIsAuthenticated(false);
    }

    // Intervalo para actualizar la canción cada segundo si está autenticado
    const interval = setInterval(() => {
      if (isAuthenticated) {
        fetchCurrentTrack(token);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const fetchCurrentTrack = async (token) => {
    if (token) {
      const track = await spotifyService.getCurrentTrack(token);
      if (track && track.item) {
        const progressMs = track.progress_ms || 0;
        const durationMs = track.item.duration_ms || 0;
        const progressPercentage = (progressMs / durationMs) * 100;

        setSong({
          title: track.item.name,
          artist: track.item.artists[0].name,
          progress: progressPercentage,
          duration: msToTime(durationMs),
          current: msToTime(progressMs),
        });
      }
    }
  };

  const msToTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Función para generar la barra de progreso en formato ASCII con # y - para los espacios vacíos
  const getAsciiProgressBar = (progress) => {
    const totalBlocks = 20; // 20 caracteres de largo
    const filledBlocks = Math.round((progress / 100) * totalBlocks); // Bloques llenos
    const emptyBlocks = totalBlocks - filledBlocks; // Bloques vacíos

    // Crear la barra con clases correctas
    const filledBar = Array(filledBlocks)
      .fill('<span class="progress-block-filled">#</span>') // Bloques llenos (en verde)
      .join("");
    const emptyBar = Array(emptyBlocks)
      .fill('<span class="progress-block-empty">-</span>') // Bloques vacíos (en gris)
      .join("");

    const progressBar = `[${filledBar}${emptyBar}]`; // Unir bloques llenos y vacíos

    return <span dangerouslySetInnerHTML={{ __html: progressBar }} />;
  };

  return (
    <div className="console">
      {/* Barra de título */}
      <div className="console-header">
        <span>root@jaquerman</span>
        <div className="console-header-buttons">
          <span className="button close"></span>
          <span className="button minimize"></span>
          <span className="button maximize"></span>
        </div>
      </div>

      {/* Cuerpo de la consola */}
      <div className="console-body">
        {!isAuthenticated ? (
          <p>Inicia sesión para acceder a la música...</p> // Mensaje si no está autenticado
        ) : (
          <>
            <p className="command">
              <span className="command-prefix">root@jaquerman&gt;</span>{" "}
              ./ConsoleMusicPlayer{" "}
              <span className="option-disabled">--nowplaying</span>
            </p>
            <p>
              Title:{" "}
              <span id="title" className="song-title">
                {song.title}
              </span>
            </p>
            <p>
              Artist:{" "}
              <span id="artist" className="song-artist">
                {song.artist}
              </span>
            </p>
            {/* Barra de progreso en ASCII con # y - */}
            <p>{getAsciiProgressBar(song.progress)}</p>
            <p>
              <span id="start-time">{song.current}</span> -{" "}
              <span id="end-time">{song.duration}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayerWidget;
