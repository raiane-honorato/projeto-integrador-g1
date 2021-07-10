import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";

function Hero() {

  const [navbarTransparent, setNavbarTransparent] = useState(true);


  function changeBackground() {
    window.scrollY < 70 ? setNavbarTransparent(true) : setNavbarTransparent(false);  
  }  
  
    return (
    <div className="nav-plus-hero">
      <Navbar navbarTransparent={navbarTransparent} changeBackground={changeBackground}/>
      <header className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Corrente do bem</h2>
          <p className="hero-p">
            Transforme o mundo por meio da solidariedade. Seja mais um elo dessa
            corrente.
          </p>
          <div className='hero-buttons'>
          <NavLink to="/register_user">
            <button className="hero-btn" id="hero-btn-volunteer">
              Seja um voluntário
            </button>
          </NavLink>
          <NavLink to="/register_institution">
          <button className="hero-btn" id="hero-btn-institution">
            Seja uma instituição
          </button>
          </NavLink>

          </div>
        </div>
      </header>
    </div>
  );
}

export default Hero;
