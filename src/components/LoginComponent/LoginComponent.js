import { TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import toast, { Toaster } from 'react-hot-toast';

function LoginComponent(props) {
  const { setToken } = useContext(AuthContext);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  function login(userEmail, password) {
    if (userEmail === "joao@joao.com") {

      const userId = "1";

      fetch(`http://localhost:8000/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((erro) => alert("Não foi possível localizar este usuário."));

      return { token: "1234" };
    } else if (userEmail === "medicos@medicos.com") {

      const userId = "4";

      fetch(`http://localhost:8000/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((erro) => alert("Não foi possível localizar este usuário."));

      return { token: "5678" };
    } else {
      return { error: "Usuário ou senha inválido!" };
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const { token } = login(userEmail, password);

    if (token) {
     
      setToken(token);
      history.push("/");
      return;
    }

    setUserEmail("");
    setPassword("");
    toast.error('Senha ou usuário inválidos!',{duration: 2000, position: "top-right"})
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
