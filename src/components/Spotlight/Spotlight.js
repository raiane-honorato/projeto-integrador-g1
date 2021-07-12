//styling
import "./spotlight.css";

//data
//import projects from "../../data/projects.json";

//components
import ProjectCart from "../ProjectCart/ProjectCart";
import { useEffect, useState } from "react";

function Spotlight() {
  const [habilities, setHabilities] = useState();

  useEffect(() => {
      fetch('http://localhost:8000/hability')
      .then(res => res.json())
      .then(res => setHabilities(res))
      .catch(erro => alert(`Erro ao obter lista de habilidades: ${erro}`))
  },[])


  const [causes, setCauses] = useState();

  useEffect(() => {
      fetch('http://localhost:8000/cause')
      .then(res => res.json())
      .then(res => setCauses(res))
      .catch(erro => alert(`Erro ao obter lista de causas: ${erro}`))
  },[])

  //getting project list from JSON server on 8000
  const [projects, setProjects] = useState();
  
  useEffect( () => {
    fetch(" http://localhost:8000/projects")
    .then(res => res.json())
    .then(res => {
      setProjects(res)
    })
    .catch(erro => alert(`Erro ao obter lista de projetos: ${erro}`))
  },[]
  )

  
  return (
    <>
      {/* Habilities */}
      <section className="spotlight-section spotlight-section-one">
        <div className="spotlight-section-one-content">
          <h2>Busque por habilidade</h2>
          <div className="habilities-grid">
            {habilities && habilities.map((hability) => (
              <div key={hability.id} className="hability-img-div">
                <img
                  className="hability-img"
                  src={hability.img_src}
                  alt={hability.value}
                />
                {hability.label}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* causes */}
      <section className="spotlight-section spotlight-section-cause">
        <div className="spotlight-section-one-content">
          <h2>Apoie sua Causa</h2>
          <div className="causes-grid">
            {causes && causes.map((cause) => (
              <div key={cause.id} className="cause-img-div">
                <img
                  className="cause-img"
                  src={cause.img_src}
                  alt={cause.value}
                />
                {cause.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight projects */}

      <section className="spotlight-section spotlight-section-two">
        <h2>Projetos em destaque</h2>
        <div className="job-cards">
          {
          projects &&
          
          projects.sort((a,b) => {return(b.popularity - a.popularity)})
          .slice(0,4)
          .map((project) => (
            <ProjectCart project={project} key = {`spotlight-${project.id}`} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Spotlight;
