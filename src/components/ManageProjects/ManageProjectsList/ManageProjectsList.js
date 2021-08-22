import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../../context/auth";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./ManageProjectsList.css"
import ManageProjectsCart from "../ManageProjectsCard/ManageProjectsCard";
import ProjectCreation from "../../Edit/ProjectEditSection/ProjectCreation";
import toast, { Toaster } from 'react-hot-toast';
import api from "../../../services/api";
import Loader from "../../Loader/Loader";

function ManageProjectsList() {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState("");
    const [createProject, setCreateProject] = useState(false);
    const [newProject, setNewProject] = useState(false);
    const [filterStatus, setFilterStatus] = useState(false);
    const [filterParams, setFilterParams] = useState({'q':'','status':''})
    const [loading, setLoading] = useState(false);

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                  setFilterStatus(false)
                }
                }
        filterStatus && document.addEventListener("mousedown", handler);

        return () => {
            filterStatus && document.removeEventListener("mousedown", handler)
        }
    },[filterStatus])

    useEffect(() => {
      setLoading(true);
      api.get(`/project?institution_id=${user.institution.id}`)
      .then((res) => {
      setProjects(res.data);
      setLoading(false);
      })
      .catch((erro) =>
        alert("Não foi possível obter dados dessa instituição.")
      );
      }, [user]);

      useEffect(() => {
        
        if(newProject) {
          toast.success("Projeto criado com sucesso")
          setNewProject(false)
        } 

      },[newProject])

      //update project list based on filters
      useEffect(() => {
        setLoading(true);
        setProjects("");
        api.get(`/project?institution_id=${user.institution.id}&q=${filterParams.q}${filterParams.status?"&status="+filterParams.status:""}`)
        .then((res) => {
        setProjects(res.data);
        setLoading(false);
        setFilterStatus(false);
        })
        .catch((erro) =>
          alert("Não foi possível obter lista de projetos.")
        );
        
      }, [filterParams, user.institution.id])

      let handleFilterChange = (event) => {
        setFilterParams({...filterParams, 'status' : event.target.name })
      }

      let cleanFilter = () => {
        setFilterParams({'q':'','status':''})
      }



  return (
    <>
    <div className = "manage-project-toast"><Toaster /></div>
    <div className = "manage-projects-container">
        <div className = "manage-projects-list-container">
            <div className = "manage-projects-header">
              <h3>Gerenciar projetos</h3>
              <button className = "manage-projects-new-project-btn" onClick = {() => {setCreateProject(true)}}>Criar novo projeto</button>
              <div className = "manage-projects-search-filter">
                <div className="manage-projects-search-field">
                  <FontAwesomeIcon className = "manage-projects-icon" icon = {faSearch} />
                  <input 
                  className = "manage-projects-search-input" 
                  type = "text" 
                  placeholder = "buscar projeto"
                  value = {filterParams.q}
                  onChange = {(event) => {setFilterParams({...filterParams, 'q':event.target.value})}}
                   />
                </div>  
                <div className="manage-projects-filter-field-container" ref = {windowRef} >
                  <div className="manage-projects-filter-field" onClick = {()=> {
                    setFilterStatus(!filterStatus);
                    }}>
                    <p>{filterParams.status==="1"?  "Abertos" : filterParams.status==="2"? "Fechados" : "Todas as vagas"}</p>
                    <FontAwesomeIcon className = "manage-projects-icon" icon = {faChevronDown} />
                  </div>

                  {filterStatus && 
                  
                  <div  className = "manage-projects-filter-dropdown">
                    <label className = "manage-projects-filter-option">
                        <input 
                          className = "manage-projects-filter-checkbox" 
                          type="radio" 
                          name="1"
                          checked = {filterParams.status === "1"}
                          onChange = {handleFilterChange}
                          >
                          
                        </input>
                        <span className = "manage-projects-filter-text">Abertos</span>
                    </label>

                    <label className = "manage-projects-filter-option">
                    <input 
                          className = "manage-projects-filter-checkbox" 
                          type="radio" 
                          name="2"
                          checked = {filterParams.status === "2"}
                          onChange = {handleFilterChange}
                          >
                          
                        </input>                          
                        <span className = "manage-projects-filter-text">Encerrados</span>
                    </label>
                   
                  </div>
                  }

                </div>
                { (filterParams.q || filterParams.status) &&
                  <button className = "manage-project-clean-filters-btn" onClick = {cleanFilter}>Limpar</button>}
              </div> 

            </div>

            {loading && <Loader />}
            {projects && projects.map(project => 
              <ManageProjectsCart project = {project} key = {`manage-project-cart-${project.id}`}/>)
            }

        </div>
    </div>

    <div
        className={`institution-overlay ${
          (createProject)
            ? "institution-set-vis"
            : ""
        }`}
        onClick={() => {
          setCreateProject(false);

        }}
      ></div>

      {createProject && <ProjectCreation setStatePass = {setCreateProject} institution = {user.institution} projects = {projects} setStateProjects = {setProjects} setStateNewProject = {setNewProject}/>}
        
    </>
  )
}


export default ManageProjectsList;