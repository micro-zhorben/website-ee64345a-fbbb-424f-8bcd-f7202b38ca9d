import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { SillyPage } from "./pages/silly";
import { NonsensePage } from "./pages/nonsense";

const Routes = () => (
  <RouterRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/silly" element={<SillyPage />} />
    <Route path="/nonsense" element={<NonsensePage />} />
  </RouterRoutes>
);

export { Routes };