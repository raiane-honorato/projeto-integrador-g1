import { TextField, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";


function ForgotComponent(props) {

  return (
        <div className="firts-column">
        <h2 className="title"> Recuperação de senha</h2>
        <form className="form">
          <div className="form-group">
            <TextField
              className="form-control"
              type="email"
              placeholder="E-mail"
            />
          </div>

          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            className="buttonForgot"
            color="primary"
          >
            Recuperar senha
          </Button>
        </form>
        <div className="password-group">
          <NavLink to = "/login"  onClick = {(event) => props.setStatePass(false)}>Voltar para login</NavLink>
        </div>

      </div>
    )
}

export default ForgotComponent;