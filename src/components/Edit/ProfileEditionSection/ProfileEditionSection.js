import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useCallback } from "react";
import "./profileEditionSection.css";
import UserFirstEditionBody from "./UserFirstEditionBody";
import UserSecondEditionBody from "./UserSecondEditionBody";
import UserThirdEditionBody from "./UserThirdEditionBody";
import toast from "react-hot-toast";
import api from "../../../services/api";
import { useFormik } from "formik";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ShortLoader from "../../Loader/ShortLoader";


function ProfileEditionSection(props) {
  const [loading, setLoading] = useState(false);

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
        errors.name = "Nome inválido";
      }

      if (values.cpf.length < 11) {
        errors.cpf = "CPF inválido";
      }

      if (values.birth_date.length === undefined) {
        errors.birth_date = "Data inválida";
      }

      if ((values.phone.length < 10) | (values.phone.length > 11)) {
        errors.phone = "Telefone inválido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7)) {
        errors.email = "Email inválido";
      }

      return errors;
    },
  });

  //saving information
  const handleSave = () => {
    setLoading(true);
    if (formik.values.address) {
      api({
        method: "PATCH",
        url: `/address/${props.pageUser.address.id}`,
        headers: { "Content-type": "application/json" },
        data: formik.values.address,
      })
        .then((res) => {
          return api({
            method: "PATCH",
            url: `/user/${props.pageUser.id}`,
            headers: { "Content-type": "application/json" },
            data: formik.values,
          });
        })
        .then((res) => {
          props.setCauses(res.data.causes);
          props.setHabilities(res.data.habilities);
          props.setPageUser(res.data);
          props.setStatePass(false);
          setLoading(false);
          toast.success("Usuário atualizado.", { position: "top-right" });
        })
        .catch((erro) =>
          toast.error("Não foi possível atualizar os dados do usuário.")
        );
    } else {
      api({
        method: "PATCH",
        url: `/user/${props.pageUser.id}`,
        headers: { "Content-type": "application/json" },
        data: formik.values,
      })
        .then((res) => {
          props.setCauses(res.data.causes);
          props.setHabilities(res.data.habilities);
          props.setPageUser(res.data);
          props.setStatePass(false);
          setLoading(false);
          toast.success("Usuário atualizado.", { position: "top-right" });
        })
        .catch((erro) =>
          toast.error("Não foi possível atualizar os dados do usuário.")
        );
    }
  }; 


  const handleSaveCreatingAddress = () => {
    setLoading(true);
    if (formik.values.address) {
      api({
        method: "POST",
        url: `/address`,
        headers: { "Content-type": "application/json" },
        data: formik.values.address,
      })
        .then((res) => {
          return api({
            method: "PATCH",
            url: `/user/${props.pageUser.id}`,
            headers: { "Content-type": "application/json" },
            data: {
              ...formik.values,
              address: res.data              
            },
          });
        })
        .then((res) => {
          props.setCauses(res.data.causes);
          props.setHabilities(res.data.habilities);
          props.setPageUser(res.data);
          props.setStatePass(false);
          setLoading(false);
          toast.success("Usuário atualizado.", { position: "top-right" });
        })
        .catch((erro) =>
          toast.error("Não foi possível atualizar os dados do usuário.")
        )
    } else {
      api({
        method: "PATCH",
        url: `/user/${props.pageUser.id}`,
        headers: { "Content-type": "application/json" },
        data: formik.values,
      })
        .then((res) => {
          props.setCauses(res.data.causes);
          props.setHabilities(res.data.habilities);
          props.setPageUser(res.data);
          props.setStatePass(false);
          setLoading(false);
          toast.success("Usuário atualizado.", { position: "top-right" });
        })
        .catch((erro) =>
          toast.error("Não foi possível atualizar os dados do usuário.")
        );
    }
  }

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
          <button className="user-edition-save" onClick={props.pageUser.address ? handleSave : handleSaveCreatingAddress}>
            Salvar
          </button>
          {loading && <ShortLoader />}
        </div>
      </div>
    </div>
  );
}

export default ProfileEditionSection;
