import {Link, NavLink} from 'react-router-dom';
import "./Navbar.css";
import miniLogo from '../../img/mini-logo-white.png';
import SearchBar from '../SearchBar/SearchBar';

function Navbar() {
    return(
        <nav className ="navbar">
            <div className = "nav-container">
            <img src={miniLogo} className="nav-logo" alt="logo-corrente-do-bem"></img>
            <SearchBar />
            <ul className ="nav-btn-list">
                <li>
                    <NavLink to = "/" className ="nav-btn" exact>Home</NavLink>
                </li>
                <li> 
                    <NavLink to = "/search" className ="nav-btn">Pesquisa</NavLink>
                </li>
                <li>
                    <NavLink to = "/login" className ="nav-btn">Login</NavLink>
                </li>

            </ul>
            </div>
        </nav>
    )
}

export default Navbar;