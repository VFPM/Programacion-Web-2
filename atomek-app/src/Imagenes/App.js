import './App.css';
import Inicio from './pages/Inicio';
import { Fragment } from 'react';
import React from 'react';
import Lobby from './pages/Lobby';
import Login from './pages/Login';
import CC from './pages/CrearCuenta';
import Perfil from './pages/Perfil';
import Muro from './pages/Muro';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        
        <Route exact path="/" element={<Lobby />} />
        <Route exact path="/atomek/login" element={<Login />} />
        <Route exact path="/atomek/Perfil" element={<Perfil />} />
        <Route exact path="/atomek/Muro" element={<Muro />} />
        <Route exact path="/atomek/Crear" element={<CC />} />
      </Routes>
    
    </Fragment>
  );
}

export default App;
