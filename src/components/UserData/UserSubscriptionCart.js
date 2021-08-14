import React, { useState } from "react";
import { Fragment } from "react";
import "./userdata.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import CancelUserSubscription from "../Edit/ProfileEditionSection/CancelUserSubscription";
import { useEffect } from "react";
import api from "../../services/api";

function UserSubscriptionCart({
  subscriptionId,
  subscriptions,
  setSubscriptions,
}) {
  const [cancelSubscription, setCancelSubscription] = useState(false);
  const [subscription, setSubscription] = useState();

  useEffect(() => {
    api.get(`/subscription/${subscriptionId}`)
    .then(res => setSubscription(res.data))
    .catch(erro => alert("Não foi possível localizar esta inscrição."))
  },[subscriptionId])

  return (
    <div className="project-data-details">
      <div>
        {subscription && (
          <Fragment key={subscription.id}>
            <h3>
              {subscription.project.title} em{" "}
              {subscription.project.institution.name}
            </h3>
          </Fragment>
        )}
      </div>
      <div className="subscription-situation">
        <p
          className={subscription?.status === "Aceita" ? "greenCard" : "redCard"}
        >
          Situação da inscrição: {subscription?.status}
        </p>
        {subscription?.status === "Aceita" && (
          <button
            className="user-subscription-btn"
            onClick={() => {
              setCancelSubscription(true);
            }}
          >
            <FontAwesomeIcon icon={faBan} />
            <span>Cancelar inscrição</span>
          </button>
        )}
      </div>
      <div
        className={`institution-overlay ${
          cancelSubscription ? "institution-set-vis" : ""
        }`}
        onClick={() => {
          setCancelSubscription(false);
        }}
      >
        {" "}
      </div>

      {cancelSubscription && (
        <CancelUserSubscription
          subscription={subscription}
          setSubscription={setSubscription}
          subscriptions={subscriptions}
          setSubscriptions={setSubscriptions}
          setCancelSubscription={setCancelSubscription}
        />
      )}
    </div>
  );
}

export default UserSubscriptionCart;
