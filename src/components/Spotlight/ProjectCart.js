import { Link, NavLink } from "react-router-dom";

function ProjectCart(props) {
  return (
    <>
      <NavLink
        to={`/project/${props.project["id"]}`}
        key={props.project["id"]}
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

            <p className="job-schedule">{props.project["institution_name"]}</p>
            {props.project["hability"].map((hability, index) => (
              <span className="spotlight-projectcart-hability" key={index}>
                {hability}
              </span>
            ))}
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default ProjectCart;
