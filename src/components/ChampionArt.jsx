import { useState } from "react";

/*
  Imagem de carregamento do campeão, direto do Data Dragon da Riot
  (não precisa baixar nada). Se a imagem não carregar (sem internet, nome
  errado em ddKey...), mostra a inicial do campeão no lugar.

  Use key={champion.id} onde o componente é usado, para o estado de erro
  não "grudar" quando o campeão mudar.
*/
const artUrl = (ddKey) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${ddKey}_0.jpg`;

function ChampionArt({ champion, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`champion-art champion-art--fallback ${className}`}>
        {champion.name[0]}
      </span>
    );
  }

  return (
    <img
      className={`champion-art ${className}`}
      src={artUrl(champion.ddKey)}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default ChampionArt;
