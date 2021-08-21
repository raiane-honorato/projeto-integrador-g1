import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";

function Hero() {
  const [navbarTransparent, setNavbarTransparent] = useState(true);

  function changeBackground() {
    window.scrollY < 70
      ? setNavbarTransparent(true)
      : setNavbarTransparent(false);
  }

  return (
    <div className="nav-plus-hero">
      <Navbar
        navbarTransparent={navbarTransparent}
        changeBackground={changeBackground}
      />
      <header className="hero">
        <div className="hero-container">
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Corrente do bem
          </motion.h2>
          <motion.p
            className="hero-p"
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
          >
            Transforme o mundo por meio da solidariedade. Seja mais um elo dessa
            corrente.
          </motion.p>
          <div className="hero-buttons">
            <NavLink to="/register_user">
              <motion.button
                initial={{ opacity: 0, y: 400 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="hero-btn"
                id="hero-btn-volunteer"
              >
                Seja um voluntário
              </motion.button>
            </NavLink>
            <NavLink to="/register_institution">
              <motion.button
                initial={{ opacity: 0, y: 400 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="hero-btn"
                id="hero-btn-institution"
              >
                Seja uma instituição
              </motion.button>
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Hero;
