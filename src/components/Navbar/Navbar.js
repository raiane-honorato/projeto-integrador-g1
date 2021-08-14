import { NavLink } from "react-router-dom";
import "./Navbar.css";
import miniLogo from "../../img/mini-logo-white.png";
import SearchBar from "../SearchBar/SearchBar";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import DropLoggedUser from "./Nav-Dropdown/DropLoggedUser";
import DropNotLogged from "./Nav-Dropdown/DropNotLogged";
import DropLoggedInstitution from "./Nav-Dropdown/DropLoggedInstitution";
import { Toaster } from 'react-hot-toast';


function Navbar({ navbarTransparent, changeBackground }) {
  window.addEventListener("scroll", changeBackground);

  const [activeLogin, setActiveLogin] = useState(false);
  const { user, token} = useContext(AuthContext);

   return (
    <>
    <Toaster />
      <nav className="navbar" id={navbarTransparent ? "navbarTransparent" : ""}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo" exact>
            <img
              src={miniLogo}
              className="nav-logo"
              alt="logo-corrente-do-bem"
            ></img>
          </NavLink>

          <SearchBar />

          <div className="nav-login-container">
            <div
              className="nav-btn-login"
              onClick={() => setActiveLogin(!activeLogin)}
            >
              <FontAwesomeIcon
                className="nav-login-icon"
                id="nav-logo-menu"
                icon={faBars}
                size="1x"
                alt="Menu"
              />
              {!token ? (
                <FontAwesomeIcon
                  className="nav-login-icon"
                  id="nav-logo-user"
                  icon={faUserAlt}
                  size="1x"
                  alt="Menu"
                />
              ) : (
               user && <img
                  className="profile-picture"
                  src={user.img}
                  alt="profile-img"
                />
              )}
            </div>
            <div className={activeLogin ? "" : "nav-set-vis"}>
              <div className="nav-login-dropdown">
                {!token ? 
                <DropNotLogged /> : 
                (user?.type === 1 ? <DropLoggedUser /> : <DropLoggedInstitution/>)
                }

              </div>
            </div>
          </div>
        </div>
      </nav>
      <div 
      className={activeLogin ? "nav-overlay" : "nav-overlay nav-set-vis"}
      onClick={() => setActiveLogin(!activeLogin)}
      ></div>
    </>
  );
}

export default Navbar;
