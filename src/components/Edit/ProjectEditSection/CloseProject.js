import {useState, useEffect, useRef } from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./CloseProject.css";

function CloseProject(props) {

    let cancelProject = () => {
              //saving information
        let changeStatus =  fetch(`http://localhost:8000/projects/${props.project.id}`, 
        {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({"status": 2})
        })
      .then((res) => res.json())


      let cancelSubscriptions = props.subscriptions.map( (subscription) => {
          return fetch(`http://localhost:8000/subscription/${subscription.id}`, 
          {
              method: "PATCH",
              headers: {"Content-type": "application/json"},
              body: JSON.stringify({"subscription_status": "Cancelada"})
          })
        .then((res) => res.json())
      })

      Promise.all([changeStatus, cancelSubscriptions])
        .then((p) => {
            console.log(p)
            props.setStatePass(false)
            alert("Vaga cancelada com sucesso.")
        })
    }


    

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                    props.setStatePass(false)}
                }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })
    useEffect(() => console.log(props.project),[])
    return(
        
        <div className = "project-closing-container project-set-vis">
            <div ref = {windowRef} className = "project-closing-window">
                <div className = "project-closing-window-header">
                <h3>Encerrar o projeto</h3>
                <FontAwesomeIcon className = "project-closing-close-btn" icon = {faTimes} onClick = {() => props.setStatePass(false)}/>
                </div>

                  <div className = "project-closing-window-body">
                    
                    <p>
                        Tem certeza que deseja encerrar o projeto?
                        Todas as incrições serão canceladas.
                    </p>

                  </div>
                
                <div className = "project-first-closing-window-footer">
                    <button className = "project-closing-btn cancel-project" onClick = {cancelProject}>Encerrar</button>
                    <button className = "project-closing-btn no-cancel-project"  onClick = {() => props.setStatePass(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default CloseProject;