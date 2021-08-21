import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import moment from "moment";

import "./ManageProjectSubscription.css"
import api from "../../services/api";


function ManageProjectSubscription({subscription, project, setStateSubscriptions}) {

    const [user, setUser] = useState();
    const [changeStatus, setChangeStatus] = useState(false);
    

    useEffect(() => {
        subscription && setUser(subscription.user);
    },[subscription])

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                    setChangeStatus(false)}
                }
        changeStatus && document.addEventListener("mousedown", handler);

        return () => {
            changeStatus && document.removeEventListener("mousedown", handler)
        }
    },[changeStatus])

    const changeSubscription = (status) => {
        api({      
            method: "PATCH",
            url: `/subscription/${subscription.id}`,
            headers: { "Content-type": "application/json" },
            data: {...subscription, "status":status} 
          })
      .then((res) => {
        return(api.get(`/subscription?project_id=${project.id}`))})
        .then(res => {
            setStateSubscriptions(res.data);
            setChangeStatus(false);
        })
      
      .then((res) => toast.success("Inscrição atualizada com sucesso."))
      .catch((erro) =>
        alert("Não foi possível atualizar.")
      );
    }

    return(
        <>
        <div className = "manage-project-toast"><Toaster /></div>
        {subscription &&
        <div className = "manage-project-subscription-container">
            {user &&            
            <div className = "manage-project-subscription-img-title">
                <img src = {user.img} className = "manage-project-subscription-img" alt="Foto do usuário"></img>
                <div className = "manage-project-substription-name-email-phone">
                    <NavLink to = {`/user/${user.id}`}>{user.name}</NavLink>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            </div>}

            <div className = "manage-project-subscription-date-status-manage-btn">
                
                <p className = "manage-project-subscription-date"><b>{`${subscription && moment(new Date(subscription.date)).format("DD/MM/YYYY")}`}</b></p> 

                <div className = "manage-project-subscription-status">
                    <span 
                    className = {`manage-project-subscription-bullet-point 
                    ${subscription.status === "Aceita" ?  "bullet-green" : 
                    subscription.status === "Pendente" ?  "bullet-yellow" : 
                    subscription.status === "Cancelada" ?  "bullet-grey" : 
                    "bullet-red"
                    }`}>

                    </span>
                    <p>{subscription.status}</p>
                </div>

               {project.status === 1 &&
                <div  ref = {windowRef} className = "manage-project-subscription-change-status">
                    <button 
                     
                    className = {`manage-project-subscription-change-status-btn ${subscription.status === "Cancelada" ? " canceled-change-status":""}`}
                    onClick = {subscription.status !== "Cancelada" ? () =>  setChangeStatus(!changeStatus)  :""}>
                        <span>Alterar status</span>
                    </button>

                    {changeStatus &&
                    <div  className = "manage-project-subscription-change-status-dropdown">
                        <ul className="manage-project-subscription-change-status-dropdown-list">
                            <li className="manage-project-subscription-change-status-dropdown-btn" onClick = {() => changeSubscription("Aceita")}>
                                Aceitar inscrição
                            </li>
                            <li className="manage-project-subscription-change-status-dropdown-btn"  onClick = {() => changeSubscription("Recusada")}>
                                Recusar inscrição
                            </li>
                        </ul>
                    </div>}

                </div>
                }

            </div>
        </div>}
        </>
    )
}

export default ManageProjectSubscription;