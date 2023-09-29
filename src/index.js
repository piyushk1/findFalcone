import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./Components/LandingPage";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/game" element={<App />} />
      <Route exact path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);
