import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import { useFormik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import  { Toaster } from 'react-hot-toast';
import "./ProjectCreation.css";
import api from "../../../services/api";
import toast from "react-hot-toast";
import ShortLoader from "../../Loader/ShortLoader";

function ProjectCreation(props) {
  const [loading, setLoading] = useState(false);

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
        "local_type": "",
        "description": "",
        "popularity": null,
        "institution":props.institution,
        "habilities": [],
        "causes": props.institution.causes,
        }
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
        api.get(`/hability`)
        .then((res) => {
            setHabilities(res.data);
            return res;
        })
        .catch((erro) =>
          alert("Não foi possível obter dados de habilidades.")
        )

    },[])


    //chosen habilities
    let onChangeHability = (selectedList, selectedItem) => {
      formik.setFieldValue('habilities',selectedList)
    }


      //setting causes list
      const [causes, setCauses] = useState();
      const [institutionCauses, setInstitutionCauses] = useState();
      useEffect(() => {
        api.get(`/cause`)
        .then((res) => {
            setCauses(res.data);
            return res;
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])

    //institution's causes
    useEffect(() => {
      setInstitutionCauses(props.institution.causes)
    
  },[causes, props.institution])


    //chosen cause
    let onChangeCause = (selectedList, selectedItem) => {
      formik.setFieldValue('causes',selectedList)
    }

      //saving information
      const handleSave = () => {
        setLoading(true);
        api({      
          method: "POST",
          url: `/project/`,
          headers: { "Content-type": "application/json" },
          data: formik.values 
      })
      .then((res) => props.setStateProjects([...props.projects, res.data]) )
      .then((res) => {
        props.setStateNewProject(true);
        props.setStatePass(false);
        setLoading(false);
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
                <h3>Criar novo projeto</h3>
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

                    <div className="inputs" onChange = {(event) => formik.setFieldValue('local_type',event.target.value)}>
                      <label>Local do projeto</label>
                      <div className = "project-creation-local">
                        <input
                          type="radio"
                          name="local_type"
                          id="local_type_local"
                          value = "local"
                          required
                        />
                        <label  htmlFor="local_type_local">Local</label>
                      </div>
                      
                      <div className = "project-creation-local">
                        <input
                          type="radio"
                          name="local_type"
                          id="local_type_remote"
                          value = "remoto"
                          required
                        />
                        
                        <label htmlFor="local_type_remote">Remoto</label>
                      </div>
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
                        displayValue = "label"
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
                     {causes && institutionCauses && <Multiselect 
                        options = {causes}
                        displayValue = "label"
                        selectedValues = {institutionCauses}
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
                    {loading && <ShortLoader />}
                </div>
            </div>
        </div>
        </>
    )

}

export default ProjectCreation;