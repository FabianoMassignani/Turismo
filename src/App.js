import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Passeio } from "./pages/Passeio";
import { Reservas } from "./pages/Reservas";
import { NotFoundPage } from "./pages/NotFoundPage";


import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/passeio" element={<Passeio />} />
          <Route path="/reserva" element={<Reservas />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
