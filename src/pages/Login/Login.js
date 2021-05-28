import "./login.css";
import { TextField, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import  LoginComponent  from "../../components/LoginComponent/LoginComponent";

function Login() {
  return (
    <>
    <div className="container-first">
      <LoginComponent/>
    </div>
    </>
  );
}

export default Login;
