import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ExportApp from "./export/ExportApp";
import { LAUNCH } from "./editions/data";
import "./concepts.css";
import "./editions/editions.css";

// See export/ExportApp.jsx for what each URL renders.
const params = new URLSearchParams(window.location.search);
const post = LAUNCH.find((p) => p.id === params.get("post"));
if (post) document.title = `${post.id} ${post.title}`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExportApp params={params} />
  </StrictMode>,
);
