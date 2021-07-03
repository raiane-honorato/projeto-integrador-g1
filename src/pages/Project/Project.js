import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UserSubscription from "../../components/UserSubscription/UserSubscription";
import "./project.css";

function ProjectPage() {
  const parameter = useParams();
  const projectId = parameter.id;
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState();
  const [causes, setCauses] = useState([]);
  const [habilities, setHabilities] = useState([]);
  const [institutionId, setInstitutionId] = useState();
  const [institution, setInstitution] = useState();
  const [subscriptions, setSubscriptions] = useState();
  const [activeSubscription, setActiveSubscription ] = useState(false);

  console.log(activeSubscription)

  //get data from localhost port 8000
  useEffect(() => {
    fetch(`http://localhost:8000/projects/${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setProject(res);
        setInstitutionId(res.institution_id);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription/?user_id=${user.id}&&project_id=${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, []);
  

  useEffect(() => {
    institutionId && fetch(`http://localhost:8000/institution/${institutionId}`)
      .then((res) => res.json())
      .then((res) => {
        setInstitution(res);
      })
      .catch((erro) => alert(`Erro ao obter instituição`));
  }, [institutionId]);

  useEffect(() => {
    let requests =
      project &&
      project.cause_id.map( (cause_id) => {
        return fetch(`http://localhost:8000/cause/${cause_id}`).then((res) => res.json())
      });

      requests && Promise.all(requests)
      .then((p) => setCauses(p))
      .catch((err) => alert("Não foi possível obter as causas"));
  }, [project]);


  useEffect(() => {
    let requests2 =
      project &&
      project.hability_id.map(async (hability_id) => {
        const res = await fetch(`http://localhost:8000/hability/${hability_id}`);
        return await res.json();
      });

      requests2 && Promise.all(requests2)
      .then((p) => setHabilities(p))
      .catch((err) => alert("Não foi possível obter as habilidades"));
  }, [project]);

  return (
    <div id="page-container">
      <Navbar />
      {project && (
        <div key={project.id} className="project-container">
          <div className="project-title">
            <h2>{project.title}</h2>
          </div>

          <div className="grid-project">
            <div className="project-image-div">
              <img src={project.img} alt="project" />
            </div>
            <div className="project-information">
              <div className="project-provider">
                <h3>{project.institution_name}</h3>
                <hr />
                {institution && <span>Cidade: {institution.city}</span>}
                <span>Remoto: {project.local_type}</span>
              </div>
              <div className="project-details">
                <p>{project.description}</p>
                <div className="habilities">
                  {habilities && <span>Habilidades:</span>}
                  {habilities &&
                    habilities.map((hability) => (
                      <span key={hability.id}>{hability.name}</span>
                    ))}
                </div>
                <div className="causes">
                  <span>Causas:</span>
                  {causes &&
                    causes.map((cause) => (
                      <span key={cause.id}>{cause.name}</span>
                    ))}
                </div>
                { subscriptions && user.type === 1 && subscriptions.length === 0 &&
                  <button className="project-btn" onClick = {() => setActiveSubscription(true)}>Quero a vaga</button>}
                {subscriptions && subscriptions.length > 0 && <p>Você já está inscrito nesta vaga</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />

      <div
        className={`project-overlay ${activeSubscription
            ? "project-set-vis"
            : ""
          }`}
        onClick={() => {
          setActiveSubscription(false);
        }}
      >
        {" "}
      </div>


      {activeSubscription && <UserSubscription project = {project} setStatePass = {setActiveSubscription}/>}


    </div>


  );
}

export default ProjectPage;
