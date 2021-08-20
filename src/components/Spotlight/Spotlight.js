//styling
import "./spotlight.css";
import api from "../../services/api";

//components
import ProjectCart from "../ProjectCart/ProjectCart";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function Spotlight() {
  const [habilities, setHabilities] = useState();
  const [causes, setCauses] = useState();
  const [projects, setProjects] = useState();


  useEffect(() => {
    api
      .get(`/project`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, []);

  useEffect(() => {
    api
      .get(`/cause`)
      .then((res) => {
        setCauses(res.data);
      })
      .catch((erro) => alert(`Erro ao obter lista de causas: ${erro}`));
  }, []);

  useEffect(() => {
    api
      .get(`/hability`)
      .then((res) => {
        setHabilities(res.data);
      })
      .catch((erro) => alert(`Erro ao obter lista de habilidadesc: ${erro}`));
  }, []);

  return (
    <>
      {/* Habilities */}
      <section className="spotlight-section spotlight-section-one">
        <div className="spotlight-section-one-content">
          <h2>Destaque suas habilidades</h2>
          <div className="habilities-grid">
            {habilities ? (
              habilities.map((hability) => (
                <div key={hability.id} className="hability-img-div">
                  <img
                    className="hability-img"
                    src={hability.img}
                    alt={hability.value}
                  />
                  {hability.label}
                </div>
              ))) : (
                <Loader />
              )}
          </div>
        </div>
      </section>

      {/* causes */}
      <section className="spotlight-section spotlight-section-cause">
        <div className="spotlight-section-one-content">
          <h2>Apoie uma Causa</h2>
          <div className="causes-grid">
            {causes ? (
              causes.map((cause) => (
                <div key={cause.id} className="cause-img-div">
                  <img
                    className="cause-img"
                    src={cause.img}
                    alt={cause.value}
                  />
                  {cause.label}
                </div>
              ))) : (
                <Loader />
              )}
          </div>
        </div>
      </section>

      {/* Spotlight projects */}

      <section className="spotlight-section spotlight-section-two">
        <h2>Projetos em destaque</h2>
        <div className="job-cards">
          {projects ? (
            projects
              .sort((a, b) => {
                return b.popularity - a.popularity;
              })
              .slice(0, 4)
              .map((project) => (
                <ProjectCart
                  project={project}
                  key={`spotlight-${project.id}`}
                />
              ))) : (
                <Loader />
              )}
        </div>
      </section>
    </>
  );
}

export default Spotlight;
