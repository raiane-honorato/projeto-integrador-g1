import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../context/auth";
import "./profileEditionSection.css";

function UserData() {
  const parameter = useParams();
  const userId = parameter.id;
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
            <form className='profile-edition-form'>
              <div id='personal-data'>
                <div className='input-edit-form'>
                  <label htmlFor='birthEdit'>Data de Nascimento</label>
                  <input type='text' id='birthEdit' name='birthEdit' value={pageUser.birth_date}/>
                </div>

                <div className='input-edit-form'>
                  <label htmlFor='phoneNumberEdit'>Telefone</label>
                  <input type='text' id='phoneNumberEdit' name='phoneNumberEdit' value={pageUser.phone}/>
                </div>

                <div className='input-edit-form'>
                  <label htmlFor='emailEdit'>Email</label>
                  <input type='text' id='emailEdit' name='emailEdit' value={pageUser.email}/>
                </div>
              </div>
              <div id='address'>

              <div className='input-edit-form'>
                <label htmlFor='cepEdit'>Cep</label>
                <input type='text' id='cepEdit' name='cepEdit' />
              </div>

              <div className='input-edit-form'>
                <label htmlFor='ruaEdit'>Rua</label>
                <input type='text' id='ruaEdit' name='ruaEdit' />
              </div>

              <div className='input-edit-form'>
                <label htmlFor='bairroEdit'>Bairro</label>
                <input type='text' id='bairroEdit' name='bairroEdit' />
              </div>

              <div className='input-edit-form'>
                <label htmlFor='cidadeEdit'>Cidade</label>
                <input type='text' id='cidadeEdit' name='cidadeEdit' />
              </div>

              <div className='input-edit-form'>
                <label htmlFor='estadoEdit'>Estado</label>
                <input type='text' id='estadoEdit' name='estadoEdit' />
              </div>

              <button id='editButton' type='submit'>Atualizar</button>

            </div>

            
            </form>           
          </div>
        </>
      )}
    </div>
  );
}

export default UserData;
