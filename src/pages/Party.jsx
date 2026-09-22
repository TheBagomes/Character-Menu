import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LANES, ALL_CHAMPIONS, CHAMPION_BY_ID, topTraits } from "../data/partyChampions";
import { analyzeParty, scoreColor, tierFor } from "../utils/synergy";

import ChampionArt from "../components/ChampionArt";
import MapBoard from "../components/MapBoard";

import "./Party.css";

const EMPTY_PICKS = {
  top: null,
  jungle: null,
  mid: null,
  bot: null,
  support: null,
};

const laneLabel = (id) => LANES.find((lane) => lane.id === id).label;

function Party() {
  const navigate = useNavigate();

  const [picks, setPicks] = useState(EMPTY_PICKS);
  const [activeLane, setActiveLane] = useState(LANES[0].id);
  const [focusedKey, setFocusedKey] = useState(null);
  const [draggingRole, setDraggingRole] = useState(null);

  // busca e filtro de rota do picker — só filtram o que aparece na grade,
  // não restringem onde o campeão pode ser colocado
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const analysis = useMemo(() => analyzeParty(picks), [picks]);

  // Dupla que o usuário escolheu; se não escolheu nenhuma (ou ela deixou de
  // existir), o painel mostra a melhor dupla do time.
  const focusedPair =
    analysis.pairs.find((pair) => pair.key === focusedKey) ?? null;
  const shownPair = focusedPair ?? analysis.best;

  const teamTier = analysis.average === null ? null : tierFor(analysis.average);

  // em qual rota (se alguma) um campeão já está escalado
  const laneOf = (championId) =>
    LANES.find((lane) => picks[lane.id]?.id === championId)?.id ?? null;

  const filteredChampions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return ALL_CHAMPIONS.filter((champion) => {
      const matchesRole = roleFilter === "all" || champion.tags.includes(roleFilter);
      const matchesSearch = !term || champion.name.toLowerCase().includes(term);
      return matchesRole && matchesSearch;
    });
  }, [searchTerm, roleFilter]);

  // laneId = rota que recebe o campeão. Como qualquer campeão pode ir pra
  // qualquer rota, primeiro removemos ele de onde já estava escalado (não
  // dá pra repetir o mesmo campeão em duas rotas ao mesmo tempo).
  const placeChampion = (laneId, champion) => {
    const alreadyInLane = picks[laneId]?.id === champion.id;

    const nextPicks = { ...picks };
    for (const lane of LANES) {
      if (nextPicks[lane.id]?.id === champion.id) nextPicks[lane.id] = null;
    }
    nextPicks[laneId] = alreadyInLane ? null : champion;

    setPicks(nextPicks);

    // depois de escolher, pula para a próxima rota que ainda está vazia
    if (!alreadyInLane) {
      const order = LANES.map((lane) => lane.id);
      const start = order.indexOf(laneId);
      const nextEmpty = [...order.slice(start + 1), ...order.slice(0, start)].find(
        (id) => !nextPicks[id]
      );

      if (nextEmpty) setActiveLane(nextEmpty);
    }
  };

  const chooseChampion = (champion) => placeChampion(activeLane, champion);

  const dropChampion = (laneId, championId) => {
    setDraggingRole(null);
    const champion = CHAMPION_BY_ID[championId];
    if (champion) placeChampion(laneId, champion);
  };

  const reset = () => {
    setPicks(EMPTY_PICKS);
    setActiveLane(LANES[0].id);
    setFocusedKey(null);
  };

  return (
    <main className="party">
      <header className="party__header">
        <button type="button" className="party__back" onClick={() => navigate("/")}>
          ← Menu
        </button>

        <h1 className="party__title">PARTY</h1>

        <button type="button" className="party__reset" onClick={reset}>
          Limpar time
        </button>
      </header>

      <div className="party__stage">
        <MapBoard
          lanes={LANES}
          picks={picks}
          pairs={analysis.pairs}
          activeLane={activeLane}
          onSelectLane={setActiveLane}
          shownKey={shownPair?.key ?? null}
          dimOthers={Boolean(focusedPair)}
          onFocusPair={setFocusedKey}
          draggingRole={draggingRole}
          onDropChampion={dropChampion}
        />

        <aside className="party-panel">
          <section className="party-panel__block">
            <h2 className="party-panel__heading">Team synergy</h2>

            {teamTier ? (
              <div className="team-score">
                <strong
                  className="team-score__value"
                  style={{ color: scoreColor(analysis.average) }}
                >
                  {analysis.average}
                </strong>
                <span className="team-score__tier">
                  {teamTier.letter} · {teamTier.label}
                </span>
                <span className="team-score__count">
                  {analysis.pairs.length} de 10 duplas analisadas
                </span>
              </div>
            ) : (
              <p className="party-panel__hint">
                Escolha pelo menos 2 campeões para ver a sinergia entre eles.
              </p>
            )}

            {analysis.complete ? (
              analysis.warnings.length > 0 ? (
                <ul className="team-warnings">
                  {analysis.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : (
                <p className="party-panel__hint">Sem alertas: time equilibrado.</p>
              )
            ) : (
              <p className="party-panel__hint">
                Complete as 5 rotas para ver os alertas do time.
              </p>
            )}
          </section>

          <section className="party-panel__block">
            <h2 className="party-panel__heading">Dupla em foco</h2>

            {shownPair ? (
              <div className="pair-detail">
                <p className="pair-detail__names">
                  {shownPair.a.name} <span>×</span> {shownPair.b.name}
                </p>
                <p className="pair-detail__lanes">
                  {laneLabel(shownPair.laneA)} + {laneLabel(shownPair.laneB)}
                </p>

                <p className="pair-detail__score">
                  <strong style={{ color: scoreColor(shownPair.score) }}>
                    {shownPair.score}
                  </strong>
                  <span>
                    {shownPair.letter} · {shownPair.label}
                  </span>
                </p>

                <ul className="pair-detail__reasons">
                  {shownPair.reasons.map((reason) => (
                    <li
                      key={reason.text}
                      className={
                        reason.delta > 0 ? "is-plus" : reason.delta < 0 ? "is-minus" : ""
                      }
                    >
                      <b>{reason.delta > 0 ? `+${reason.delta}` : reason.delta}</b>
                      {reason.text}
                    </li>
                  ))}
                </ul>

                {analysis.pairs.length > 1 && (
                  <div className="pair-detail__jump">
                    <button type="button" onClick={() => setFocusedKey(analysis.best.key)}>
                      Melhor dupla
                    </button>
                    <button type="button" onClick={() => setFocusedKey(analysis.worst.key)}>
                      Pior dupla
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="party-panel__hint">
                Toque em uma bolinha do gráfico para ver por que aquela dupla funciona
                (ou não).
              </p>
            )}
          </section>
        </aside>
      </div>

      <section className="party-picker" aria-label="Escolha um campeão">
        <div className="party-picker__header">
          <h2 className="party-picker__title">
            Escolhendo para {laneLabel(activeLane)}
            <span>
              {picks[activeLane]
                ? `Atual: ${picks[activeLane].name}`
                : "Arraste até o mapa ou clique num campeão"}
            </span>
          </h2>

          <input
            type="search"
            className="party-picker__search"
            placeholder="Buscar campeão..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="party-picker__filters" role="tablist" aria-label="Filtrar por rota">
          <button
            type="button"
            className={`role-chip ${roleFilter === "all" ? "is-active" : ""}`}
            aria-pressed={roleFilter === "all"}
            onClick={() => setRoleFilter("all")}
          >
            Todos
          </button>
          {LANES.map((lane) => (
            <button
              key={lane.id}
              type="button"
              className={`role-chip ${roleFilter === lane.id ? "is-active" : ""}`}
              aria-pressed={roleFilter === lane.id}
              onClick={() => setRoleFilter(lane.id)}
            >
              {lane.label}
            </button>
          ))}
        </div>

        {/* Grade densa de ícones quadrados, nome só sobreposto embaixo —
            igual à tela oficial de seleção. Os pontos fortes aparecem no
            tooltip nativo ao passar o mouse, sem poluir a grade. */}
        <div className="party-picker__grid">
          {filteredChampions.map((champion) => {
            const pickedLane = laneOf(champion.id);
            const selected = pickedLane === activeLane;
            const pickedElsewhere = Boolean(pickedLane) && pickedLane !== activeLane;
            const traits = topTraits(champion);

            return (
              <button
                key={champion.id}
                type="button"
                className={`pick-card ${selected ? "is-selected" : ""} ${
                  pickedElsewhere ? "is-picked-elsewhere" : ""
                }`}
                aria-pressed={selected}
                title={
                  traits.length
                    ? `${champion.name} — ${traits.join(", ")}`
                    : champion.name
                }
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", champion.id);
                  event.dataTransfer.effectAllowed = "move";
                  setDraggingRole(true);
                }}
                onDragEnd={() => setDraggingRole(null)}
                onClick={() => chooseChampion(champion)}
              >
                <ChampionArt
                  key={champion.id}
                  champion={champion}
                  className="pick-card__art"
                />
                <span className="pick-card__name">{champion.name}</span>

                {pickedElsewhere && (
                  <span className="pick-card__badge">{laneLabel(pickedLane)}</span>
                )}
              </button>
            );
          })}

          {filteredChampions.length === 0 && (
            <p className="party-picker__empty">Nenhum campeão encontrado.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Party;
