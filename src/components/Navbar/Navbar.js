import { NavLink } from "react-router-dom";
import "./Navbar.css";
import miniLogo from "../../img/mini-logo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Navbar({navbarTransparent, changeBackground}) {

  window.addEventListener('scroll', changeBackground)

  return (
    <>
      <nav className="navbar" id={ navbarTransparent ? 'navbarTransparent' : '' }>
        <div className="nav-container">
          <div>
          <NavLink to="/" className="nav-btn" exact>
            <img
              src={miniLogo}
              className="nav-logo"
              alt="logo-corrente-do-bem"
            ></img>
                </NavLink>
            <ul className="nav-btn-list">
              <li>
                <NavLink to="/register_user" className="nav-btn">
                  Cadastro
                </NavLink>
              </li>
              <li className='login'>
                <NavLink to="/login" className="nav-btn">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
          <SearchBar />
        {/* <FontAwesomeIcon className="nav-responsive-menu"
                icon={ faBars }
                size="2x"
                alt="Menu"

              /> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
