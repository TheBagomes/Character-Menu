import { useEffect, useState } from "react";

/*
  A imagem do mapa (e a dos campeões) fica em uma URL com a versão do jogo:
    https://ddragon.leagueoflegends.com/cdn/{versao}/img/map/map11.png

  Em vez de fixar uma versão (que ficaria desatualizada a cada patch), esse
  hook busca a mais recente na própria API da Riot, uma vez só, e guarda em
  memória (cache do módulo) para não buscar de novo a cada componente.

  FALLBACK_VERSION é usada enquanto a busca não termina, e continua sendo
  usada se a busca falhar (sem internet, API fora do ar etc.) — o mapa
  carrega mesmo assim, só que com um patch mais antigo.
*/
const FALLBACK_VERSION = "14.24.1";

let cachedVersion = null;
let pendingFetch = null;

function fetchLatestVersion() {
  if (cachedVersion) return Promise.resolve(cachedVersion);

  if (!pendingFetch) {
    pendingFetch = fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then((response) => response.json())
      .then((versions) => {
        cachedVersion = versions[0];
        return cachedVersion;
      })
      .catch(() => FALLBACK_VERSION);
  }

  return pendingFetch;
}

export function useDdragonVersion() {
  const [version, setVersion] = useState(cachedVersion ?? FALLBACK_VERSION);

  useEffect(() => {
    let active = true;

    fetchLatestVersion().then((latest) => {
      if (active) setVersion(latest);
    });

    return () => {
      active = false;
    };
  }, []);

  return version;
}
