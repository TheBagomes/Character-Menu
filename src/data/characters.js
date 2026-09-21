const imageFiles = import.meta.glob(
  "../assets/characters/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
);

const iconFiles = import.meta.glob(
  "../assets/characters/icons/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
);

const animatedFiles = import.meta.glob(
  "../assets/characters/*/*.{webm,mp4,gif,WEBM,MP4,GIF}",
  { eager: true, query: "?url", import: "default" }
);

function pathsFor(files, id) {
  return Object.keys(files).filter((path) =>
    path.toLowerCase().includes(`/characters/${id}/`)
  );
}

function findImage(id) {
  const paths = pathsFor(imageFiles, id);

  const best =
    paths.find((path) => path.toLowerCase().includes(`/${id}.`)) ?? paths[0];

  return best ? imageFiles[best] : null;
}

function findIcon(id) {
  const paths = Object.keys(iconFiles);

  console.log("Procurando ícone:", id);
  console.log("Arquivos disponíveis:", paths);

  const best = paths.find((path) =>
    path.toLowerCase().includes(`${id}-icon`)
  );

  console.log("Ícone encontrado:", best);

  return best ? iconFiles[best] : null;
}

function findAnimatedMedia(id) {
  const paths = pathsFor(animatedFiles, id);

  const best = paths.find((path) => /\.(webm|mp4)$/i.test(path)) ?? paths[0];

  return best ? animatedFiles[best] : null;
}

const baseCharacters = [
  {
    id: "yasuo",
    name: "YASUO",
    title: "THE UNFORGOTTEN",
    role: "FIGHTER / ASSASSIN",

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

    theme: {
      primary: "#67e8f9",
      secondary: "#172554",
    },
  },
];

export const characters = baseCharacters.map((character) => ({
  ...character,
  image: findImage(character.id),
  icon: findIcon(character.id),
  media: findAnimatedMedia(character.id),
}));