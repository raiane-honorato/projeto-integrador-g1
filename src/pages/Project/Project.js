import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UserSubscription from "../../components/UserSubscription/UserSubscription";
import "./project.css";
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

function ProjectPage() {
  const parameter = useParams();
  const projectId = parameter.id;
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState();
  const [causes, setCauses] = useState([]);
  const [habilities, setHabilities] = useState([]);
  const [institution, setInstitution] = useState();
  const [subscriptions, setSubscriptions] = useState();
  const [activeSubscription, setActiveSubscription ] = useState(false);

  console.log(activeSubscription)

  //get data from localhost port 8000
  useEffect(() => {
    api.get(`/project/${projectId}`)
    .then((res) => {
      setProject(res.data);
      setCauses(res.data.causes);
      setHabilities(res.data.habilities);
      setInstitution(res.data.institution);
    })
    .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, [projectId]);

  useEffect(() => { 
       user && fetch(`http://localhost:8000/subscription/?user_id=${user.id}&&project_id=${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, [projectId, user]);

  return (
    <div id="page-container">
      <Navbar />
      {project ? (
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
                {institution && <h3>Instituição: {institution.name}</h3>}
                <hr />
                {institution && <span>Cidade: {institution.address.city}</span>}
                <span>Remoto: {project.local_type}</span>
              </div>
              <div className="project-details">
                <p>{project.description}</p>
                <div className="habilities">
                  {habilities && <span>Habilidades:</span>}
                  {habilities &&
                    habilities.map((hability) => (
                      <span key={hability.id}>{hability.label}</span>
                    ))}
                </div>
                <div className="causes">
                  <span>Causas:</span>
                  {causes &&
                    causes.map((cause) => (
                      <span key={cause.id}>{cause.label}</span>
                    ))}
                </div>
                { subscriptions && user.type === 1 && subscriptions.length === 0 ?
                <button className="project-btn" onClick = {() => setActiveSubscription(true)}>Quero a vaga</button>
                :
                <NavLink to="/login"><button className="project-btn">Faça seu Login</button></NavLink> 
                }
                {subscriptions && subscriptions.length > 0 && <p>Você já está inscrito nesta vaga</p>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader 
        />
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
