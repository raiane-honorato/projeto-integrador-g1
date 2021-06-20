import { NavLink } from "react-router-dom";

function DropNotLogged() {

    return (
<ul className="nav-btn-list">
    <li className="nav-btn">
        <NavLink to="/login">
        <b>Entrar</b>
        </NavLink> 
    </li> 
    <li className="nav-btn">
        <NavLink to="/register_user">Cadastrar-se</NavLink>
    </li>  


    <div className="nav-dropdown-line"></div>
    <li className="nav-btn">
    <NavLink to="/register_institution">
        Seja uma instituição
    </NavLink>
    </li>
</ul>
    )
}

export default DropNotLogged;
