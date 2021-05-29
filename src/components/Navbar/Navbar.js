import { NavLink } from "react-router-dom";
import "./Navbar.css";
import miniLogo from "../../img/mini-logo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";


function Navbar() {

  const [navbar, setNavbar] = useState(false);


  function changeBackground() {
    window.scrollY >= 70 ? setNavbar(true) : setNavbar(false);  
  }  

  window.addEventListener('scroll', changeBackground)

  return (
    <>
      <nav className={navbar ? 'navbar active' : 'navbar'}>
        <div className="nav-container">
          <div>
            <img
              src={miniLogo}
              className="nav-logo"
              alt="logo-corrente-do-bem"
            ></img>
            <ul className="nav-btn-list">
              <li>
                <NavLink to="/" className="nav-btn" exact>
                  Home
                </NavLink>
              </li>
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
        </div>
      </nav>
    </>
  );
}

export default Navbar;
