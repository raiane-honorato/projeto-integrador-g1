import {Link, NavLink} from 'react-router-dom';
import "./Navbar.css";

function Navbar() {
    return(
        <nav className ="navbar">
            <div className = "nav-container">
            <span className ="material-icons material-icons-outlined">favorite_border</span>
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