import { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UserSubscription.css";
import { NavLink } from "react-router-dom";


function UserSubscription({project, setStatePass}) {

    const { user } = useContext(AuthContext);

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                    setStatePass(false)}
                }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return(
        
        <div className = "user-subscription-container user-set-vis">
            <div ref = {windowRef} className = "user-subscription-window">
                <div className = "user-subscription-window-header">
                <h3>Inscrever-se na vaga</h3>
                <FontAwesomeIcon className = "user-subscription-close-btn" icon = {faTimes} onClick = {() => setStatePass(false)}/>
                </div>

                  <div className = "user-subscription-window-body">
                    
                    <div className = "user-subscription-info-container">
                        <p>Antes de se inscrever no projeto, confirme os seus dado abaixo:</p>

                        <span className = "user-subscription-user-info">Telefone: {user.phone}</span>
                        <span className = "user-subscription-user-info">E-mail: {user.email}</span>

                        <NavLink to = {`/user/${user.id}`}>ALTERAR</NavLink>

                        <input id = "user-subscription-confirm-info" type = "checkbox"></input>
                        <label htmlFor = "user-subscription-confirm-info">Declaro que minhas informações estão corretas</label>
                    </div>
                    
                    <input id = "user-subscription-confirm-terms" type = "checkbox"></input>
                    <label htmlFor = "user-subscription-confirm-terms">Declaro que li e aceito os termos de voluntariado.</label>

                  </div>
                
                <div className = "project-first-closing-window-footer">
                    <button className = "user-subscription-btn"  onClick = {() => setStatePass(false)}>Inscrever-se</button>
                </div>
            </div>
        </div>
    )
}

export default UserSubscription;