import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import "./InstitutionEdition.css"
import InstitutionFirstEditionBody from "./InstitutionFirstEditionBody";
import InstitutionSecondEditionBody from "./InstitutionSecondEditionBody";
import InstitutionThirdEditionBody from "./InstitutionThirdEditionBody";

//form function
function useFormik({ initialValues, validate }) {
    const [touched, setTouchedFields] = useState({});
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialValues);
  
    useEffect(() => {
      validateValues(values);
    }, [values]);
  
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
    };
  }

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
    
          if ((values.institution_name.length < 3) | (values.institution_name.length > 100)) {
            errors.institution_name = "Nome Invalido";
          }
    
          if ((values.summary.length < 5) | (values.summary.length > 100)) {
            errors.summary = "Texto invalido";
          }
    
          if ((values.city.length < 3) | (values.city.length > 150)) {
            errors.city = "Endereço invalido";
          }

        //   if (values.causes.length < 3) {
        //     errors.causes = "Causa invalida";
        //   }
    
          return errors;
        },
      });

      //saving information
      const handleSave = () => {
        fetch(`http://localhost:8000/institution/${props.institution.id}`, 
        {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formik.values)
        })
      .then((res) => res.json())
      .then((res) => {
        props.setStateInstitution(res);
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

                {props.firstEditState && <InstitutionFirstEditionBody formik = {formik}/>}
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