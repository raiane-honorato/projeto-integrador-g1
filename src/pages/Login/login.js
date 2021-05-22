import './login.css'
import { TextField, Button } from '@material-ui/core'

function Login() {
    return(
        <div class="container-first">
        <div class="firts-column">
            <h2 class="title"> Login</h2>
                <form class="form">
                    <div class="form-group">
                    <TextField class="form-control" type= "email" placeholder="Email" />
                    </div>
                    <div class="form-group">
                    <TextField class="form-control" type= "password" placeholder="Password"/>
                    </div>
                    {/* <button class="btn btn-secondary">Entrar</button> */}
                    <Button style={{ marginTop: '20px'  }} variant="contained" color="primary">
                        Entrar
                    </Button>
                </form>
        </div>     
     </div>
    )
}

export default Login;