import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./project.css";

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
    <div id="page-container">
      <Navbar />
      {vagas &&
        vagas
          .filter((vaga) => vaga.id === +projectId)
          .map((vaga) => (
            <div key={vaga.id} className="project-container">
              <div className="project-title">
                <h2>{vaga.title}</h2>
              </div>
              <div className="grid-project">
                <div className="project-image-div">
                  <img src={vaga.img} alt="vaga" />
                </div>
                <div className="project-information">
                  <div className="project-provider">
                    <h3>{vaga.institution_name}</h3>
                    <span>Cidade: {vaga.address}</span>
                    <span>Remoto: {vaga.local_type}</span>
                  </div>
                  <div className="project-details">
                    <p>{vaga.description}</p>
                    <div className="habilities">
                      {vaga.hability && <span>Habilidades:</span>}
                      {vaga.hability &&
                        vaga.hability.map((hability) => (
                          <span key={hability}>{hability}</span>
                        ))}
                    </div>
                    <div className="causes">
                      <span>Causas:</span>
                      {vaga.cause &&
                        vaga.cause.map((cause) => (
                          <span key={cause}>{cause}</span>
                        ))}
                    </div>
                  <button className='project-btn'>Quero a Vaga</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <Footer />
    </div>
  );
}

export default ProjectPage;
