
import { useEffect, useState } from "react";

import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ManageProjectsCard.css"
import { NavLink } from "react-router-dom";
import api from "../../../services/api";

function ManageProjectsCart({project}) {

    const [subscriptions, setSubscriptions] = useState();

    useEffect(() => {
        api.get(`/subscription/?project_id=${project.id}`)
        .then((res) => {
          setSubscriptions(res.data);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[project.id])




    return(
        <div className = "manage-projects-card-container">

            <div className = "manage-projects-card-img-title">
                <img src = {project.img} className = "manage-projects-card-img" alt="Imagem do projeto"></img>
                <p>{project.title}</p>
            </div>

            <div className = "manage-projects-card-subscriptions-status-manage-btn">
                
                <div className = "manage-projects-card-subscriptions">
                {subscriptions && <>
                    <p className = "manage-projects-card-subscriptions-p1"><b>{`${subscriptions.length}`}</b></p> 
                    <p className = "manage-projects-card-subscriptions-p2">inscritos</p></>
                }
                </div>
                
                <div className = "manage-projects-card-subscriptions">
                    <span className = {`manage-projects-card-bullet-point ${project.status === 1 ? "bullet-green" : "bullet-grey"}`}></span>
                    <p>{project.status === 1 ? "Aberto" : "Encerrado"}</p>
                </div>
                <NavLink className = "manage-projects-cart-button" to = {`/manage_project/${project.id}`}>
                    <FontAwesomeIcon icon = {faCog} />
                    <span>Gerenciar</span>
                </NavLink>

            </div>
        </div>
        
    )
}

export default ManageProjectsCart;