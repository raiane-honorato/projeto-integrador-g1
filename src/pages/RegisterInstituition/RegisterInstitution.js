import { NavLink } from "react-router-dom";
import InstFormulario from "../../components/Forms/InstitutionForm";
import fullLogo from "../../img//logo-color.png";
import "./registerinstitution.css";

function RegisterInstitution() {
  return (
    <div className="instituition-register-container">
      <div className="instituition-register-image-div">
        <NavLink to="/" className="nav-btn" exact>
          <img
            className="footer-logo"
            src={fullLogo}
            alt="logo-corrente-do-bem"
          ></img>
        </NavLink>
      </div>
      <InstFormulario />
    </div>
  );
}

export default RegisterInstitution;
