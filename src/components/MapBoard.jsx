import ChampionArt from "./ChampionArt";
import { scoreColor } from "../utils/synergy";
import { useDdragonVersion } from "../utils/ddragonVersion";

/*
  Posição de cada zona no mapa, em % (0-100). Orientação: base aliada no
  canto inferior esquerdo, base inimiga no canto superior direito — como no
  lado azul do Summoner's Rift.
    TOP     ao longo da borda de cima
    JUNGLE  entre as lanes, do lado aliado
    MID     na diagonal central
    BOT     ao longo da borda de baixo
    SUPPORT perto do bot, um pouco mais para o rio
*/
export const ZONES = {
  top: { x: 18, y: 14 },
  jungle: { x: 30, y: 36 },
  mid: { x: 52, y: 54 },
  bot: { x: 88, y: 88 },
  support: { x: 68, y: 68 },
};

function MapBoard({
  lanes,
  picks,
  pairs,
  activeLane,
  onSelectLane,
  shownKey,
  dimOthers,
  onFocusPair,
  draggingRole,
  onDropChampion,
}) {
  const version = useDdragonVersion();
  const mapUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map11.png`;

  const guides = [];
  for (let i = 0; i < lanes.length; i++) {
    for (let j = i + 1; j < lanes.length; j++) {
      guides.push([lanes[i].id, lanes[j].id]);
    }
  }

  return (
    <div className="map-board">
      {/* ---------- Imagem + linhas: isolados num wrapper próprio que corta
          nas bordas do quadrado. As zonas de rota (abaixo) ficam FORA
          desse wrapper, então o "TOP" pode espichar um pouco pra cima do
          mapa sem ser cortado pelo overflow:hidden. ---------- */}
      <div className="map-board__frame">
        <img className="map-board__image" src={mapUrl} alt="Summoner's Rift" />

        <div className="map-board__scrim" aria-hidden="true" />

        <svg
          className="map-board__lines"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {guides.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              className="map-board__guide"
              x1={ZONES[a].x}
              y1={ZONES[a].y}
              x2={ZONES[b].x}
              y2={ZONES[b].y}
            />
          ))}

          {pairs.map((pair) => {
            const from = ZONES[pair.laneA];
            const to = ZONES[pair.laneB];
            const isShown = shownKey === pair.key;
            const isDimmed = dimOthers && !isShown;

            return (
              <line
                key={pair.key}
                className={`map-board__line ${isShown ? "is-shown" : ""} ${
                  isDimmed ? "is-dim" : ""
                }`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{
                  stroke: scoreColor(pair.score),
                  strokeWidth: 1.6 + pair.score / 28,
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Bolinhas com a nota, no meio de cada linha */}
      {pairs.map((pair) => {
        const from = ZONES[pair.laneA];
        const to = ZONES[pair.laneB];

        return (
          <button
            key={pair.key}
            type="button"
            className={`pair-bubble ${shownKey === pair.key ? "is-shown" : ""}`}
            style={{
              left: `${(from.x + to.x) / 2}%`,
              top: `${(from.y + to.y) / 2}%`,
              "--pair-color": scoreColor(pair.score),
            }}
            aria-label={`${pair.a.name} e ${pair.b.name}: sinergia ${pair.score}`}
            onMouseEnter={() => onFocusPair(pair.key)}
            onFocus={() => onFocusPair(pair.key)}
            onClick={() => onFocusPair(pair.key)}
          >
            {pair.score}
          </button>
        );
      })}

      {/* ---------- Zonas de drop, uma por rota ----------
          Qualquer campeão pode ser solto em qualquer rota, então todas as
          zonas aceitam o drop igualmente — só destacamos visualmente que um
          arraste está em andamento (draggingRole vira "true" nesse caso). */}
      {lanes.map((lane) => {
        const champion = picks[lane.id];
        const point = ZONES[lane.id];

        return (
          <div
            key={lane.id}
            className={`map-zone ${activeLane === lane.id ? "is-active" : ""} ${
              champion ? "is-filled" : ""
            } ${draggingRole ? "can-drop" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const championId = event.dataTransfer.getData("text/plain");
              onDropChampion(lane.id, championId);
            }}
          >
            <button
              type="button"
              className="map-zone__hit"
              aria-pressed={activeLane === lane.id}
              aria-label={`${lane.label}: ${champion ? champion.name : "escolher campeão"}`}
              onClick={() => onSelectLane(lane.id)}
            >
              <span className="map-zone__lane">{lane.label}</span>

              <span className="map-zone__frame">
                {champion ? (
                  <ChampionArt
                    key={champion.id}
                    champion={champion}
                    className="map-zone__art"
                  />
                ) : (
                  <span className="map-zone__empty">+</span>
                )}
              </span>

              <span className="map-zone__name">
                {champion ? champion.name : "Escolher"}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MapBoard;
