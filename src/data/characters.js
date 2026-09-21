import yasuoImage from "../assets/characters/yasuo/yasuo.jpg";
import rivenImage from "../assets/characters/riven/riven.jpg";
import zedImage from "../assets/characters/zed/zed.jpg";
import auroraImage from "../assets/characters/aurora/aurora.jpg";
import ireliaImage from "../assets/characters/irelia/irelia.jpg";

/*
  FUNDO ANIMADO
  Basta colocar um arquivo .webm, .mp4 ou .gif dentro da pasta do campeão:

    src/assets/characters/yasuo/yasuo.webm   (ou .mp4 / .gif)

  Ele é encontrado automaticamente pelo nome da pasta. Se não existir arquivo
  animado para o campeão, o site usa o .jpg de sempre (nada quebra).
  Se houver vídeo e gif na mesma pasta, o vídeo tem prioridade.
*/
const animatedFiles = import.meta.glob(
  "../assets/characters/*/*.{webm,mp4,gif}",
  { eager: true, query: "?url", import: "default" }
);

function findAnimatedMedia(id) {
  const paths = Object.keys(animatedFiles).filter((path) =>
    path.includes(`/characters/${id}/`)
  );

  const best = paths.find((path) => /\.(webm|mp4)$/i.test(path)) ?? paths[0];

  return best ? animatedFiles[best] : null;
}

const baseCharacters = [
  {
    id: "yasuo",
    name: "YASUO",
    title: "THE UNFORGOTTEN",
    role: "FIGHTER / ASSASSIN",
    image: yasuoImage,

    theme: {
      primary: "#7dd3fc",
      secondary: "#0f172a",
    },
  },

  {
    id: "riven",
    name: "RIVEN",
    title: "THE EXILE",
    role: "FIGHTER",
    image: rivenImage,

    theme: {
      primary: "#f87171",
      secondary: "#1c1917",
    },
  },

  {
    id: "zed",
    name: "ZED",
    title: "THE MASTER OF SHADOWS",
    role: "ASSASSIN",
    image: zedImage,

    theme: {
      primary: "#c084fc",
      secondary: "#09090b",
    },
  },

  {
    id: "aurora",
    name: "AURORA",
    title: "THE WITCH BETWEEN WORLDS",
    role: "MAGE",
    image: auroraImage,

    theme: {
      primary: "#e879f9",
      secondary: "#2e1065",
    },
  },

  {
    id: "irelia",
    name: "IRELIA",
    title: "THE WILL OF THE BLADES",
    role: "FIGHTER",
    image: ireliaImage,

    theme: {
      primary: "#67e8f9",
      secondary: "#172554",
    },
  },
];

export const characters = baseCharacters.map((character) => ({
  ...character,
  media: findAnimatedMedia(character.id),
}));