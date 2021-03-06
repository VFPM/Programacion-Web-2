import './App.css';
import Inicio from './pages/Inicio';
import { Fragment } from 'react';
import React from 'react';
import Lobby from './pages/Lobby';
import Login from './pages/Login';
import CC from './pages/CrearCuenta';
import Perfil from './pages/Perfil';
import Muro from './pages/Muro';
import StreaksCommunity from './pages/Streaks_Community';
import CrearRacha from './pages/Crear_racha';
import UpdtRacha from './pages/Update_racha';
import Responses from './pages/Responses';
import ViewAdmin from './pages/View_Admin';
import Error from './pages/Error';


import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        
        <Route exact path="/" element={<Lobby />} />
        <Route exact path="/atomek/login" element={<Login />} />
        <Route exact path="/atomek/Perfil/:idUser" element={<Perfil />} />
        <Route exact path="/atomek/Muro/:id" element={<Muro />} />
        <Route exact path="/atomek/Community/:id/View-Admin" element={<ViewAdmin />} />
        <Route exact path="/atomek/Streaks/Community/:id" element={<StreaksCommunity />} />
        <Route exact path="/atomek/Crear" element={<CC />} />
        <Route exact path="/atomek/CRacha" element={<CrearRacha />} />
        <Route exact path="/atomek/CRacha/:idStreak" element={<CrearRacha />} />
        <Route exact path="/atomek/URacha/:idStreak" element={<UpdtRacha />} />
        <Route exact path="/atomek/Responses/:idSubscription" element={<Responses />} />
        <Route exact path="/atomek/Error" element={<Error />} />

      </Routes>
    
    </Fragment>
  );
}

export default App;
