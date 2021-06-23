import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import "./ProjectEdition.css";


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

function ProjectEdition(props) {

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
            props.project
        ,
        validate: function (values) {

          const errors = {};
    
          if ((values.title.length < 3) | (values.title.length > 100)) {
            errors.title = "Nome Invalido";
          }
    
          if ((values.description.length < 5) | (values.description.length > 100)) {
            errors.description = "Texto invalido";
          }
    
    
          return errors;
        },
      });

      //saving information
      const handleSave = () => {
        fetch(`http://localhost:8000/projects/${props.project.id}`, 
        {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formik.values)
        })
      .then((res) => res.json())
      .then((res) => {
        props.setStateProject(res);
        props.setStatePass(false);
      })
      .catch((erro) =>
        alert("Não foi possível atualizar.")
      );

      }

    return (

        <div className = "project-edition-container project-set-vis">
            <div ref = {windowRef} className = "project-edition-window">
                <div className = "project-edition-window-header">
                <h3>Editar informações</h3>
                <FontAwesomeIcon className = "project-edition-close-btn" icon = {faTimes} onClick = {() => props.setStatePass(false)}/>
                </div>

                  <div className = "project-edition-window-body">
                    
                  <div className="inputs">
                      <label htmlFor="title">Nome do projeto</label>
                      <input
                        type="text"
                        name="title"
                        id="project-title"
                        className = "aplication-form-fields"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        minLength="3"
                        maxLength="100"
                        required
                      />
                      {formik.touched.title && formik.errors.title && (
                        <span className="formikError">{formik.errors.title}</span>
                      )}
                    </div>
                    
                    <div className = "manage-project-img-edit">
                      <img className = "manage-project-img project-edit-img" src = {props.project.img} />

                      <div className="inputs">
                        <label htmlFor="img">Imagem</label>
                        <input
                          type="site"
                          name="img"
                          id="img"
                          className = "aplication-form-fields"
                          value={formik.values.img}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          minLength="3"
                          maxLength="100"
                          required
                        />
                        {formik.touched.img && formik.errors.img && (
                          <span className="formikError">{formik.errors.img}</span>
                        )}
                      </div>
                    </div>

                    <div className="inputs">
                      <label htmlFor="description">Descrição do projeto</label>
                      <textarea
                        type="text"
                        name="title"
                        id="description"
                        className = "aplication-form-fields"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="6"
                        cols="50"
                        minLength="3"
                        maxLength="180"
                        required
                      />
                      {formik.touched.description && formik.errors.description && (
                        <span className="formikError">{formik.errors.description}</span>
                      )}
                    </div>



                  </div>
                
                <div className = "project-first-edition-window-footer">
                    <button className = "project-edition-save" onClick = {handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    )

}

export default ProjectEdition;