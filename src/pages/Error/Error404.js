import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./error.css";
import erroImg from "../../img/404.svg";

function Error404() {
  return (
    <div className="error-container">
      <Navbar />
      <div class="error-main">
        <h1>Esta Página não existe!</h1>
        <p>Verifique a URL digitada.</p>
        <img className="error-image" src={erroImg} alt="erro" />
      </div>
      <Footer />
    </div>
  );
}

export default Error404;
