import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReelPlayer from "./reels/ReelPlayer";
import "./concepts.css";
import "./editions/editions.css";
import "./reels/reels.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReelPlayer params={new URLSearchParams(window.location.search)} />
  </StrictMode>,
);
