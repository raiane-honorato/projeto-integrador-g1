import { NavLink } from "react-router-dom";
import Formulario from "../../components/Forms/UserForm";
import fullLogo from '../../img//logo-color.png';
import './registeruser.css';


function RegisterUser() {
  return (
    <div className='user-register-container'>  
      <div className='user-register-image-div'>
        <NavLink to="/" className="nav-btn" exact>
          <img
            className="footer-logo"
            src={fullLogo}
            alt="logo-corrente-do-bem"
          ></img>
        </NavLink>        
      </div>         
      <Formulario />
      
    </div>
  );
}

export default RegisterUser;
