import "./login.css";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import  LoginComponent  from "../../components/LoginComponent/LoginComponent";

function Login() {
  return (
    <div className='login-container'> 
    <Navbar />
    <div className="container-first">
      <LoginComponent/>
    </div>
    <Footer />
    </div>
  );
}

export default Login;
