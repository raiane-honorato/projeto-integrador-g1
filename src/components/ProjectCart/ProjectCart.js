import { NavLink } from "react-router-dom";
import "./ProjectCart.css";

function ProjectCart({ project }) {

    return (
    <>
      <NavLink
        to={`/project/${project["id"]}`}
        key={`card-${project["id"]}`}
        className="spotlight-card-container"
      >
        <div className="card">
          <div className="card-image-div">
            <img
              className="card-image"
              alt={project["title"]}
              src={project["img"]}
            />
          </div>
          <div className="card-content">
            <h3 className="job-title">{project["title"]}</h3>

            <p className="job-schedule">{project.institution && project.institution.name}</p>
            {project.habilities && project.habilities.map((hability, index) => (
              <span className="spotlight-projectcart-hability" key={index}>
                {
                  hability.label
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
