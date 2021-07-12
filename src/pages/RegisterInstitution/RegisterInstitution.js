import { NavLink } from "react-router-dom";
import InstForm from "../../components/Forms/InstitutionForm";
import fullLogo from "../../img//logo-color.png";
import "./registerinstitution.css";

function RegisterInstitution() {
  return (
    <div className="instituition-register-container instituition-grid">
      <div className="instituition-register-image-div">
        <NavLink to="/" exact>
          <img
            className="footer-logo"
            src={fullLogo}
            alt="logo-corrente-do-bem"
          ></img>
        </NavLink>
      </div>
      <InstForm />
    </div>
  );
}

export default RegisterInstitution;
