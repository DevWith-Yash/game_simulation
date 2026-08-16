import React, { useState } from 'react';
import './App.css';

const GAMES_DATABASE = [
  {
    id: 'mario-nes',
    title: 'Super Mario Bros',
    platform: 'NES',
    core: 'nes',
    romPath: '/roms/super_mario_bros.nes',
    thumbnail: 'https://placehold.co/300x200/red/white?text=Super+Mario+Bros'
  },
  {
    id: 'mario-snes',
    title: 'Super Mario World',
    platform: 'SNES',
    core: 'snes',
    romPath: '/roms/super_mario_world.sfc',
    thumbnail: 'https://placehold.co/300x200/green/white?text=Super+Mario+World'
  }
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>🎮 Retro Browser Arcade</h1>
      </header>

      <main className="content">
        {!selectedGame ? (
          <div className="game-grid">
            {GAMES_DATABASE.map((game) => (
              <div 
                key={game.id} 
                className="game-card"
                onClick={() => setSelectedGame(game)}
              >
                <img src={game.thumbnail} alt={game.title} />
                <h3>{game.title}</h3>
                <span className="badge">{game.platform}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="emulator-view">
            <button className="back-btn" onClick={() => setSelectedGame(null)}>
              ← Back to Game Library
            </button>
            <div className="iframe-wrapper">
              <iframe
                title={selectedGame.title}
                src={`/emulator.html?core=${selectedGame.core}&rom=${encodeURIComponent(selectedGame.romPath)}`}
                allow="autoplay; keyboard; gamepad"
                className="emulator-frame"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}