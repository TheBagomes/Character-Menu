import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { characters } from "../data/characters";

import HomeCharacter from "../components/HomeCharacter";
import MainMenu from "../components/MainMenu";

import "./HomeStage.css";

function Home() {
  const navigate = useNavigate();

  const [characterIndex, setCharacterIndex] = useState(0);
  const selectedCharacter = characters[characterIndex];

  // step = -1 (campeão anterior) ou 1 (próximo); dá a volta no fim da lista
  const changeCharacter = (step) => {
    setCharacterIndex(
      (current) => (current + step + characters.length) % characters.length
    );
  };

  return (
    <main
      className="home"
      style={{
        "--primary": selectedCharacter.theme.primary,
        "--secondary": selectedCharacter.theme.secondary,
      }}
    >
      <HomeCharacter character={selectedCharacter} />

      <div className="home-scrim" aria-hidden="true" />

      <div className="home-overlay" />

      <div className="home-content">
        <MainMenu navigate={navigate} />

        <div className="home-nameplate">
          <div className="home-nameplate__switcher">
            <button
              type="button"
              className="home-nameplate__arrow"
              aria-label="Campeão anterior"
              onClick={() => changeCharacter(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 4 7 12l8 8" />
              </svg>
            </button>

            <strong className="home-nameplate__champ">
              {selectedCharacter.name}
            </strong>

            <button
              type="button"
              className="home-nameplate__arrow"
              aria-label="Próximo campeão"
              onClick={() => changeCharacter(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 4 8 8-8 8" />
              </svg>
            </button>
          </div>

          <span className="home-nameplate__title">
            {selectedCharacter.title}
          </span>
          <span className="home-nameplate__player">SORYEGETON</span>
        </div>
      </div>
    </main>
  );
}

export default Home;