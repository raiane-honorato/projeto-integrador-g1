import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./ProjectCart.css";

function ProjectCart(props) {

  const [institution, setInstitution] = useState();
  const [habilities, setHabilities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/institution/${props.project.institution_id}`)
    .then(res => res.json())
    .then(res => setInstitution(res))
    .catch(erro => alert(`Erro ao obter lista de habilidades: ${erro}`))
  }
  ,[]);

  useEffect(() => {
    props.project.hability_id.map( (hability_id) => {
      
      fetch(`http://localhost:8000/hability/${hability_id}`)
      .then(res => res.json())
      .then(res => setHabilities([...habilities, res]))
      .catch(erro => alert(`Erro ao obter lista de habilidades: ${erro}`))
    }

    )
  }
  ,[]);


  return (
    <>
      <NavLink
        to={`/project/${props.project["id"]}`}
        key={`card-${props.project["id"]}`}
        className="spotlight-card-container"
      >
        <div className="card">
          <div className="card-image-div">
            <img
              className="card-image"
              alt={props.project["title"]}
              src={props.project["img"]}
            />
          </div>
          <div className="card-content">
            <h3 className="job-title">{props.project["title"]}</h3>

            <p className="job-schedule">{institution && institution.institution_name}</p>
            {habilities && habilities.map((hability, index) => (
              <span className="spotlight-projectcart-hability" key={index}>
                {
                  hability.name
                }
              </span>
            ))}
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default ProjectCart;
