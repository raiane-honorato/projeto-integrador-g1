// import Navbar from "../Navbar/Navbar";
import "./Hero.css";

function Hero() {
  return (  
    <header className="hero">
      <div className="hero-container">
        <h2 className="hero-title" >Corrente do bem</h2>
        <p className="hero-p">
          Transforme o mundo por meio da solidariedade. Seja mais um elo dessa
          corrente.
        </p>
        <button className="hero-btn"  id="hero-btn-volunteer">
          Seja um voluntário
        </button>
        <button className="hero-btn" id="hero-btn-institution">
          Seja uma instituição
        </button>
      </div>
    </header>
  );
}

export default Hero;
