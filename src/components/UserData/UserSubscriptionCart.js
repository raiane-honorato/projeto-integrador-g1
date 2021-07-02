import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import "./userdata.css";
import { AuthContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import CancelUserSubscription from "../Edit/ProfileEditionSection/CancelUserSubscription";


function UserSubscriptionCart({subscription, subscriptions, setSubscriptions}) {

    const { user } = useContext(AuthContext);
    const [cancelSubscription,setCancelSubscription] = useState(false);
    
    //getting subscription's project data
    const [project, setProject] = useState();

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${subscription.project_id}`)
          .then((res) => res.json())
          .then((res) => {
            setProject(res);
          })
          .catch(erro => alert('Não foi possível obter os projetos do usuário.'))
      }, [subscription.project_id]);

    //getting project's institution data
    const [institution, setInstitution] = useState();

    useEffect( () => {

        project && 
        fetch(`http://localhost:8000/institution/${project.institution_id}`)
        .then((res) => res.json())
        .then((res) => {setInstitution(res)})
        .catch(erro => alert("Não foi possível obter dados da instituição."))


    },[project]);

    return(
        <div className='project-data-details'  key={subscription.id}>
          <div>{project && institution &&
            <Fragment key={project.id}>
              <h3>{project.title} em {
              institution.institution_name  
              }</h3>                           
            </Fragment>
          }</div>
          <div className="subscription-situation">
            <p className={(subscription.subscription_status === 'Aceita') ? 'greenCard' : 'redCard'}>Situação da inscrição: {subscription.subscription_status}</p>
            {
                subscription.subscription_status === 'Aceita' &&
                <button className="user-subscription-btn" onClick = {() => {setCancelSubscription(true)}}>
                <FontAwesomeIcon icon = {faBan} />
                <span>Cancelar inscrição</span>
              </button>}
          </div>
          <div
        className={`institution-overlay ${
          (cancelSubscription)
            ? "institution-set-vis"
            : ""
        }`}
        onClick={() => {
          setCancelSubscription(false);
        }}
      >
        {" "}
      </div>

        {cancelSubscription && <CancelUserSubscription subscription={subscription} subscriptions={subscriptions}  setSubscriptions={setSubscriptions} setCancelSubscription = {setCancelSubscription} />}
           
        </div>
    )


}

export default UserSubscriptionCart;