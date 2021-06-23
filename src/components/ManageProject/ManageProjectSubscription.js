import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./ManageProjectSubscription.css"


function ManageProjectSubscription({subscription}) {

    const [user, setUser] = useState();

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


    return(
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
                    <span className = {`manage-project-subscription-bullet-point ${subscription.subscription_status == "Aceita" ? "bullet-green" : "bullet-grey"}`}></span>
                    <p>{subscription.subscription_status}</p>
                </div>

                <button className = "manage-project-subscription-change-status">
                    <span>Alterar status</span>
                </button>

            </div>
        </div>
    )
}

export default ManageProjectSubscription;