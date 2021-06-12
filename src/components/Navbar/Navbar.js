import { NavLink } from "react-router-dom";
import "./Navbar.css";
import miniLogo from "../../img/mini-logo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import dev from "../../img/dev.svg";


function Navbar({ navbarTransparent, changeBackground }) {
  window.addEventListener("scroll", changeBackground);

  const [activeLogin, setActiveLogin] = useState(false);
  const { user,token } = useContext(AuthContext);
  

  console.log(token)

  return (
    <>
      <nav className="navbar" id={navbarTransparent ? "navbarTransparent" : ""}>
        <div className="nav-container">

          <NavLink to="/" className="nav-logo" exact>
            <img
              src={miniLogo}
              className="nav-logo"
              alt="logo-corrente-do-bem"
            ></img>
          </NavLink>

          <SearchBar/>

          
          <div className="nav-login-container">
           
              <div className="nav-btn-login" onClick = {() => setActiveLogin(!activeLogin)}>
              
                <FontAwesomeIcon className="nav-login-icon" id="nav-logo-menu"
                  icon={ faBars }
                  size="1x"
                  alt="Menu"
                />
                {!token ? 
                    <FontAwesomeIcon className="nav-login-icon" id="nav-logo-user"
                    icon={ faUserAlt }
                    size="1x"
                    alt="Menu"
                  /> : 
                  <img className='profile-picture' src={ user.img } alt="desenvolvedor" />
                }
                
              </div>
              <div className = {activeLogin ? "" : "set-vis"}>
                <div className ="nav-login-dropdown">
                  <ul className = "nav-btn-list">
                    <li className = "nav-btn">
                      <NavLink to="/login"><b>Entrar</b></NavLink>
                    </li>
                    <li className = "nav-btn">
                      <NavLink to="/register_user">Cadastrar-se</NavLink>
                    </li>
                    <div className="nav-dropdown-line"></div>
                    <li className = "nav-btn">
                      <NavLink to="/register_institution">Seja uma instituição</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            
          </div>

          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
