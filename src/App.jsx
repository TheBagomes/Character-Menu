import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Mastery from "./pages/Mastery";
import Party from "./pages/Party";
import History from "./pages/History";
import Combos from "./pages/Combos";
import Highlights from "./pages/Highlights";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/party" element={<Party />} />
        <Route path="/mastery" element={<Mastery />} />
        <Route path="/history" element={<History />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/highlights" element={<Highlights />} />
      </Routes>
    </HashRouter>
  );
}

export default App;