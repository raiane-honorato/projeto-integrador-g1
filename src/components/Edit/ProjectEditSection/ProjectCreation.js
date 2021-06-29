import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import { useFormik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import toast, { Toaster } from 'react-hot-toast';
import "./ProjectCreation.css";


//form function
// function useFormik({ initialValues, validate }) {
//     const [touched, setTouchedFields] = useState({});
//     const [errors, setErrors] = useState({});
//     const [values, setValues] = useState(initialValues);
  
//     useEffect(() => {
//       validateValues(values);
//     }, [values]);
  
//     function handleChange(event) {
//       const fieldName = event.target.getAttribute("name");
//       const value = event.target.value;
  
//       setValues({
//         ...values,
//         [fieldName]: value,
//       });
//     }
  
//     function handleBlur(event) {
//       const fieldName = event.target.getAttribute("name");
//       setTouchedFields({
//         ...touched,
//         [fieldName]: true,
//       });
//     }
  
//     function validateValues(values) {
//       setErrors(validate(values));
//     }
  
//     return {
//       values,
//       errors,
//       touched,
//       handleBlur,
//       setErrors,
//       handleChange,
//     };
//   }

function ProjectCreation(props) {

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
        {
        "status": 1,
        "title": "",
        "img": "",
        "local_type": "remoto",
        "institution_id": props.institutionId,
        "description": "",
        "hability_id": [],
        "cause_id": [],
        "popularity": null}
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

      //setting habilities list
      const [habilities, setHabilities] = useState();
      useEffect(() => {
        fetch(`http://localhost:8000/hability`)
        .then((res) => res.json())
        .then((res) => {
            setHabilities(res);
            return res;
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])


    //chosen habilities
    let onChangeHability = (selectedList, selectedItem) => {
      const habilityList = selectedList.map((hability) => {return hability.id})
      formik.setFieldValue('hability_id',habilityList)
    }


      //setting causes list
      const [causes, setCauses] = useState();
      const [projectCauses, setProjectCauses] = useState();
      useEffect(() => {
        fetch(`http://localhost:8000/cause`)
        .then((res) => res.json())
        .then((res) => {
            setCauses(res);
            return res;
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])


    //chosen cause
    let onChangeCause = (selectedList, selectedItem) => {
      const habilityList = selectedList.map((hability) => {return hability.id})
      formik.setFieldValue('cause_id',habilityList)
    }

      //saving information
      const handleSave = () => {
        fetch(`http://localhost:8000/projects/`, 
        {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formik.values)
        })
      .then((res) => res.json())
      .then(() => {toast.success("Projeto criado com sucesso.")})
      .then((res) => {
        props.setStatePass(false);
      })
      .catch((erro) =>{
        alert("Não foi possível salvar.")
        console.log(erro)}
      );

      }

    return (
        <>
        <div className = "manage-project-toast"><Toaster /></div>
        <div className = "project-creation-container project-set-vis">
            <div ref = {windowRef} className = "project-creation-window">
                <div className = "project-creation-window-header">
                <h3>Editar informações</h3>
                <FontAwesomeIcon className = "project-creation-close-btn" icon = {faTimes} onClick = {() => props.setStatePass(false)}/>
                </div>

                  <div className = "project-creation-window-body">
                    
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

                    <div className = "project-habilities-causes-creation">
                    <label>Habilidades necessárias</label>
                     {habilities && <Multiselect 
                        options = {habilities}
                        displayValue = "name"
                        selectionLimit = "3"
                        placeholder = "Selecione até 3 habilidades"
                        onSelect = {onChangeHability}
                        onRemove = {onChangeHability}
                        avoidHighlightFirstOption = "true"
                        style =  {{
                          chips: { background: 'var(--secondColor)' },
                          multiselectContainer: {
                            color: 'var(--secondColor)',
                            background: 'white',
                            padding: "0.7rem !important",
                            borderRadius: "5px",
                            border: "none",
                            boxShadow: "1px 1px 4px #9c9c9c"
                          },
                          inputField: {
                            font: 'var(--secondFont)',
                            fontSize: ".8rem",
                            width: "15rem"
                          },
                        }}
                      />}
                    </div>

                    <div className = "project-habilities-causes-creation">
                    <label>Causas atreladas</label>
                     {habilities && <Multiselect 
                        options = {causes}
                        displayValue = "name"
                        selectedValues = {projectCauses}
                        selectionLimit = "3"
                        placeholder = "Selecione até 3 habilidades"
                        onSelect = {onChangeCause}
                        onRemove = {onChangeCause}
                        avoidHighlightFirstOption = "true"
                        style =  {{
                          chips: { background: 'var(--secondColor)' },
                          multiselectContainer: {
                            color: 'var(--secondColor)',
                            background: 'white',
                            padding: "0.7rem !important",
                            borderRadius: "5px",
                            border: "none",
                            boxShadow: "1px 1px 4px #9c9c9c"
                          },
                          inputField: {
                            font: 'var(--secondFont)',
                            fontSize: ".8rem",
                            width: "15rem"
                          },
                        }}
                      />}
                    </div>

                    <div className="inputs">
                      <label htmlFor="description">Descrição do projeto</label>
                      <textarea
                        type="text"
                        name="description"
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
                
                <div className = "project-first-creation-window-footer">
                    <button className = "project-creation-save" onClick = {handleSave}>Salvar</button>
                </div>
            </div>
        </div>
        </>
    )

}

export default ProjectCreation;