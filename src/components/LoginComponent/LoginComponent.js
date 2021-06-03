import { TextField, Button } from "@material-ui/core";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";


function LoginComponent(props) {

  const { user } = useContext(AuthContext)


  return (
        <div className="firts-column">
        <h2 className="title"> Login</h2>
        <form className="form">
          <div className="form-group">
            <TextField
              className="form-control"
              type="email"
              placeholder="E-mail"
              value={user.name}
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              type="password"
              placeholder="Senha"
            />
          </div>
          <Button
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
          <NavLink to = '/register_user'>Registre-se</NavLink>
        </div>
        <div className="password-group">
          <NavLink to = "/login" onClick = {(event) => props.setStatePass(true)}>Esqueci minha senha</NavLink>
        </div>
      </div>
    )
}

export default LoginComponent;