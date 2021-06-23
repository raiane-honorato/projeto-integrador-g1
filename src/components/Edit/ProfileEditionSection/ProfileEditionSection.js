import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import "./profileEditionSection.css";
import UserFirstEditionBody from "./UserFirstEditionBody";
import UserSecondEditionBody from "./UserSecondEditionBody";
import UserThirdEditionBody from './UserThirdEditionBody';

import { faTimes } from "@fortawesome/free-solid-svg-icons";

function useFormik({ initialValues, validate }) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [cep, setCep] = useState('');

  useEffect(() => {
    validateValues(values);
  }, [values]);

  useEffect(() => {
    if (cep.length > 7)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((response) => setValues({
        ...values,
        rua: response.logradouro,
        bairro: response.bairro,
        cidade: response.localidade,
        estado: response.uf
      }))
      .catch((error) => console.log(`Não foi possível obter o endereço do CEP informado! Erro:${error}`));

  }, [cep]);

  function searchingData(e) {
    setCep(e.target.value);
  }  

  function fillingForm({ target }) {
    const {id, value} = target;
    setValues({...values, [id]: value})
  }

  function handleChange(event) {
    const fieldName = event.target.getAttribute("name");
    const value = event.target.value;

    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleBlur(event) {
    const fieldName = event.target.getAttribute("name");
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    });
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
    cep,
    searchingData,
    fillingForm
  };
}

function ProfileEditionSection(props) {
  //dealing with outside click to close the component
  let windowRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!windowRef.current.contains(event.target)) {
        props.setStatePass(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const formik = useFormik({
    initialValues: props.pageUser,
    validate: function (values) {
      const errors = {};

      if ((values.name.length < 3) | (values.name.length > 100)) {
        errors.name = "Nome Invalido";
      }

      if (values.CPF.length < 11) {
        errors.CPF = "CPF invalido";
      }

      if (values.birth_date.length === undefined) {
        errors.birth_date = "Data invalida";
      }

      if ((values.phone.length < 10) | (values.phone.length > 11)) {
        errors.phone = "Telefone invalido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7)) {
        errors.email = "Email inválido";
      }

      return errors;
    },
  });

  //saving information
  const handleSave = () => {
    fetch(`http://localhost:8000/user/${props.pageUser.id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formik.values),
    })
      .then((res) => res.json())
      .then((res) => {
        props.setPageUser(res);
        props.setStatePass(false);
        alert("Usuário atualizado.")
      })
      .catch((erro) => alert("Não foi possível atualizar."));
  };

  return (
    <div className="user-edition-container user-set-vis">
      <div ref={windowRef} className="user-first-edition-window">
        <div className="user-first-edition-window-header">
          <h3>Editar informações</h3>
          <FontAwesomeIcon
            className="institution-edition-close-btn"
            icon={faTimes}
            onClick={() => props.setStatePass(false)}
          />
        </div>

        {props.firstEditState && <UserFirstEditionBody formik={formik} />}
        {props.secondEditState && <UserSecondEditionBody formik={formik} />}
        {props.thirdEditState && <UserThirdEditionBody formik={formik} />}

        <div className="user-first-edition-window-footer">
          <button className="user-edition-save" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditionSection;
