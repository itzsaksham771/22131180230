import React from "react";
import { Routes, Route } from "react-router-dom";
import URLForm from "../components/URLForm";
import StatsPage from "../components/StatsPage";
import RedirectHandler from "../components/RedirectHandler";

export default function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<URLForm />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  );
}
