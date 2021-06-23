import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./ManageProjectsList.css"
import ManageProjectsCart from "../ManageProjectsCard/ManageProjectsCard";

function ManageProjectsList() {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState("");

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

      useEffect(() => console.log(projects),[projects])

  return (
    <div className = "manage-projects-container">
        <div className = "manage-projects-list-container">
           
            <div className = "manage-projects-header">
              <h3>Gerenciar projetos</h3>

              <div className = "manage-projects-search-filter">
                <div className="manage-projects-search-field">
                  <FontAwesomeIcon className = "manage-projects-icon" icon = {faSearch} />
                  <input className = "manage-projects-search-input" type = "text" placeholder = "buscar projeto" />
                </div>  
                <div className="manage-projects-filter-field">
                  <p>Todas as vagas</p>
                  <FontAwesomeIcon className = "manage-projects-icon" icon = {faChevronDown} />
                </div>
              </div> 

            </div>


            {projects && projects.map(project => 
              <ManageProjectsCart project = {project} key = {`manage-project-cart-${project.id}`}/>)
            }

        </div>
    </div>
  )
}


export default ManageProjectsList;