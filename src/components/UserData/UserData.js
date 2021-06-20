import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/auth";
import "./userdata.css";
import UserSubscriptionCart from "./UserSubscriptionCart";

function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
  const [subscriptions, setSubscriptions] = useState("");
  const { user } = useContext(AuthContext);

  const [pageUser, setPageUser] = useState("");

  useEffect(() => {
    if(user.id === userId) {
      setPageUser(user);
      return
    } else {      
      fetch(`http://localhost:8000/user/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          setPageUser(res);
        })
        .catch((erro) => alert("Não foi possível localizar este usuário."));
    }
    }, [user, userId]);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription?user_id=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch(erro => alert('Não foi possível obter os projetos do usuário.'))
  }, [userId]);

  return (
    <div className="userdata-container">
      {user && (
        <>
          <div className="profile-basic-information">
            <img src={pageUser.img} alt="Foto do usuário" />
            <h1>{pageUser.name}</h1>
            {user.id === pageUser.id &&
            <div className='profileEdition'>
              <span class="material-icons material-icons-outlined">settings</span>
              <span>Editar Perfil</span>
            </div>
            }
          </div>
          <div className="profile-other-data">
            <div className='personal-data'>
              <h2>Dados pessoais</h2>
              <p>
                <span>Data de Nascimento:</span> {pageUser.birth_date}
              </p>
              <p>
                <span>Telefone:</span> {pageUser.phone}
              </p>
              <p>
                <span>Email:</span> {pageUser.email}
              </p>
            </div>
            <div className='projects-data'>
              {user.id === pageUser.id &&
              <h2>Projetos</h2>}
              {subscriptions && user.id === pageUser.id &&
               subscriptions.map((subscription) => (                 
                 <UserSubscriptionCart subscription = {subscription} />
                  ))
                  }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserData;
