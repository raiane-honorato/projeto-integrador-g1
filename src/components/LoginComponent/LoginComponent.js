import { TextField, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";


function LoginComponent(props) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useContext(AuthContext);
  const history = useHistory();
  

  function login (userEmail, password) {
    if (userEmail === 'admin@gmail.com' && password === 'admin') {
      return { token: '1234'}
    } else {
      return { error: 'Usuário ou senha inválido!'}
    }

  }
  
  function onSubmit(event) {
    event.preventDefault();
    console.log('submeteu')
    const { token } = login(userEmail, password);

    if (token) {
      console.log('logado')
      setToken(token)
      return history.push('/')
    }

    setUserEmail('');
    setPassword('');

  }

  return (
        <div className="firts-column">
        <h2 className="title"> Login</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <TextField
              className="form-control"
              type="email"
              placeholder="E-mail"
              value={userEmail}
              onChange={(e) => {setUserEmail(e.target.value)}}
            />
          </div>
          <div className="form-group">
            <TextField
              className="form-control"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <Button
            type='submit'
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