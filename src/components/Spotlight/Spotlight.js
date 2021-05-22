//styling
import "./spotlight.css";

//images
import barber from "../../img/barber.svg";
import artist from "../../img/artist2.svg";
import dev from "../../img/dev.svg";
import cooking from "../../img/cooking.svg";
import medical_care from "../../img/medical_care.svg";
import music from "../../img/music.svg";
import sports from "../../img/sports.svg";
import teacher from "../../img/teacher.svg";
import workout from "../../img/workout.svg";
import ecologial_cause from "../../img/ecological_cause.svg";
import meditation from "../../img/meditation.svg";
import personal from "../../img/personal.svg";

//data
import projects from "../../data/projects.json";

//components
import ProjectCart from "./ProjectCart";

function Spotlight() {

  return (
    <>
      {/* Habilities */}
      <section className="spotlight-section spotlight-section-one">
        <div className="spotlight-section-one-content">
          <h2>Deixe suas habilidades aflorarem...</h2>
          <div className="habilities-grid">
            <div className="hability-img-div">
              <img className="hability-img" src={barber} alt="Barbearia" />
              Barbearia
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={artist} alt="Artes" />
              Artes
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={dev} alt="Programação" />
              Programação
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={music} alt="Música" />
              Música
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={cooking} alt="Culinária" />
              Culinária
            </div>
            <div className="hability-img-div">
              <img
                className="hability-img"
                src={medical_care}
                alt="Medicina e Enfermagem"
              />
              Medicina e Enfermagem
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={teacher} alt="Educação" />
              Educação
            </div>
            <div className="hability-img-div">
              <img
                className="hability-img"
                src={workout}
                alt="Dança e Musculação"
              />
              Dança
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={sports} alt="Esportes" />
              Esportes
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={ecologial_cause} alt="Meio-ambiente" />
              Meio-ambiente
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={meditation} alt="Meditação" />
              Meditação
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={personal} alt="personal" />
              Atividades físicas
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight projects */}


      <section className="spotlight-section spotlight-section-two">

        <h2>As mais desejadas...</h2>
        <div className="job-cards">
          <ProjectCart project={projects.projects[0]} />
          <ProjectCart project={projects.projects[1]} />
          <ProjectCart project={projects.projects[2]} />
          <ProjectCart project={projects.projects[3]} />


        </div>
      </section>
    </>
  );
}

export default Spotlight;