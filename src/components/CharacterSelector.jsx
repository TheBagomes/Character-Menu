function CharacterSelector({
  characters,
  selectedCharacter,
  setSelectedCharacter,
}) {
  return (
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
  );
}

export default CharacterSelector;