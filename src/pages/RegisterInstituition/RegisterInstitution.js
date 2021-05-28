import Footer from "../../components/Footer/Footer";
import InstFormulario from "../../components/Forms/InstitutionForm";
import Navbar from "../../components/Navbar/Navbar";
import "./registerinstitution.css";

function RegisterInstitution() {
  return (
    
      <div className="instituition-register-container">
        <Navbar />
        <InstFormulario />
        <Footer />
      </div>
    
  );
}

export default RegisterInstitution;
