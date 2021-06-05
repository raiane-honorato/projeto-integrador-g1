import { NavLink } from "react-router-dom";
import "./Navbar.css";
import miniLogo from "../../img/mini-logo-white.png";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ navbarTransparent, changeBackground }) {
  window.addEventListener("scroll", changeBackground);

  return (
    <>
      <nav className="navbar" id={navbarTransparent ? "navbarTransparent" : ""}>
        <div className="nav-container">
          <div>
            <NavLink to="/" className="nav-btn" exact>
              <img
                src={miniLogo}
                className="nav-logo"
                alt="logo-corrente-do-bem"
              ></img>
            </NavLink>
          </div>
          <SearchBar />
          <ul className="nav-btn-list">
            <li className="login">
              <NavLink to="/login" className="nav-btn" id="login">
              Entrar
                <span class="material-icons material-icons-outlined">login</span>
                
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
