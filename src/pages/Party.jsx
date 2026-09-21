import { useState } from "react";
import { characters } from "../data/characters";

function Party() {
  const [draggingChampion, setDraggingChampion] = useState(null);
  const [topChampion, setTopChampion] = useState(null);

  const riven = characters.find(
    (character) => character.id === "riven"
  );

  function handleDragStart(character) {
    setDraggingChampion(character);
  }

  function handleDropTop() {
    if (!draggingChampion) return;

    setTopChampion(draggingChampion);
    setDraggingChampion(null);
  }

  return (
    <main className="party-page">

      <section className="champion-pool">

        <h1>YOUR PARTY</h1>

        <div
          className="champion-card"
          draggable
          onDragStart={() => handleDragStart(riven)}
        >
          <img src={riven.icon} alt={riven.name} />

          <span>{riven.name}</span>
        </div>

      </section>

      <section className="rift-map">

        <div
          className="top-zone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDropTop}
        >
          <span>TOP</span>

          {topChampion && (
            <div className="map-champion">
              <img
                src={topChampion.icon}
                alt={topChampion.name}
              />

              <span>{topChampion.name}</span>
            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default Party;
