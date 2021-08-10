import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./userdata.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import CancelUserSubscription from "../Edit/ProfileEditionSection/CancelUserSubscription";


function UserSubscriptionCart({subscription, subscriptions, setSubscriptions}) {

    const [cancelSubscription,setCancelSubscription] = useState(false);

    return(
        <div className='project-data-details'  key={subscription.id}>
          <div>{subscription && 
            <Fragment key={subscription.id}>
              <h3>{subscription.project.title} em {
              subscription.project.institution.name 
              }</h3>                           
            </Fragment>
          }</div>
          <div className="subscription-situation">
            <p className={(subscription.status === 'Aceita') ? 'greenCard' : 'redCard'}>Situação da inscrição: {subscription.status}</p>
            {
                subscription.status === 'Aceita' &&
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