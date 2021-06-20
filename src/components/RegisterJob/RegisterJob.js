
import 'bootstrap/dist/css/bootstrap.min.css'

const RegisterJob = ( {children} ) => {

    return(
        <div className="modal">
            <div className="container">
                <button className="close">Salve</button>
                <div className="content">{children}</div>                
            </div>
        </div> 

        
    )
}

export default RegisterJob