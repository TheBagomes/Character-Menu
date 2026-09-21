import { useRef, useState } from "react";
import "./MainMenu.css";

/*
  caption = legenda pequena que aparece embaixo do item selecionado
  (como o texto em japonês do menu do Persona). Edite à vontade.
*/
const menuItems = [
  { label: "PARTY", path: "/party", caption: "Seu time e suas composições" },
  { label: "MASTERY", path: "/mastery", caption: "Maestria dos campeões" },
  { label: "HISTORY", path: "/history", caption: "Histórico de partidas" },
  { label: "COMBOS", path: "/combos", caption: "Combos e mecânicas" },
  { label: "HIGHLIGHTS", path: "/highlights", caption: "Melhores momentos" },
];

function MainMenu({ navigate }) {
  // Como no Persona, sempre existe um item selecionado.
  // O mouse (ou as setas) só troca qual é; sair de cima não desmarca.
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef([]);

  const handleKeyDown = (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();

    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = (activeIndex + step + menuItems.length) % menuItems.length;

    setActiveIndex(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <nav
      className="main-menu"
      aria-label="Menu principal"
      onKeyDown={handleKeyDown}
    >
      {menuItems.map((item, index) => {
        const offset = index - activeIndex;

        return (
          <button
            key={item.label}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            className={`menu-item ${offset === 0 ? "is-active" : ""}`}
            // --o = posição relativa ao item selecionado (-2, -1, 0, 1, 2...)
            // --d = distância dele (0, 1, 2...). O CSS usa os dois para
            // dimensionar, inclinar e afastar cada palavra.
            style={{ "--o": offset, "--d": Math.abs(offset) }}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => navigate(item.path)}
          >
            <span className="menu-item__label">
              {item.label}
              <small className="menu-item__caption">{item.caption}</small>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default MainMenu;
