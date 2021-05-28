import { TextField, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";


function LoginComponent() {
    return (
        <div className="firts-column">
        <h2 className="title"> Login</h2>
        <form className="form">
          <div className="form-group">
            <TextField
              className="form-control"
              type="email"
              placeholder="E-mail"
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
          <NavLink to = '/register_user'>Esqueci minha senha</NavLink>
        </div>
      </div>
    )
}

export default LoginComponent;