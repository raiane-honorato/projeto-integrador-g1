import toast, { Toaster } from 'react-hot-toast';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useRef } from "react";
import './cancelUserSubscription.css';
import api from './../../../services/api';

function CancelUserSubscription({setSubscriptions, subscriptions, subscription, setCancelSubscription}) {

     //dealing with outside click to close the component
  let windowRef = useRef();

  const cancelSubscription = () => {
   
    api({
      method: "PATCH",
      url: `/subscription/${subscription.id}`, 
      headers: { "Content-type": "application/json" },    
      data: {status: "Cancelada"}
    })
    .then((res) => {
      console.log("data" + res.data)     
      setSubscriptions(res.data);
      setCancelSubscription(false);
    })
    .then(() => toast.success("Inscrição cancelada com sucesso."))
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