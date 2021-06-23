import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import "./ManageProjectComponent.css";

import { faEye, faPen, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageProjectSubscription from "./ManageProjectSubscription";

function ManageProjectComponent({projectId}) {
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState();
  const [subscriptons, setSubscriptions] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/projects/${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setProject(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter dados desse projeto.")
      );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription/?project_id=${projectId}`)
    .then((res) => res.json())
    .then((res) => {
      setSubscriptions(res);
    })
    .catch((erro) =>
      alert("Não foi possível obter inscrições.")
    )

},[])


  return (
    <div className = "manage-project-page">
        {project && project.institution_id == user.institution_id &&
        
        <div className = "manage-project-container">
          <div className = "manage-project-header">
            
            <div className = "manage-project-img-information">
              <img className = "manage-project-img" src = {project.img} />
              <div className = "manage-project-information">
                <h3>{project.title}</h3>
                <div className = "manage-project-subscriptions">
                  <span className = {`manage-projects-card-bullet-point ${project.status == 1 ? "bullet-green" : "bullet-grey"}`}></span>
                  <p>{project.status == 1 ? "Aberto" : "Encerrado"}</p>
                </div>
                <p>{project.description}</p>
              </div>
            </div>

            <div className = "manage-project-setting-buttons">

              <NavLink className = "manage-project-button view-project" to = {`/project/${project.id}`}>
                <FontAwesomeIcon icon = {faEye} />
                <span>Visualizar</span>
              </NavLink>

              <button className = "manage-project-button view-project">
                <FontAwesomeIcon icon = {faPen} />
                <span>Editar</span>
              </button>

              <button className = "manage-project-button delete-project">
                <FontAwesomeIcon icon = {faBan} />
                <span>Encerrar</span>
              </button>

            </div>

          </div> 
          
          {subscriptons && subscriptons.map(subscription => <ManageProjectSubscription subscription = {subscription} />)
        }

        </div>
        }
    </div>
  )
}


export default ManageProjectComponent;