import { NavLink } from "react-router-dom";
import UserForm from "../../components/Forms/UserForm";
import fullLogo from '../../img//logo-color.png';
import './registeruser.css';


function RegisterUser() {
  return (
    <div className='user-register-container user-grid'>  
      <div className='user-register-image-div'>
        <NavLink to="/" exact>
          <img
            className="footer-logo"
            src={fullLogo}
            alt="logo-corrente-do-bem"
          ></img>
        </NavLink>        
      </div>         
      <UserForm />
      
    </div>
  );
}

export default RegisterUser;
