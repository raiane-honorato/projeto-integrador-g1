import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";

function DropLoggedUser() {
    const { user, setToken, setUser} = useContext(AuthContext);
    const history = useHistory();

    const signOut = (event) => {
        event.preventDefault();    
        setToken("");
        setUser("");
        alert('Usuário deslogado!')
        return history.push("/");
      }

    return (
    <ul className="nav-btn-list">
        <li className="nav-btn">
            <NavLink to={`/user/${user.id}`}>
            <b>Perfil</b>
            </NavLink>  
        </li>
        <li className="nav-btn">
            <NavLink to='/' onClick={signOut}>
            Sair
            </NavLink>  
        </li>


        <div className="nav-dropdown-line"></div>
        <li className="nav-btn">
        <NavLink to="/register_institution">
            Seja uma instituição
        </NavLink>
        </li>
    </ul>
    );
}

export default DropLoggedUser;
