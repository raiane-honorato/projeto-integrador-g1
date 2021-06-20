import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import { useContext } from "react";

function DropLoggedInstitution() {
    const { user, token, setToken, setUser} = useContext(AuthContext);
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
            <NavLink to={`/institution/${user.institution_id}`}>
            <b>Página da instituição</b>
            </NavLink>  
        </li>
        <li className="nav-btn">
            <NavLink to='/'>
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