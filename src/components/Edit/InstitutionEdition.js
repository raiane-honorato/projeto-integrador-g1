import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import "./InstitutionEdition.css";
import InstitutionFirstEditionBody from "./InstitutionFirstEditionBody";
import InstitutionSecondEditionBody from "./InstitutionSecondEditionBody";
import InstitutionThirdEditionBody from "./InstitutionThirdEditionBody";
import api from "../../services/api";

function InstitutionEdition(props) {

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                    props.setStatePass(false)}
                }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    //setting the form
    const formik = useFormik({
        initialValues: 
            props.institution
        ,
        validate: function (values) {

          const errors = {};
    
          if ((values.name.length < 3) | (values.name.length > 100)) {
            errors.institution_name = "Nome Invalido";
          }
    
          if ((values.summary.length < 5) | (values.summary.length > 100)) {
            errors.summary = "Texto invalido";
          }
    
          if ((values.address.city.length < 3) | (values.address.city.length > 150)) {
            errors.city = "Endereço invalido";
          }
    
          return errors;
        },
      });

      //saving information
      const handleSave = () => {
        console.log("formik")
        console.log(formik.values)
        api({      
          method: "PATCH",
          url: `/address/${props.institution.address.id}`,
          headers: { "Content-type": "application/json" },
          data: formik.values.address  
        })
        .then((res) => {
          return(api({      
          method: "PATCH",
          url: `/institution/${props.institution.id}`,
          headers: { "Content-type": "application/json" },
          data: formik.values  })
        )}
        )
            .then((res) => {
        props.setStateInstitution(res.data);
        props.setStatePass(false);
      })  
          .catch((erro) =>
        alert("Não foi possível atualizar.")
      );

      }

    return (

        <div className = "institution-edition-container institution-set-vis">
            <div ref = {windowRef} className = "institution-first-edition-window">
                <div className = "institution-first-edition-window-header">
                <h3>Editar informações</h3>
                <FontAwesomeIcon className = "institution-edition-close-btn" icon = {faTimes} onClick = {() => props.setStatePass(false)}/>
                </div>

                {props.firstEditState && <InstitutionFirstEditionBody formik = {formik} institution = {props.institution}/>}
                {props.secondEditState && <InstitutionSecondEditionBody formik = {formik}/>}
                {props.thirdEditState && <InstitutionThirdEditionBody formik = {formik}/>}
                
                <div className = "institution-first-edition-window-footer">
                    <button className = "institution-edition-save" onClick = {handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    )

}

export default InstitutionEdition;