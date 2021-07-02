import toast, { Toaster } from 'react-hot-toast';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useEffect, useRef, useState } from "react";
import './cancelUserSubscription.css';

function CancelUserSubscription({setSubscriptions, subscriptions, subscription, setCancelSubscription}) {

    //dealing with outside click to close the component
  let windowRef = useRef();

  const subsIndex = subscriptions.findIndex((element) => element.id === subscription.id )
  let subsArray = [...subscriptions]

  const cancelSubscription = () => {
   
      fetch(`http://localhost:8000/subscription/${subscription.id}`, 
    {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({"subscription_status": "Cancelada"})
    })
    .then((res) => res.json())
    .then((res) => {
      subsArray[subsIndex] = res;
      setSubscriptions(subsArray);
      setCancelSubscription(false);
    })
    .then((res) => toast.success("Inscrição cancelada com sucesso."))
    .catch((erro) =>
      alert("Não foi possível atualizar.")
    );
  }

  return (
    <>
        <div><Toaster /></div>
        <div className = "subscription-closing-container subscription-set-vis">
            <div ref = {windowRef} className = "subscription-closing-window">
                <div className = "subscription-closing-window-header">
                <h3>Cancelar a inscrição</h3>
                <FontAwesomeIcon className = "subscription-closing-close-btn" icon = {faTimes} onClick = {() => setCancelSubscription(false)}/>
                </div>

                  <div className = "project-subscription-window-body">
                    
                    <p>
                        Tem certeza que deseja cancelar a inscrição no projeto?
                    </p>

                  </div>
                
                <div className = "subscription-first-closing-window-footer">
                    <button className = "subscription-closing-btn cancel-subscription" onClick={cancelSubscription}>Sim</button>
                    <button className = "subscription-closing-btn no-cancel-subscription"  onClick = {() => setCancelSubscription(false)}>Não</button>
                </div>
            </div>
        </div>
        </>
  )
}

export default CancelUserSubscription;