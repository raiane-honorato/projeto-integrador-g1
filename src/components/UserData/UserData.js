import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/auth";
import "./userdata.css";

function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
  const [subscriptions, setSubscriptions] = useState("");
  const [projects, setProjects] = useState("");
  const { user, setUser } = useContext(AuthContext);


  useEffect(() => {
    fetch(`http://localhost:8000/user/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((erro) => alert("Não foi possível localizar este usuário."));
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription?user_id=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch(erro => alert('Não foi possível obter os projetos do usuário.'))
  }, [userId]);

  useEffect(() => {
    
      fetch(`http://localhost:8000/projects`)
    .then((res) => res.json())
    .then((res) => {
      setProjects(res);
    })
    .catch(erro => alert('Não foi possível obter os detalhes dos projetos do usuário.'))
  },[])

  return (
    <div className="userdata-container">
      {user && (
        <>
          <div className="profile-basic-information">
            <img src={user.img} alt="Foto do usuário" />
            <h1>{user.name}</h1>
          </div>
          <div className="profile-other-data">
            <div className='personal-data'>
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
            <div className='projects-data'>
              <h2>Projetos</h2>
              {subscriptions &&
               subscriptions.map((subscription) => (
                      <div className='project-data-details'  key={subscription.id}>
                        <div>{projects && projects.filter((project) => project.id === subscription.id)
                        .map((project) => (
                          <Fragment key={project.id}>
                            <h3>{project.title} em {project.institution_name}</h3>                           
                          </Fragment>
                        ))}</div>
                         <p className={(subscription.subscription_status === 'Aceita') ? 'greenCard' : 'redCard'}>Situação da inscrição: {subscription.subscription_status}</p>
                      </div>
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserData;
