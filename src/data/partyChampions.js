/*
  DADOS DA PÁGINA PARTY

  Cada campeão tem um "perfil" de 0 a 3 (0 = não tem, 3 = é o forte dele):

    engage    começa a luta (CC em área, gap closer com controle)
    peel      protege aliados (escudo, cura, CC defensivo)
    burst     dano explosivo, mata rápido
    dps       dano contínuo (bom em luta longa)
    poke      dano à distância antes da luta
    aoe       dano/CC em área nas lutas em grupo
    frontline aguenta dano na frente do time
    dive      consegue entrar na backline inimiga
    early     força no início do jogo
    scaling   força no fim do jogo

  damage:  "AD" | "AP" | "mixed"
  knockup: true se tem habilidade que lança inimigos ao ar
  needsAirborne: true se depende de inimigos no ar (ex.: ult do Yasuo)
  tags:    rotas em que o campeão costuma ser jogado — usado só para os
           filtros da tela de seleção. NÃO restringe onde ele pode ser
           colocado: qualquer campeão pode ir pra qualquer rota no mapa.

  Para adicionar ou trocar um campeão, copie uma linha e ajuste.
  ddKey é o nome do campeão no Data Dragon da Riot (usado para a imagem),
  por exemplo "Khazix", "JarvanIV", "MissFortune".

  ATENÇÃO: esses valores são uma avaliação minha, não estatística de partidas.
  Se algum campeão parecer errado para você, é só mudar os números aqui.

  Esta lista tem 52 campeões cobrindo os mais conhecidos de cada rota — não
  o elenco completo do jogo (que passa de 170), pra manter os valores
  confiáveis. Pra adicionar mais, copie o padrão de uma linha abaixo.
*/

export const LANES = [
  { id: "top", label: "TOP" },
  { id: "jungle", label: "JUNGLE" },
  { id: "mid", label: "MID" },
  { id: "bot", label: "BOT" },
  { id: "support", label: "SUPPORT" },
];

const NO_STATS = {
  engage: 0,
  peel: 0,
  burst: 0,
  dps: 0,
  poke: 0,
  aoe: 0,
  frontline: 0,
  dive: 0,
  early: 0,
  scaling: 0,
};

const champion = (id, name, ddKey, damage, stats, flags = {}) => ({
  id,
  name,
  ddKey,
  damage,
  knockup: false,
  needsAirborne: false,
  tags: [],
  ...NO_STATS,
  ...stats,
  ...flags,
});

export const ALL_CHAMPIONS = [
  // ---------- costumam ser jogados no TOP ----------
  champion("riven", "Riven", "Riven", "AD",
    { engage: 2, burst: 3, dps: 2, aoe: 1, frontline: 1, dive: 3, early: 3, scaling: 1 },
    { knockup: true, tags: ["top"] }),
  champion("irelia", "Irelia", "Irelia", "AD",
    { engage: 2, burst: 2, dps: 3, aoe: 2, frontline: 1, dive: 3, early: 1, scaling: 2 },
    { tags: ["top"] }),
  champion("malphite", "Malphite", "Malphite", "AP",
    { engage: 3, burst: 1, aoe: 3, frontline: 3, dive: 2, early: 1, scaling: 2 },
    { knockup: true, tags: ["top"] }),
  champion("ornn", "Ornn", "Ornn", "mixed",
    { engage: 3, peel: 1, dps: 1, aoe: 3, frontline: 3, dive: 1, early: 1, scaling: 3 },
    { knockup: true, tags: ["top"] }),
  champion("jax", "Jax", "Jax", "mixed",
    { engage: 2, burst: 1, dps: 3, aoe: 1, frontline: 2, dive: 3, early: 2, scaling: 3 },
    { tags: ["top"] }),
  champion("garen", "Garen", "Garen", "AD",
    { engage: 1, burst: 2, dps: 2, frontline: 2, early: 2, scaling: 2 },
    { tags: ["top"] }),
  champion("darius", "Darius", "Darius", "AD",
    { engage: 1, burst: 2, dps: 2, frontline: 1, early: 3, scaling: 1 },
    { tags: ["top"] }),
  champion("camille", "Camille", "Camille", "AD",
    { engage: 2, burst: 2, dps: 2, dive: 3, frontline: 1, early: 1, scaling: 2 },
    { tags: ["top"] }),
  champion("fiora", "Fiora", "Fiora", "AD",
    { burst: 2, dps: 3, dive: 2, early: 1, scaling: 3 },
    { tags: ["top"] }),
  champion("shen", "Shen", "Shen", "mixed",
    { engage: 2, peel: 2, frontline: 3, aoe: 1, early: 1, scaling: 2 },
    { tags: ["top", "support"] }),
  champion("sett", "Sett", "Sett", "mixed",
    { engage: 2, burst: 1, dps: 2, frontline: 2, aoe: 1, dive: 1, early: 2, scaling: 2 },
    { knockup: true, tags: ["top"] }),

  // ---------- costumam ser jogados na JUNGLE ----------
  champion("leesin", "Lee Sin", "LeeSin", "AD",
    { engage: 3, peel: 1, burst: 2, dps: 1, frontline: 1, dive: 3, early: 3, scaling: 0 },
    { knockup: true, tags: ["jungle"] }),
  champion("jarvan", "Jarvan IV", "JarvanIV", "AD",
    { engage: 3, burst: 2, dps: 1, aoe: 2, frontline: 2, dive: 3, early: 2, scaling: 1 },
    { knockup: true, tags: ["jungle"] }),
  champion("amumu", "Amumu", "Amumu", "AP",
    { engage: 3, dps: 1, aoe: 3, frontline: 3, dive: 1, early: 1, scaling: 2 },
    { tags: ["jungle"] }),
  champion("khazix", "Kha'Zix", "Khazix", "AD",
    { engage: 1, burst: 3, dps: 2, dive: 3, early: 2, scaling: 2 },
    { tags: ["jungle"] }),
  champion("sejuani", "Sejuani", "Sejuani", "mixed",
    { engage: 3, peel: 1, dps: 1, aoe: 3, frontline: 3, dive: 2, early: 1, scaling: 2 },
    { knockup: true, tags: ["jungle"] }),
  champion("vi", "Vi", "Vi", "AD",
    { engage: 3, burst: 2, dps: 1, dive: 3, frontline: 1, early: 2, scaling: 1 },
    { knockup: true, tags: ["jungle"] }),
  champion("warwick", "Warwick", "Warwick", "AD",
    { engage: 1, dps: 2, dive: 2, frontline: 1, early: 2, scaling: 1 },
    { tags: ["jungle"] }),
  champion("kindred", "Kindred", "Kindred", "AD",
    { dps: 2, poke: 1, aoe: 1, early: 1, scaling: 2 },
    { tags: ["jungle"] }),
  champion("rengar", "Rengar", "Rengar", "AD",
    { burst: 3, dive: 3, early: 2, scaling: 1 },
    { tags: ["jungle"] }),
  champion("xinzhao", "Xin Zhao", "XinZhao", "AD",
    { engage: 3, dive: 2, frontline: 1, early: 3, scaling: 1 },
    { knockup: true, tags: ["jungle"] }),

  // ---------- costumam ser jogados no MID ----------
  champion("yasuo", "Yasuo", "Yasuo", "AD",
    { engage: 1, peel: 1, burst: 1, dps: 3, aoe: 2, dive: 2, early: 1, scaling: 3 },
    { needsAirborne: true, tags: ["mid"] }),
  champion("zed", "Zed", "Zed", "AD",
    { engage: 1, burst: 3, dps: 2, poke: 1, dive: 3, early: 2, scaling: 1 },
    { tags: ["mid"] }),
  champion("aurora", "Aurora", "Aurora", "AP",
    { engage: 1, burst: 3, dps: 1, poke: 2, aoe: 1, dive: 2, early: 2, scaling: 2 },
    { tags: ["mid"] }),
  champion("orianna", "Orianna", "Orianna", "AP",
    { engage: 2, peel: 1, burst: 1, dps: 1, poke: 2, aoe: 3, early: 1, scaling: 3 },
    { knockup: true, tags: ["mid"] }),
  champion("ahri", "Ahri", "Ahri", "AP",
    { engage: 1, burst: 2, dps: 1, poke: 2, aoe: 1, dive: 2, early: 2, scaling: 2 },
    { tags: ["mid"] }),
  champion("katarina", "Katarina", "Katarina", "AP",
    { burst: 3, dps: 1, aoe: 1, dive: 2, early: 1, scaling: 2 },
    { tags: ["mid"] }),
  champion("syndra", "Syndra", "Syndra", "AP",
    { engage: 1, burst: 3, poke: 2, aoe: 2, early: 1, scaling: 3 },
    { tags: ["mid"] }),
  champion("viktor", "Viktor", "Viktor", "AP",
    { burst: 2, poke: 2, aoe: 3, early: 1, scaling: 3 },
    { tags: ["mid"] }),
  champion("akali", "Akali", "Akali", "AP",
    { burst: 3, dive: 3, early: 2, scaling: 2 },
    { tags: ["mid"] }),
  champion("sylas", "Sylas", "Sylas", "AP",
    { engage: 1, burst: 2, dps: 2, dive: 2, early: 1, scaling: 3 },
    { tags: ["mid", "jungle"] }),
  champion("lux", "Lux", "Lux", "AP",
    { engage: 1, burst: 2, poke: 3, aoe: 2, early: 1, scaling: 2 },
    { tags: ["mid", "support"] }),

  // ---------- costumam ser jogados no BOT ----------
  champion("jinx", "Jinx", "Jinx", "AD",
    { burst: 1, dps: 3, aoe: 3, early: 1, scaling: 3 },
    { tags: ["bot"] }),
  champion("kaisa", "Kai'Sa", "Kaisa", "mixed",
    { burst: 2, dps: 3, aoe: 1, dive: 2, early: 1, scaling: 3 },
    { tags: ["bot"] }),
  champion("missfortune", "Miss Fortune", "MissFortune", "AD",
    { burst: 2, dps: 2, poke: 2, aoe: 3, early: 2, scaling: 2 },
    { tags: ["bot"] }),
  champion("ezreal", "Ezreal", "Ezreal", "mixed",
    { burst: 1, dps: 2, poke: 3, dive: 1, early: 1, scaling: 2 },
    { tags: ["bot"] }),
  champion("jhin", "Jhin", "Jhin", "AD",
    { burst: 3, dps: 2, poke: 2, early: 2, scaling: 2 },
    { tags: ["bot"] }),
  champion("caitlyn", "Caitlyn", "Caitlyn", "AD",
    { poke: 3, dps: 2, burst: 1, early: 2, scaling: 2 },
    { tags: ["bot"] }),
  champion("vayne", "Vayne", "Vayne", "AD",
    { dps: 3, burst: 1, early: 0, scaling: 3 },
    { tags: ["bot"] }),
  champion("tristana", "Tristana", "Tristana", "AD",
    { engage: 1, burst: 2, dps: 2, dive: 2, early: 1, scaling: 2 },
    { tags: ["bot"] }),
  champion("ashe", "Ashe", "Ashe", "AD",
    { engage: 2, poke: 2, dps: 1, early: 1, scaling: 2 },
    { tags: ["bot", "support"] }),
  champion("sivir", "Sivir", "Sivir", "AD",
    { dps: 2, poke: 1, aoe: 1, early: 1, scaling: 2 },
    { tags: ["bot"] }),

  // ---------- costumam ser jogados no SUPPORT ----------
  champion("lulu", "Lulu", "Lulu", "AP",
    { peel: 3, poke: 1, aoe: 1, early: 1, scaling: 3 },
    { knockup: true, tags: ["support"] }),
  champion("leona", "Leona", "Leona", "AP",
    { engage: 3, peel: 1, aoe: 2, frontline: 3, dive: 3, early: 3, scaling: 1 },
    { tags: ["support"] }),
  champion("nautilus", "Nautilus", "Nautilus", "AP",
    { engage: 3, peel: 1, aoe: 1, frontline: 3, dive: 3, early: 2, scaling: 1 },
    { knockup: true, tags: ["support"] }),
  champion("thresh", "Thresh", "Thresh", "AP",
    { engage: 2, peel: 3, poke: 1, aoe: 1, frontline: 1, dive: 1, early: 2, scaling: 1 },
    { tags: ["support"] }),
  champion("braum", "Braum", "Braum", "AP",
    { engage: 2, peel: 3, poke: 1, aoe: 2, frontline: 3, early: 2, scaling: 1 },
    { knockup: true, tags: ["support"] }),
  champion("morgana", "Morgana", "Morgana", "AP",
    { engage: 2, peel: 2, poke: 1, aoe: 1, early: 1, scaling: 2 },
    { tags: ["support", "mid"] }),
  champion("rakan", "Rakan", "Rakan", "AP",
    { engage: 3, peel: 2, dive: 2, aoe: 1, early: 2, scaling: 1 },
    { tags: ["support"] }),
  champion("soraka", "Soraka", "Soraka", "AP",
    { peel: 3, early: 1, scaling: 2 },
    { tags: ["support"] }),
  champion("janna", "Janna", "Janna", "AP",
    { peel: 3, engage: 1, aoe: 1, early: 1, scaling: 2 },
    { knockup: true, tags: ["support"] }),
  champion("pyke", "Pyke", "Pyke", "mixed",
    { engage: 2, burst: 3, dive: 2, early: 2, scaling: 1 },
    { tags: ["support", "jungle"] }),
];

/*
  DUPLAS ESPECIAIS
  Combinações famosas que as regras gerais não capturam bem.
  delta = pontos somados (ou subtraídos, se negativo) à sinergia da dupla.
*/
export const PAIR_OVERRIDES = [
  {
    ids: ["missfortune", "amumu"],
    delta: 12,
    reason: "Amumu prende todo mundo e a ult da Miss Fortune acerta o time inteiro",
  },
  {
    ids: ["missfortune", "leona"],
    delta: 10,
    reason: "Leona trava o alvo no lugar e a Miss Fortune não erra a ult",
  },
  {
    ids: ["jinx", "lulu"],
    delta: 6,
    reason: "Dupla clássica: Lulu dá velocidade e escudo para a Jinx",
  },
  {
    ids: ["kaisa", "nautilus"],
    delta: 6,
    reason: "Os controles do Nautilus ajudam a Kai'Sa a acumular plasma e entrar",
  },
  {
    ids: ["rakan", "xinzhao"],
    delta: 6,
    reason: "Engage duplo: dois campeões entrando juntos na luta ao mesmo tempo",
  },
];

/*
  LOOKUP GLOBAL
  Usado pelo drag-and-drop: ao soltar um campeão numa zona do mapa, o
  identificador (texto simples) é tudo que o navegador entrega no "drop",
  então precisamos achar o campeão a partir do id.
*/
export const CHAMPION_BY_ID = Object.fromEntries(
  ALL_CHAMPIONS.map((c) => [c.id, c])
);

// Rótulos usados para mostrar os pontos fortes de cada campeão
const TRAIT_LABELS = [
  ["engage", "Engage"],
  ["peel", "Proteção"],
  ["burst", "Burst"],
  ["dps", "Dano contínuo"],
  ["poke", "Poke"],
  ["aoe", "Área"],
  ["frontline", "Frontline"],
  ["dive", "Dive"],
];

// Os 2 maiores pontos fortes do campeão (só mostra os que valem 2 ou mais)
export function topTraits(champ, limit = 2) {
  return TRAIT_LABELS
    .map(([key, label]) => ({ label, value: champ[key] }))
    .filter((trait) => trait.value >= 2)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map((trait) => trait.label);
}
