import "./login.css";
import { TextField, Button } from "@material-ui/core";

function Login() {
  return (
    <div className="container-first">
      <div className="firts-column">
        <h2 className="title"> Login</h2>
        <form className="form">
          <div className="form-group">
            <TextField
              className="form-control"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              type="password"
              placeholder="Password"
            />
          </div>
          {/* <button className="btn btn-secondary">Entrar</button> */}
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            className="buttonLogin"
            color="primary"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
