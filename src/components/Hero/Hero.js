import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";

function Hero() {
  return (
    <div className="nav-plus-hero">
      <Navbar />
      <header className="hero">
        <div className="hero-container">
          <h2 className="hero-title">Corrente do bem</h2>
          <p className="hero-p">
            Transforme o mundo por meio da solidariedade. Seja mais um elo dessa
            corrente.
          </p>
          <NavLink to="/register_user">
            <button className="hero-btn" id="hero-btn-volunteer">
              Seja um voluntário
            </button>
          </NavLink>
          <NavLink to="/register_instituition">
          <button className="hero-btn" id="hero-btn-institution">
            Seja uma instituição
          </button>
          </NavLink>
        </div>
      </header>
    </div>
  );
}

export default Hero;
