import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState, useEffect, useRef } from "react";
import { useFormik } from 'formik';
import Multiselect from 'multiselect-react-dropdown';
import "./ProjectEdition.css";
import api from "../../../services/api";
import toast from "react-hot-toast";
import ShortLoader from "../../Loader/ShortLoader";

function ProjectEdition(props) {
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
            props.project
        ,
        validate: function (values) {

          const errors = {};
    
          if ((values.title.length < 3) | (values.title.length > 100)) {
            errors.title = "Nome Invalido";
          }
    
          if ((values.description.length < 5) | (values.description.length > 500)) {
            errors.description = "Texto invalido";
          }
    
    
          return errors;
        },
      });

      //setting habilities list
      const [habilities, setHabilities] = useState();
      const [projectHabilities, setProjectHabilities] = useState();
      const [localType, setLocalType] = useState(props.project.local_type);
      useEffect(() => {
        api.get(`/hability`)
        .then((res) => {
            setHabilities(res.data);
            return res;
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])

    useEffect(() => {
        setProjectHabilities(props.project.habilities)
      
    },[habilities, props.project.habilities])

    //chosen habilities
    let onChangeHability = (selectedList, selectedItem) => {
      formik.setFieldValue('habilities',selectedList)
    }


      //setting causes list
      const [causes, setCauses] = useState();
      const [projectCauses, setProjectCauses] = useState();
      useEffect(() => {
        api.get(`/cause`)
        .then((res) => {
            setCauses(res.data);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

    },[])

    useEffect(() => {
        setProjectCauses(props.project.causes)
      
    },[causes, props.project.causes])

    //chosen cause
    let onChangeCause = (selectedList, selectedItem) => {
      formik.setFieldValue('causes',selectedList)
    }

      //saving information
      const handleSave = () => {
        setLoading(true);
        api({      
          method: "PATCH",
          url: `/project/${props.project.id}`,
          headers: { "Content-type": "application/json" },
          data: formik.values 
        })
      .then((res) => {
        props.setStateProject(res.data);
        props.setStatePass(false);
        setLoading(false);
        toast.success("Projeto atualizado.")
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
                    
                    <div className="inputs" onChange = {(event) => formik.setFieldValue('local_type',event.target.value)}>
                      <label>Local do projeto</label>
                      <div className = "project-creation-local">
                        <input
                          type="radio"
                          name="local_type"
                          id="local_type_local"
                          value = "local"
                          requiredchecked = {localType === "local"}
                          onChange = {event => setLocalType("local")}
                          //checked = {props.project.local_type === "local" ? "checked":null}
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
                          checked = {localType === "remoto"}
                          onChange = {event => setLocalType("remoto")}
                        />
                        
                        <label htmlFor="local_type_remote">Remoto</label>
                      </div>
                    </div>

                    <div className = "manage-project-img-edit">
                      <img className = "manage-project-img project-edit-img" src = {props.project.img} alt="imagem do projeto" />

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

                    <div className = "project-habilities-causes-edition">
                    <label>Habilidades necessárias</label>
                     {habilities && <Multiselect 
                        options = {habilities}
                        displayValue = "label"
                        selectedValues = {projectHabilities}
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

                    <div className = "project-habilities-causes-edition">
                    <label>Causas atreladas</label>
                     {causes && <Multiselect 
                        options = {causes}
                        displayValue = "label"
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        rows="6"
                        cols="50"
                        minLength="3"
                        maxLength="500"
                        required
                      >{formik.values.description}</textarea>
                      {formik.touched.description && formik.errors.description && (
                        <span className="formikError">{formik.errors.description}</span>
                      )}
                    </div>

                    

                  </div>
                
                <div className = "project-first-edition-window-footer">
                    <button className = "project-edition-save" onClick = {handleSave}>Salvar</button>
                    {loading && <ShortLoader size={50}/>}
                </div>
            </div>
        </div>
    )

}

export default ProjectEdition;