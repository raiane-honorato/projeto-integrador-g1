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
    const [q, setQ] = useState('');
    const [filterStatus, setFilterStatus] = useState(false);
    const [filterState, setFilterState] = useState({'opened':false,'closed':false})
    const [filterProject, setFilterProject] = useState({'opened':false,'closed':false})
    const [loading, setLoading] = useState(false);

    //dealing with outside click to close the component
    let windowRef = useRef();

    useEffect(() => {
        let handler = (event) => {
                if(!windowRef.current.contains(event.target)){
                  setFilterStatus(false)
                  setFilterState(filterProject)
                }
                }
        filterStatus && document.addEventListener("mousedown", handler);

        return () => {
            filterStatus && document.removeEventListener("mousedown", handler)
        }
    },[filterStatus, filterProject])

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

      useEffect(() => {
        q && api.get(`/project?institution_id=${user.institution.id}&q=${q}`)
        .then((res) => {
        setProjects(res.data);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dessa instituição.")
        );

        !q && api.get(`/project?institution_id=${user.institution.id}`)
        .then((res) => {
        setProjects(res.data);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dessa instituição.")
        );

        q && cleanFilter()
        
      }, [q, user.institution_id])

      let handleFilterChange = (event) => {
        setFilterState({...filterState, [event.target.name] : event.target.checked })
      }

      let cleanFilter = () => {
        setFilterState({'opened':false,'closed':false})
        setFilterProject({'opened':false,'closed':false})
      }

      let updateProjects = () => {
        setLoading(true);
        setProjects()
        setFilterProject(filterState)
        setQ("")
        if (filterState.opened === filterState.closed) {
          api.get(`/project?institution_id=${user.institution.id}`)
          .then((res) => {
            setProjects(res.data);
            setLoading(false)
          })
          .catch((erro) =>
            alert("Não foi possível obter dados dos projetos.")
          )
        } else {
          api.get(`/project?institution_id=${user.institution.id}${filterState.opened ? '&status=1': filterState.closed ? '&status=2':''}`)
          .then((res) => {
            setProjects(res.data);
            setLoading(false)
          })
          .catch((erro) =>
            alert("Não foi possível obter dados dos projetos.")
          )
        }

        setFilterStatus(false)
      }

      // useEffect(() => {
      //   if (filterProject.opened == false & filterProject.closed == false){updateProjects()}
      // },[filterProject])

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
                  value = {q}
                  onChange = {(event) => {setQ(event.target.value)}}
                   />
                </div>  
                <div className="manage-projects-filter-field-container" ref = {windowRef} >
                  <div className="manage-projects-filter-field" onClick = {()=> {
                    setFilterStatus(!filterStatus);
                    setFilterState(filterProject)
                    }}>
                    <p>Todas as vagas</p>
                    <FontAwesomeIcon className = "manage-projects-icon" icon = {faChevronDown} />
                  </div>

                  {filterStatus && 
                  
                  <div  className = "manage-projects-filter-dropdown">
                    <label className = "manage-projects-filter-option">
                        <input 
                          className = "manage-projects-filter-checkbox" 
                          type="checkbox" 
                          name="opened"
                          checked = {filterState.opened}
                          onChange = {handleFilterChange}
                          >
                          
                        </input>
                        <span className = "manage-projects-filter-text">Abertas</span>
                    </label>
                    <label className = "manage-projects-filter-option">
                    <input 
                          className = "manage-projects-filter-checkbox" 
                          type="checkbox" 
                          name="closed"
                          checked = {filterState.closed}
                          onChange = {handleFilterChange}
                          >
                          
                        </input>                          
                        <span className = "manage-projects-filter-text">Encerradas</span>
                    </label>
                    <div className = "manage-projects-filter-btn-container">
                      <button className = "manage-projects-filter-btn" onClick = {cleanFilter}>Limpar</button>
                      <button className = "manage-projects-filter-btn" id="manage-projects-apply-btn" onClick = {updateProjects}>Aplicar</button>
                    </div>
                  </div>
                  }

                </div>
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