import yasuoImage from "../assets/characters/yasuo/yasuo.jpg";
import rivenImage from "../assets/characters/riven/riven.jpg";
import zedImage from "../assets/characters/zed/zed.jpg";
import auroraImage from "../assets/characters/aurora/aurora.jpg";
import ireliaImage from "../assets/characters/irelia/irelia.jpg";

export const characters = [
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