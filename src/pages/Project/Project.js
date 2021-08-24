import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UserSubscription from "../../components/UserSubscription/UserSubscription";
import "./project.css";
import Loader from "../../components/Loader/Loader";
import api from "../../services/api";
import ImageSkeleton from "../../components/ImageSkeleton/ImageSkeleton";
import{ Toaster } from 'react-hot-toast';

function ProjectPage() {
  const parameter = useParams();
  const projectId = parameter.id;
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState();
  const [causes, setCauses] = useState([]);
  const [habilities, setHabilities] = useState([]);
  const [institution, setInstitution] = useState();
  const [subscription, setSubscription] = useState();
  const [activeSubscription, setActiveSubscription] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  //get data from localhost port 8000
  useEffect(() => {
    api
      .get(`/project/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setCauses(res.data.causes);
        setHabilities(res.data.habilities);
        setInstitution(res.data.institution);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, [projectId]);

  useEffect(() => {
    user &&
      api
        .get(`/subscription/?user_id=${user.id}&project_id=${projectId}`)
        .then((res) => {
          setSubscription(res.data);
        })
        .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, [projectId, user]);

  const image = project?.img;

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = image;
    imageLoader.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div id="page-container">
      <Toaster />
      <Navbar />
      {project ? (
        <div key={project.id} className="project-container">
          <div className="project-title">
            <h2>{project.title}</h2>
          </div>

          <div className="grid-project">
            {imageLoaded ? (
              <div className="project-image-div">
                <img src={image} alt="project" />
              </div>
            ) : (
              <ImageSkeleton />
            )}
            <div className="project-information">
              <div className="project-provider">
                <h3>Instituição: </h3>
                <div className = "project-img-link-institution">
                {institution && <><img className = "project-institution-img" src = {institution.img} alt="imagem do projeto" />
                   <NavLink className = "project-institution-link" to={`/institution/${institution.id}`}>{institution.name}</NavLink></>}
                </div>
                <hr />
                {institution && <span>Cidade: {institution.address.city}</span>}
                <span>Localização: {project.local_type=="local"?"Presencial":"Remoto"}</span>
              </div>
              <div className="project-details">
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
                <h4>Descrição: </h4>
                    <p>{project.description}</p>
                {subscription &&
                user.type === 1 &&
                subscription.length === 0 && (
                  <button
                    className="project-btn project-status"
                    onClick={() => setActiveSubscription(true)}
                  >
                    Quero a vaga
                  </button>
                )}
                {subscription && subscription.length === 1 &&
                (
                  <p className="project-status">Você está inscrito nesta vaga.</p>
                )}
                {!user && (
                  <NavLink to="/login">
                    <button className="project-btn project-status">Faça seu Login</button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="project-container">
          <Loader />
        </div>
      )}
      <Footer />

      <div
        className={`project-overlay ${
          activeSubscription ? "project-set-vis" : ""
        }`}
        onClick={() => {
          setActiveSubscription(false);
        }}
      >
        {" "}
      </div>

      {activeSubscription && (
        <UserSubscription
          project={project}
          subscription={subscription}
          setSubscription={setSubscription}
          setStatePass={setActiveSubscription}
        />
      )}
    </div>
  );
}

export default ProjectPage;
