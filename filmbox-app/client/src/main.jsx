import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";

const container = document.getElementById("root");

let root = container._reactRoot;

if (!root) {
  root = createRoot(container);
  container._reactRoot = root;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
