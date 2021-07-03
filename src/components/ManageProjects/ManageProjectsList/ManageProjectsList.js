import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./ManageProjectsList.css"
import ManageProjectsCart from "../ManageProjectsCard/ManageProjectsCard";
import ProjectCreation from "../../Edit/ProjectEditSection/ProjectCreation";
import toast, { Toaster } from 'react-hot-toast';

function ManageProjectsList() {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState("");
    const [createProject, setCreateProject] = useState(false);
    const [newProject, setNewProject] = useState(false);
    const [q, setQ] = useState('');
    const [filterStatus, setFilterStatus] = useState(false);

    useEffect(() => {
      
        fetch(`http://localhost:8000/projects/?institution_id=${user.institution_id}`)
          .then((res) => res.json())
          .then((res) => {
            setProjects(res);
          })
          .catch((erro) =>
            alert("Não foi possível obter dados dos projetos.")
          )
      }, []);

      useEffect(() => {
        
        if(newProject) {
          toast.success("Projeto criado com sucesso")
          setNewProject(false)
        } 

      },[newProject])

      useEffect(() => {
        q && fetch(`http://localhost:8000/projects/?institution_id=${user.institution_id}&q=${q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(q)
          setProjects(res);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )

        !q && fetch(`http://localhost:8000/projects/?institution_id=${user.institution_id}`)
        .then((res) => res.json())
        .then((res) => {
          setProjects(res);
        })
        .catch((erro) =>
          alert("Não foi possível obter dados dos projetos.")
        )
        
      }, [q])

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
                  onChange = {(event) => {setQ(event.target.value)}}
                   />
                </div>  
                <div className="manage-projects-filter-field-container">
                  <div className="manage-projects-filter-field" onClick = {()=> setFilterStatus(!filterStatus)}>
                    <p>Todas as vagas</p>
                    <FontAwesomeIcon className = "manage-projects-icon" icon = {faChevronDown} />
                  </div>

                  {filterStatus && 
                  
                  <div  className = "manage-projects-filter-dropdown">
                    <ul className="manage-projects-filter-dropdown-list">
                        <li className="manage-projects-filter-dropdown-list-item">
                            Aceitar inscrição
                        </li>
                        <li className="manage-project-subscription-change-status-dropdown-btn"  >
                            Recusar inscrição
                        </li>
                    </ul>
                  </div>
                  }

                </div>
              </div> 

            </div>


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

      {createProject && <ProjectCreation setStatePass = {setCreateProject} institutionId = {user.institution_id} projects = {projects} setStateProjects = {setProjects} setStateNewProject = {setNewProject}/>}
        
    </>
  )
}


export default ManageProjectsList;