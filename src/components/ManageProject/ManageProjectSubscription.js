import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import "./ManageProjectSubscription.css"


function ManageProjectSubscription({subscription, subscriptions, project, setStateSubscriptions}) {

    const [user, setUser] = useState();
    const [changeStatus, setChangeStatus] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/user/?id=${subscription.user_id}`)
        .then((res) => res.json())
        .then((res) => {
            setUser(res[0]);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])

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


    //change subscription funcion

    const subsIndex = subscriptions.findIndex((element) => element.id == subscription.id )
    let subsArray = [...subscriptions]

    const changeSubscription = (status) => {
        fetch(`http://localhost:8000/subscription/${subscription.id}`, 
        {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(
                {
                    "subscription_status":status
                }
            )
        })
      .then((res) => res.json())
      .then((res) => {
        subsArray[subsIndex] = res;
        setStateSubscriptions(subsArray);
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
        <div className = "manage-project-subscription-container">
            {user &&            
            <div className = "manage-project-subscription-img-title">
                <img src = {user.img} className = "manage-project-subscription-img"></img>
                <div className = "manage-project-substription-name-email-phone">
                    <NavLink to = {`/user/${user.id}`}>{user.name}</NavLink>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            </div>}

            <div className = "manage-project-subscription-date-status-manage-btn">
                
                <p className = "manage-project-subscription-date"><b>{subscription.subs_date}</b></p> 

                <div className = "manage-project-subscription-status">
                    <span 
                    className = {`manage-project-subscription-bullet-point 
                    ${subscription.subscription_status == "Aceita" ?  "bullet-green" : 
                    subscription.subscription_status == "Pendente" ?  "bullet-yellow" : 
                    subscription.subscription_status == "Cancelada" ?  "bullet-grey" : 
                    "bullet-red"
                    }`}>

                    </span>
                    <p>{subscription.subscription_status}</p>
                </div>

               {project.status == 1 &&
                <div  ref = {windowRef} className = "manage-project-subscription-change-status">
                    <button 
                     
                    className = {`manage-project-subscription-change-status-btn ${subscription.subscription_status == "Cancelada" ? " canceled-change-status":""}`}
                    onClick = {subscription.subscription_status != "Cancelada" ? () =>  setChangeStatus(!changeStatus)  :""}>
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
        </div>
        </>
    )
}

export default ManageProjectSubscription;