import { TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import toast, { Toaster } from "react-hot-toast";

function LoginComponent(props) {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  async function login(userEmail, password) {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });
      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      console.log(error);
      return "Usuário ou senha inválido!";
    }
  }

  function renderingUser() {
    const userId = "1";

    fetch(`http://localhost:8000/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((erro) => alert("Não foi possível localizar este usuário."));
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      await login(userEmail, password);
      if (token !== null && token !== undefined && token !== ""){
        console.log("aqui n")
        renderingUser();
        history.push("/");
      } else {
        console.logo("nao")
      }     
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
