function ProjectCart(props) {
    return(
        <>
        <div className="card">
            
            <div class="card-image-div">
              <img
                className="card-image"
                alt={props.project["title"]}
                src={props.project["img"]}
              />
            </div>
            <div className="card-content">
              <h3 className="job-title">{props.project["title"]}</h3>
              
              <p className="job-schedule">
              {props.project["institution_name"]}
              </p>
              {
                  props.project['hability'].map(hability => (
                      <span class="spotlight-projectcart-hability">{hability}</span>
                  ))
              }
            </div>
          </div>
        </>
    )
}

export default ProjectCart;