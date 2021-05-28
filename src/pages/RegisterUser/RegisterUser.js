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
// =======
// import Formulario from '../components/Forms/UserForm'

// function RegisterUser(){
//     <Formulario />
// }

// export default Formulario


// >>>>>>> a8ddf272165a6fe3d6158fc7128e423137b7972f
