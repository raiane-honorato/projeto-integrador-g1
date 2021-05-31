import "./login.css";
import { TextField, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import  LoginComponent  from "../../components/LoginComponent/LoginComponent";
import ForgotComponent from "../../components/LoginComponent/ForgotComponent"
import React, {Component, useEffect, useState} from 'react';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

function Login() {

  const [changePass, setChangePass] = useState(false);  

  return (
    <div className="loginContainer">
    <Navbar />
    <div className="container-first">
      {!changePass && <LoginComponent statePass = {changePass} setStatePass = {setChangePass}/>}
      {changePass && <ForgotComponent statePass = {changePass} setStatePass = {setChangePass}/>}
    </div>
    <Footer />
    </div>
  );
}

export default Login;
