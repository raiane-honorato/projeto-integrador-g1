import { TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";
import api from "../../services/api";

function LoginComponent(props) {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  async function login(userEmail, password) {
    const response = await api.post(`/login`, {
      email: userEmail,
      password
    })
    const { token } = response.data;
    setToken(token);
  }

  async function renderingUser() {
     const response = await api.get(`/user/email?email=${userEmail}`);
     const result = response.data;
      setUser(result)  
  }

  async function onSubmit(event) {
    event.preventDefault();
    try { 
        await login(userEmail, password);
        console.log("token: " + token)
        await renderingUser();
          history.push("/");
            
    } catch (error) {
      toast.error("Senha ou usuário inválidos!", {
        duration: 2000,
        position: "top-right",
      });
    }
  }


  return (
    <div className="firts-column">
      <Toaster />
      <h2 className="title"> Login</h2>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <TextField
            className="form-control"
            type="email"
            placeholder="E-mail"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            className="form-control"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button
          type="submit"
          style={{ marginTop: "20px" }}
          variant="contained"
          className="buttonLogin"
          color="primary"
        >
          Entrar
        </Button>
      </form>
      <div className="register-group">
        <span>Não possui conta?</span>
        <NavLink to="/register_user">Registre-se</NavLink>
      </div>
      <div className="password-group">
        <NavLink to="/login" onClick={(event) => props.setStatePass(true)}>
          Esqueci minha senha
        </NavLink>
      </div>
    </div>
  );
}

export default LoginComponent;
