import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import './project.css';

function ProjectPage() {
  const parameter = useParams();
  const projectId = parameter.id;

  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/felipeblobo/felipeblobo.github.io/main/projects.json`
    )
      .then((res) => res.json())
      .then((res) => setVagas(res))
      .catch((erro) => alert(`Erro ao obter dados sobre a vaga: ${erro}`));
  }, []);

  return (
    <>
      {vagas &&
        vagas
          .filter((vaga) => vaga.id === +projectId)
          .map((vaga) => (
            <div className="project-container">
              <div className="project-header">
                <img src={vaga.img} alt="vaga" />
                <h2>{vaga.title}</h2>
              </div>
              <div className="project-provider">
                <span>{vaga.institution_name}</span>
                <span>{vaga.address}</span>
                <span>{vaga.local_type}</span>
              </div>
              <div className="project-details">
                <p>{vaga.description}</p>
                <p>{vaga.hability}</p>
                <p>{vaga.cause}</p>
              </div>
            </div>
          ))}
      <Footer />
    </>
  );
}

export default ProjectPage;
