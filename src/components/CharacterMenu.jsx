import { useState } from "react";
import { characters } from "../data/characters";

function CharacterMenu() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

  return (
    <section  className="character-screen"
  style={{
    "--primary": selectedCharacter.theme.primary,
    "--secondary": selectedCharacter.theme.secondary,
  }}>

      <div
        key={selectedCharacter.id}
        className="character-background"
        style={{
          backgroundImage: `url(${selectedCharacter.image})`,
        }}
      />

      <div className="character-overlay" />

      <div className="character-title">
        <p>CHARACTER SELECT</p>

        <h1>{selectedCharacter.name}</h1>

        <span>{selectedCharacter.title}</span>
      </div>

      <nav className="character-menu">
        {characters.map((character) => (
          <button
            key={character.id}
            className={
              selectedCharacter.id === character.id
                ? "selected"
                : ""
            }
            onClick={() => setSelectedCharacter(character)}
          >
            {character.name}
          </button>
        ))}
      </nav>

      <div className="character-info">
        <span>ROLE</span>

        <h2>{selectedCharacter.role}</h2>
      </div>

    </section>
  );
}

export default CharacterMenu;