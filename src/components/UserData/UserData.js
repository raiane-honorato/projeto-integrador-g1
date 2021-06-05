import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./userdata.css";

function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
  const [user, setUser] = useState("");
  const [subscriptions, setSubscriptions] = useState("");

  console.log(subscriptions)

  useEffect(() => {
    fetch(`http://localhost:8000/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((erro) => alert("Não foi possível localizar este usuário."));
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      setSubscriptions(res)
      console.log(subscriptions)
    })
  }, [userId]);

  return (
    <div className="userdata-container">
      {user && (
        <>
          <div className="profile-basic-information">
            <img src={user.img} alt="Foto do usuário" />
            <h1>{user.name}</h1>
          </div>
          <div className="profile-other-data">
            <div>
              <h2>Dados pessoais</h2>
              <p>
                <span>Data de Nascimento:</span> {user.birth_date}
              </p>
              <p>
                <span>Telefone:</span> {user.phone}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
            </div>
          </div>          
        </>
      )}
      <div>
        {subscriptions && (
          <h2>oiiii</h2>
        )}
      </div>
      
    </div>
  );
}

export default UserData;
