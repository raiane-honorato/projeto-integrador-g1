//styling
import "./spotlight.css";

//images
// import barber from "../../img/barber.svg";
// import artist from "../../img/artist2.svg";
// import dev from "../../img/dev.svg";
// import cooking from "../../img/cooking.svg";
// import medical_care from "../../img/medical_care.svg";
// import music from "../../img/music.svg";
// import sports from "../../img/sports.svg";
// import teacher from "../../img/teacher.svg";
// import workout from "../../img/workout.svg";
// import ecologial_cause from "../../img/ecological_cause.svg";
// import meditation from "../../img/meditation.svg";
// import personal from "../../img/personal.svg";

//data
import projects from "../../data/projects.json";

//components
import ProjectCart from "./ProjectCart";
import { useEffect, useState } from "react";

function Spotlight() {
  const [habilities, setHabilities] = useState();

  useEffect(() => {
      fetch('https://raw.githubusercontent.com/felipeblobo/felipeblobo.github.io/main/habilities.json')
      .then(res => res.json())
      .then(res => setHabilities(res))
      .catch(erro => alert(`Erro ao obter lista de habilidades: ${erro}`))
  },[])

  return (
    <>
      <section className="spotlight-section spotlight-section-one">
        <div className="spotlight-section-one-content">
          <h2>Deixe suas habilidades aflorarem...</h2>
          <div className="habilities-grid">
            {habilities && habilities.map((hability) => (
              <div key={hability.id} className="hability-img-div">
                <img
                  className="hability-img"
                  src={hability["img_src"]}
                  alt={hability.name}
                />
                {hability.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight projects */}

      <section className="spotlight-section spotlight-section-two">
        <h2>As vagas mais desejadas...</h2>
        <div className="job-cards">
          {projects.map((project) => (
            <ProjectCart project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Spotlight;
