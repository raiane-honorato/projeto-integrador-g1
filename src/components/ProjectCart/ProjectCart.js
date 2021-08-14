import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProjectCardSkeleton from "../ProjectCardSkeleton/ProjectCardSkeleton";
import "./ProjectCart.css";

function ProjectCart({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const image = project.img;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageLoaded(true);
  }, [image]);

    return (
    <>
      <NavLink
        to={`/project/${project["id"]}`}
        key={`card-${project["id"]}`}
        className="spotlight-card-container"
      >
        {imageLoaded ? (
        <div className="card">          
          <div className="card-image-div">        
            <img
              className="card-image"
              alt={project["title"]}
              src={image}
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
          ) : (
            <ProjectCardSkeleton />
          )}
      </NavLink>
    </>
  );
}

export default ProjectCart;
