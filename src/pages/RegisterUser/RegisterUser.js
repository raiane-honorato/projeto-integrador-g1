import Formulario from "../../components/Forms/UserForm";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './registeruser.css';

function RegisterUser() {
  return (
    <div className='user-register-container'>
      <Navbar />
      <Formulario />
      <Footer />
    </div>
  );
}

export default RegisterUser;
