import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { useContext, useEffect } from "react";

function DropLoggedInstitution() {
    const { user, setToken, setUser} = useContext(AuthContext);
    const history = useHistory();

    const signOut = (event) => {
        event.preventDefault();    
        setToken("");
        setUser("");
        localStorage.clear();
        return history.push("/");
      }

    return (
    <ul className="nav-btn-list">
        {user && user.institution && <li className="nav-btn">
            <NavLink to={`/institution/${user?.institution.id}`}>
            <b>Página da instituição</b>
            </NavLink>  
        </li>}
        <li className="nav-btn">
            <NavLink to={`/manage_projects`}>
            Gerenciar projetos
            </NavLink>  
        </li>


        <div className="nav-dropdown-line"></div>
        <li className="nav-btn">
        <NavLink to='/' onClick={signOut}>
            Sair
            </NavLink>  
        </li>
    </ul>
    );
}

export default DropLoggedInstitution;
