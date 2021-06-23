import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/auth";
import "./userdata.css";
import UserSubscriptionCart from "./UserSubscriptionCart";
import EditButton from "../Edit/EditButton";
import ProfileEditionSection from "../Edit/ProfileEditionSection/ProfileEditionSection";

function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
  const [subscriptions, setSubscriptions] = useState("");
  const { user } = useContext(AuthContext);

  const [pageUser, setPageUser] = useState("");

  //states of content edition
  const [firstEditState, setFirstEditState] = useState(false);
  const [secondEditState, setSecondEditState] = useState(false);
  const [thirdEditState, setThirdEditState] = useState(false);

  useEffect(() => {
    if (user.id === userId) {
      setPageUser(user);
      return;
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
      .catch((erro) => alert("Não foi possível obter os projetos do usuário."));
  }, [userId]);

  return (
    <>
    <div className="userdata-container">
      {user && (
        <>
          <div className="profile-basic-information">
            <img src={pageUser.img} alt="Foto do usuário" />
            <h1>{pageUser.name}</h1>
            {user.id === pageUser.id && (
              <>
              <div className="profileEdition">
                <EditButton
                  editClass="user-first-edit"
                  setStatePass={setThirdEditState}
                />
                <span>Causas e Habilidades</span>
              </div>
              <div className="profileEdition">
              <EditButton
                editClass="user-first-edit"
                setStatePass={setSecondEditState}
              />
              <span>Inserir Endereço</span>
            </div>
            </>
            )}
          </div>
          <div className="profile-other-data">
            <div className="personal-data">
              <div className="first-edition-box">
                <h2>Dados pessoais</h2>
                {user.id === pageUser.id && (
                  <EditButton
                    editClass="user-first-edit"
                    setStatePass={setFirstEditState}
                  />
                )}
              </div>
              <div className='section-personal-data'>

              <div className="first-section-personal-data">
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
              <div className="second-section-personal-data">
                <p>
                  <span>Rua:</span> {pageUser.rua}
                </p>
                <p>
                  <span>Número:</span> {pageUser.numero}
                </p>
                <p>
                  <span>Bairro:</span> {pageUser.bairro}
                </p>
                <p>
                  <span>Cidade:</span> {pageUser.cidade}
                </p>
                <p>
                  <span>Estado:</span> {pageUser.estado}
                </p>
              </div>
              </div>
            </div>
            <div className="projects-data">
              {user.id === pageUser.id && <h2>Projetos</h2>}
              {subscriptions &&
                user.id === pageUser.id &&
                subscriptions.map((subscription) => (
                  <UserSubscriptionCart subscription={subscription} />
                ))}
            </div>
          </div>
        </>
      )}

      {(firstEditState || secondEditState || thirdEditState) && (
        <ProfileEditionSection
          firstEditState={firstEditState}
          secondEditState={secondEditState}
          thirdEditState={thirdEditState}
          setStatePass={
            firstEditState
              ? setFirstEditState
              : secondEditState
              ? setSecondEditState
              : thirdEditState
              ? setThirdEditState
              : ""
          }
          setPageUser={setPageUser}
          pageUser={pageUser}
        />
      )}


    </div>

      <div
        className={`user-overlay ${firstEditState || secondEditState ? "user-set-vis" : ""
          }`}
        onClick={() => {
          setFirstEditState(false);
          setSecondEditState(false);
        }}
      >
        {" "}
      </div>
</>
  );
}

export default UserData;
