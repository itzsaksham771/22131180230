import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterComponent from "./routes/Router";

export default function App() {
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}
