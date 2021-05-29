import "./login.css";
import { TextField, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import  LoginComponent  from "../../components/LoginComponent/LoginComponent";
import ForgotComponent from "../../components/LoginComponent/ForgotComponent"
import React, {Component, useEffect, useState} from 'react';

function Login() {

  const [changePass, setChangePass] = useState(false);  

  console.log(!changePass)
  return (
    <>
    <div className="container-first">
      {!changePass && <LoginComponent statePass = {changePass} setStatePass = {setChangePass}/>}
      {changePass && <ForgotComponent statePass = {changePass} setStatePass = {setChangePass}/>}
    </div>
    </>
  );
}

export default Login;
