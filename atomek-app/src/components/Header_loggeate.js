import React from "react";
import logo from "../Imagenes/Atomeak LOGO2.0.png";
import  "../components/Estilos/Header_loggeate.css";
import { Link } from "react-router-dom";
const Header_loggeate = () => {
  return (    
    <div className="background">
      <nav class="navbar ">
        <div class="containernav">
          <Link class="Nav" to="">
            <img src={require("../Imagenes/Atomeak LOGO.png")}alt=""className="logodesing"/>
          </Link>
        </div>
      </nav>
      <div className="caja_log">
        <div className="Content_log">
          
          <h4 className="log">  <Link className="Loggin" to="/atomek/login"> Inicia sesion </Link></h4>
           <h4 className="log">¿No tienes cuenta?     
                  
            <Link className="Loggin" to="/atomek/Crear " >  Registrate</Link>
           </h4>
        </div>
      </div>
    </div>
    
  );
};

export default Header_loggeate;
