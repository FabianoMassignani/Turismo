import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Perfil } from "./pages/Perfil";
import { Passeio } from "./pages/Passeio";
import { Reserva } from "./pages/Reserva";
import { Users } from "./pages/Users";
import { Pacote } from "./pages/Pacote";
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
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pacote" element={<Pacote />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
