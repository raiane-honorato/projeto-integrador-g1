import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";
import "./InstitutionFirstEdition.css"

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

function InstitutionFirstEdition(props) {

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
        initialValues: {
          ongName: props.institution.institution_name,
          resumo: props.institution.summary,
          city: props.institution.city,
          state: props.institution.state,
          causas: props.causes
        },
        validate: function (values) {

          const errors = {};
    
          if ((values.ongName.length < 3) | (values.ongName.length > 100)) {
            errors.ongName = "Nome Invalido";
          }
    
          if ((values.resumo.length < 5) | (values.resumo.length > 100)) {
            errors.resumo = "Texto invalido";
          }
    
          if ((values.city.length < 3) | (values.city.length > 150)) {
            errors.endereco = "Endereço invalido";
          }

          if (values.causas.length < 3) {
            errors.causas = "Causa invalida";
          }
    
          return errors;
        },
      });

      //saving information
      const handleSave = () => {
        const institution_name = formik.values.ongName;
        const institution_summary = formik.values.resumo;
        console.log(institution_name)
        fetch(`http://localhost:8000/institution/${props.institution.id}`, 
        {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "institution_name":institution_name,
                "summary":institution_summary
            })
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
                <div className = "institution-first-edition-window-body">
                    
                    <div className="inputs">
                        <label htmlFor="nomeOng">Nome da instituição</label>
                        <input
                            type="text"
                            name="ongName"
                            id="ongName"
                            value={formik.values.ongName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            minLength="3"
                            maxLength="100"
                            required
                        />
                        {formik.touched.ongName && formik.errors.ongName && (
                            <span className="formikError">{formik.errors.ongName}</span>
                        )}
                    </div>

                    <div className="inputs">
                        <label htmlFor="resumo">Resumo da instituição</label>
                        <textarea
                            name="resumo"
                            id="resumo"
                            rows="3"
                            cols="50"
                            minLength="10"
                            maxLength="180"
                            value={formik.values.resumo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                        />
                        {formik.touched.resumo && formik.errors.resumo && (
                            <span className="formikError">{formik.errors.resumo}</span>
                        )}
                    </div>


                </div>
                <div className = "institution-first-edition-window-footer">
                    <button className = "institution-edition-save" onClick = {handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    )

}

export default InstitutionFirstEdition;