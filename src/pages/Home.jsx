import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { characters } from "../data/characters";

function Home() {
  const navigate = useNavigate();

  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

  return (
    <main
      className="home"
      style={{
        "--primary": selectedCharacter.theme.primary,
        "--secondary": selectedCharacter.theme.secondary,
      }}
    >
      <div
        key={selectedCharacter.id}
        className="home-background"
        style={{
          backgroundImage: `url(${selectedCharacter.image})`,
        }}
      />

      <div className="home-overlay" />

      <div className="home-content">

        <div className="home-logo">
          <span>LEAGUE OF LEGENDS</span>
          <strong>HUB</strong>
        </div>

        <nav className="main-menu">

          <button onClick={() => navigate("/party")}>
            PARTY
          </button>

          <button onClick={() => navigate("/mastery")}>
            MASTERY
          </button>

          <button onClick={() => navigate("/history")}>
            HISTORY
          </button>

          <button onClick={() => navigate("/combos")}>
            COMBOS
          </button>

          <button onClick={() => navigate("/highlights")}>
            HIGHLIGHTS
          </button>

        </nav>

        <div className="character-selector">

          <span>SELECT BACKGROUND</span>

          <div className="character-buttons">
            {characters.map((character) => (
              <button
                key={character.id}
                className={
                  selectedCharacter.id === character.id
                    ? "active"
                    : ""
                }
                onClick={() => setSelectedCharacter(character)}
              >
                {character.name}
              </button>
            ))}
          </div>

        </div>

        <div className="home-player">
          <span>PLAYER</span>
          <strong>SORYEGETON</strong>
        </div>

      </div>
    </main>
  );
}

export default Home;