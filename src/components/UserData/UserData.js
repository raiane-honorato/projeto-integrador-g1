import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/auth";
import "./userdata.css";
import UserSubscriptionCart from "./UserSubscriptionCart";
import EditButton from "../Edit/EditButton";
import ProfileEditionSection from "../Edit/ProfileEditionSection/ProfileEditionSection";
import { Toaster } from "react-hot-toast";
import api from "../../services/api";
import axios from 'axios';

const CancelToken = axios.CancelToken;


function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
  const [subscriptions, setSubscriptions] = useState("");
  const { user } = useContext(AuthContext);
  const [pageUser, setPageUser] = useState("");
  const [causes, setCauses] = useState();
  const [habilities, setHabilities] = useState();

  const cancelSource = useRef(null);


  //states of content edition
  const [firstEditState, setFirstEditState] = useState(false);
  const [secondEditState, setSecondEditState] = useState(false);
  const [thirdEditState, setThirdEditState] = useState(false);

  useEffect(() => {
   
    if (user.id === userId) {
      setPageUser(user);
      return;
    } else {
      api.get(`/user/${userId}`)
        .then((res) => {
          setPageUser(res.data);
          setCauses(res.data.causes);
          setHabilities(res.data.habilities);
        })
        .catch((erro) => alert("Não foi possível localizar este usuário."));
    }
    return () => {
     
    }
  }, [user, userId, causes, habilities]);


  useEffect(() => { 
    cancelSource.current = CancelToken.source();
       api.get(`/subscription?user_id=${userId}`, {cancelToken: cancelSource.current.token})
      .then((res) => {
        setSubscriptions(res.data);
      })
      .catch((erro) => alert("Não foi possível obter os projetos do usuário."));
      return () => {
        cancelSource.current.cancel();
      }
  }, [userId]);

  return (
    <>
      <div className="userdata-container">
        {user && (
          <>
            <Toaster />
            <div className="profile-basic-information">
              <img src={pageUser.img} alt="Foto do usuário" />
              <h1>{pageUser.name}</h1>
              <div className="causes-section">
                {causes && <span>Causas:</span>}
                {causes?.map((cause) => (
                    <span key={cause.id}>{cause.label}</span>
                  ))}
              </div>

              <div className="habilities-section">
                {habilities && <span>Habilidades:</span>}
                {habilities?.map((hability) => (
                    <span key={hability.id}>{hability.label}</span>
                  ))}
              </div>

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
                <div className="section-personal-data">
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
                      <span>Rua:</span> {pageUser.address?.street}
                    </p>
                    <p>
                      <span>Número:</span> {pageUser.address?.address_number}
                    </p>
                    <p>
                      <span>Bairro:</span> {pageUser.address?.neighborhood}
                    </p>
                    <p>
                      <span>Cidade:</span> {pageUser.address?.city}
                    </p>
                    <p>
                      <span>Estado:</span> {pageUser.address?.state}
                    </p>
                  </div>
                </div>
              </div>
              <div className="projects-data">
                {subscriptions && <h2>Projetos</h2>}
                {subscriptions &&
                  user.id === pageUser.id &&
                  subscriptions.map((subscription) => (
                    <UserSubscriptionCart
                      key={subscription.id}
                      subscriptionId={subscription.id}
                      subscriptions={subscriptions}
                      setSubscriptions={setSubscriptions}
                    />
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
        className={`user-overlay ${
          firstEditState || secondEditState || thirdEditState
            ? "user-set-vis"
            : ""
        }`}
        onClick={() => {
          setFirstEditState(false);
          setSecondEditState(false);
          setThirdEditState(false);
        }}
      >
        {" "}
      </div>
    </>
  );
}

export default UserData;
