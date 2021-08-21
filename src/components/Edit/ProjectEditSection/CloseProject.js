import { useEffect, useRef } from "react";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast, { Toaster } from 'react-hot-toast';

import "./CloseProject.css";
import api from "../../../services/api";
import axios from "axios";

function CloseProject(props) {
    console.log(props)

    async function cancelProject () {
              //saving information
        api({      
            method: "PATCH",
            url: `/project/${props.project.id}`,
            headers: { "Content-type": "application/json" },
            data: {...props.project, "status":2} 
        })
      .then((res) => props.setStateProject(res.data))


          let cancelSubscriptions = (props.subscriptions.filter((subscription) => subscription.status == "Pendente")
      .map( (subscription) => {
        
           return( api({      
                method: "PATCH",
                url: `/subscription/${subscription.id}`,
                headers: { "Content-type": "application/json" },
                data: {...subscription, "status":"Recusada"} 
            }))

      }))

      await axios.all(cancelSubscriptions)
      .then(
          res => {
              api.get(`/subscription?project_id=${props.project.id}`)
              .then(res => {
                  toast.success("Vaga cancelada com sucesso.")
                  props.setStateSubscriptions(res.data)
                  props.setStatePass(false)
              })
              
          }
          )

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

    return(
        <>
        <div> <Toaster /></div>
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
        </>
    )
}

export default CloseProject;