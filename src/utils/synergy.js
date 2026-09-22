import { LANES, PAIR_OVERRIDES } from "../data/partyChampions";

/*
  COMO A NOTA É CALCULADA
  Toda dupla começa em 50. Cada regra abaixo soma ou tira pontos e deixa um
  motivo escrito, que aparece na tela. Para mudar o "gosto" do sistema,
  mexa nos números (delta) ou nas condições.
*/

const BASE_SCORE = 50;

// Regras em que a ORDEM importa: x faz algo por y.
// Testamos nos dois sentidos e valemos o melhor.
const DIRECTED_RULES = [
  (x, y) =>
    x.engage >= 2 && y.burst + y.dps >= 4
      ? {
          delta: x.engage >= 3 ? 12 : 8,
          text: `${x.name} começa a luta e ${y.name} converte em dano`,
        }
      : null,

  (x, y) =>
    x.peel >= 2 && y.scaling >= 2 && y.dps >= 2
      ? {
          delta: 14,
          text: `${x.name} protege ${y.name}, que escala e causa dano contínuo`,
        }
      : null,

  (x, y) =>
    x.frontline >= 3 && y.frontline === 0 && y.dps >= 2
      ? {
          delta: 8,
          text: `${x.name} segura a linha da frente para ${y.name} causar dano`,
        }
      : null,

  (x, y) =>
    x.knockup && y.needsAirborne
      ? {
          delta: 20,
          text: `${x.name} lança alvos ao ar e ${y.name} depende disso para a ult`,
        }
      : null,

  // picos de força diferentes: x é forte cedo e fraco tarde, y o contrário
  (x, y) =>
    x.early >= 3 && x.scaling <= 1 && y.scaling >= 3 && y.early <= 1
      ? {
          delta: -6,
          text: `${x.name} precisa jogar cedo e ${y.name} só brilha no fim do jogo`,
        }
      : null,
];

// Regras em que a ordem NÃO importa
const SYMMETRIC_RULES = [
  (a, b) => {
    if (a.dive >= 3 && b.dive >= 3) {
      return { delta: 10, text: "Dive dupla: os dois entram juntos na backline" };
    }
    if (a.dive >= 2 && b.dive >= 2) {
      return { delta: 5, text: "Os dois conseguem alcançar a backline inimiga" };
    }
    return null;
  },

  (a, b) =>
    a.poke >= 2 && b.poke >= 2
      ? { delta: 10, text: "Dupla de poke: desgasta o time inimigo antes da luta" }
      : null,

  (a, b) =>
    a.aoe >= 3 && b.aoe >= 3
      ? { delta: 8, text: "Os dois têm dano em área: lutas em grupo são o forte" }
      : null,

  (a, b) =>
    a.early >= 2 && b.early >= 2
      ? { delta: 6, text: "Os dois são fortes no início: dá para forçar o jogo cedo" }
      : null,

  (a, b) =>
    a.scaling >= 3 && b.scaling >= 3
      ? { delta: 6, text: "Os dois escalam bem: o jogo longo favorece a dupla" }
      : null,

  // Só compara tipo de dano entre quem realmente causa dano (não suportes)
  (a, b) => {
    const dealers = a.burst + a.dps >= 3 && b.burst + b.dps >= 3;
    if (!dealers || a.damage === "mixed" || b.damage === "mixed") return null;

    return a.damage !== b.damage
      ? { delta: 6, text: "Dano físico + mágico: mais difícil de resistir com itens" }
      : { delta: -4, text: "Os dois causam o mesmo tipo de dano: mais fácil de resistir" };
  },

  (a, b) =>
    [a, b].every((c) => c.engage <= 1 && c.peel === 0 && c.frontline === 0)
      ? { delta: -8, text: "Nenhum dos dois começa a luta nem protege o time" }
      : null,
];

export function tierFor(score) {
  if (score >= 85) return { letter: "S", label: "Perfeita" };
  if (score >= 72) return { letter: "A", label: "Forte" };
  if (score >= 58) return { letter: "B", label: "Boa" };
  if (score >= 45) return { letter: "C", label: "Regular" };
  return { letter: "D", label: "Fraca" };
}

// Verde para sinergia alta, vermelho para baixa
export function scoreColor(score) {
  return `hsl(${Math.round(Math.min(100, Math.max(0, score)) * 1.2)} 85% 55%)`;
}

export function scorePair(a, b) {
  const reasons = [];

  for (const rule of DIRECTED_RULES) {
    const best = [rule(a, b), rule(b, a)]
      .filter(Boolean)
      .sort((p, q) => Math.abs(q.delta) - Math.abs(p.delta))[0];

    if (best) reasons.push(best);
  }

  for (const rule of SYMMETRIC_RULES) {
    const result = rule(a, b);
    if (result) reasons.push(result);
  }

  for (const override of PAIR_OVERRIDES) {
    if (override.ids.includes(a.id) && override.ids.includes(b.id)) {
      reasons.push({ delta: override.delta, text: override.reason });
    }
  }

  if (reasons.length === 0) {
    reasons.push({ delta: 0, text: "Sem interação especial: dupla neutra" });
  }

  const raw = reasons.reduce((total, reason) => total + reason.delta, BASE_SCORE);
  const score = Math.min(99, Math.max(5, raw));

  return { score, ...tierFor(score), reasons };
}

function teamWarnings(champions) {
  const sum = (key) => champions.reduce((total, c) => total + c[key], 0);
  const warnings = [];

  if (sum("frontline") < 4) {
    warnings.push("Pouca frontline: ninguém aguenta o começo da luta");
  }

  if (sum("engage") < 4) {
    warnings.push("Pouco engage: o time tem dificuldade para começar lutas");
  }

  // Quanto do dano vem de AD e de AP (campeões "mixed" contam metade/metade)
  let ad = 0;
  let ap = 0;

  for (const c of champions) {
    const weight = c.burst + c.dps;
    if (c.damage === "AD") ad += weight;
    else if (c.damage === "AP") ap += weight;
    else {
      ad += weight / 2;
      ap += weight / 2;
    }
  }

  const total = ad + ap;

  if (total > 0 && Math.max(ad, ap) / total >= 0.8) {
    warnings.push(
      `Dano concentrado em ${ad > ap ? "AD" : "AP"}: fácil de countar com itens`
    );
  }

  return warnings;
}

// picks = { top: champion | null, jungle: ..., mid: ..., bot: ..., support: ... }
export function analyzeParty(picks) {
  const chosen = LANES.filter((lane) => picks[lane.id]);
  const pairs = [];

  for (let i = 0; i < chosen.length; i++) {
    for (let j = i + 1; j < chosen.length; j++) {
      const laneA = chosen[i].id;
      const laneB = chosen[j].id;

      pairs.push({
        key: `${laneA}-${laneB}`,
        laneA,
        laneB,
        a: picks[laneA],
        b: picks[laneB],
        ...scorePair(picks[laneA], picks[laneB]),
      });
    }
  }

  const sorted = [...pairs].sort((p, q) => q.score - p.score);
  const complete = chosen.length === LANES.length;

  const average = pairs.length
    ? Math.round(pairs.reduce((total, pair) => total + pair.score, 0) / pairs.length)
    : null;

  return {
    pairs,
    average,
    best: sorted[0] ?? null,
    worst: sorted[sorted.length - 1] ?? null,
    complete,
    warnings: complete ? teamWarnings(chosen.map((lane) => picks[lane.id])) : [],
  };
}
