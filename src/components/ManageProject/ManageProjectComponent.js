import { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import ProjectEdition from "../Edit/ProjectEditSection/ProjectEdition";
import CloseProject from "../Edit/ProjectEditSection/CloseProject";
import "./ManageProjectComponent.css";


import { faEye, faPen, faBan, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageProjectSubscription from "./ManageProjectSubscription";
import api from "../../services/api";
import Loader from "../Loader/Loader";

function ManageProjectComponent({ projectId }) {
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState('');
  const [subscriptons, setSubscriptions] = useState();
  const [editProject, setEditProject] = useState(false);
  const [closeProject, setCloseProject] = useState(false);


  const [filterParams, setFilterParams] = useState({'q':'','status':''})
  const [filterDropDown, setFilterDropDown] = useState(false);
  //const [q, setQ] = useState('');
  //const [filterByStatus, setFilterByStatus] = useState('');
  //const [filterRegistration, setfilterRegistration] = useState({ 'approved': false, 'declined': false, 'pending': false, 'canceled': false })
  //const [filterProject, setFilterProject] = useState({ 'opened': false, 'closed': false })
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //dealing with outside click to close the component
  let windowRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!windowRef.current.contains(event.target)) {
        setFilterDropDown(false)
      }
    }
    filterDropDown && document.addEventListener("mousedown", handler);

    return () => {
      filterDropDown && document.removeEventListener("mousedown", handler)
    }
  }, [filterDropDown])



  useEffect(() => {
    setLoading(true)
    api.get(`/project/${projectId}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false)
      })
      .catch((erro) =>
        alert("Não foi possível obter dados desse projeto.")
      );
  }, [projectId]);

  useEffect(() => {
    setLoading(true)
    api.get(`/subscription/?project_id=${projectId}`)
      .then((res) => {
        setSubscriptions(res.data);
        setLoading(false)
      })
      .catch((erro) =>
        alert("Não foi possível obter inscrições.")
      )

  }, [projectId])



  let handleFilterChange = (event) => {
    setFilterParams({...filterParams, 'status':event.target.name})
    //const initialValue = { 'approved': false, 'declined': false, 'pending': false, 'canceled': false }
    //setfilterRegistration({ ...initialValue, [event.target.name]: event.target.checked })
  }

  let cleanFilter = () => {
    setFilterParams({'q':'', 'status':''})
    //setfilterRegistration({ 'approved': false, 'declined': false, 'pending': false, 'canceled': false })
    //setFilterProject({ 'opened': false, 'closed': false })
  }

  useEffect( () => {
      setLoading2(true);
      setSubscriptions("");
      api.get(`/subscription/?project_id=${projectId}${filterParams.status?"&status="+filterParams.status:""}&q=${filterParams.q}`)
        .then((res) => {
          setSubscriptions(res.data);
          setLoading2(false);
        })
        .catch((erro) =>
          alert("Não foi possível obter inscrições.")
        )

      setFilterDropDown(false)
    }, [filterParams])

  


  return (
    <div className="manage-project-page">
      {loading && <Loader />}
      {project && project.institution_id === user.institution_id &&

        <>
          <div className="manage-project-container">

            <div className="manage-project-header">

              <div className="manage-project-img-information">
                <img className="manage-project-img" src={project.img} alt="imagem do projeto" />
                <div className="manage-project-information">
                  <h3>{project.title}</h3>
                  <div className="manage-project-subscriptions">
                    <span className={`manage-projects-card-bullet-point ${project.status === 1 ? "bullet-green" : "bullet-grey"}`}></span>
                    <p>{project.status === 1 ? "Aberto" : "Encerrado"}</p>
                  </div>
                  <p>{project.description}</p>
                </div>
              </div>

              <div className="manage-project-setting-buttons">

                <NavLink className="manage-project-button view-project" to={`/project/${project.id}`}>
                  <FontAwesomeIcon icon={faEye} />
                  <span>Visualizar</span>
                </NavLink>

                {
                  project.status === 1 &&
                  <button className="manage-project-button view-project" onClick={() => setEditProject(true)}>
                    <FontAwesomeIcon icon={faPen} />
                    <span>Editar</span>
                  </button>}

                {
                  project.status === 1 &&
                  <button className="manage-project-button close-project" onClick={() => { setCloseProject(true) }}>
                    <FontAwesomeIcon icon={faBan} />
                    <span>Encerrar</span>
                  </button>}

              </div>

            </div>
            <div className="manage-project-subscriptions-container">

              {subscriptons && <p className="manage-project-subscriptions-title"><b>{subscriptons.length}</b> inscritos no projeto</p>}
              <div className="manage-project-search-filter">
                <div className="manage-project-search-field">
                  <FontAwesomeIcon className="manage-project-icon" icon={faSearch} />
                  <input
                    className="manage-project-search-input"
                    type="text"
                    placeholder="buscar voluntário"
                    value={filterParams.q}
                    onChange={(event) => { setFilterParams({...filterParams, 'q':event.target.value}) }}
                  />
                </div>

                <div className="manage-projects-filter-field-container" ref={windowRef} >
                  <div className="manage-project-filter-field"
                    onClick={() => {
                      setFilterDropDown(!filterDropDown);
                      
                    }}>
                    <p>Todas as inscrições</p>
                    <FontAwesomeIcon className="manage-project-icon" icon={faChevronDown} />
                  </div>

                  {filterDropDown &&

                    <div className="manage-projects-filter-dropdown">
                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="radio"
                          name="Aceita"
                          checked={filterParams.status == "Aceita"}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Aceita</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="radio"
                          name="Recusada"
                          checked={filterParams.status == "Recusada"}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Recusada</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="radio"
                          name="Pendente"
                          checked={filterParams.status == "Pendente"}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Pendente</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="radio"
                          name="Cancelada"
                          checked={filterParams.status == "Cancelada"}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Cancelada</span>
                      </label>
                    </div>
                  }
                </div>
                {(filterParams.q || filterParams.status) &&
                  
                    <button className="manage-project-clean-filters-btn" onClick={cleanFilter}>Limpar filtros</button>
                }
              </div>
              {loading2  && <Loader />}
              {!loading2 && subscriptons &&
                ((subscriptons.length >= 1) ?
                subscriptons.map(subscription => <ManageProjectSubscription subscription={subscription} subscriptions={subscriptons} setStateSubscriptions={setSubscriptions} project={project} />) :
                <p className="manage-project-no-subscriptions">Ainda não há inscrições</p>)
              }
            </div>

          </div>

          <div
            className={`institution-overlay ${(editProject || closeProject)
              ? "institution-set-vis"
              : ""
              }`}
            onClick={() => {
              setEditProject(false);
              setCloseProject(false);

            }}
          >
            {" "}
          </div>

          {editProject && <ProjectEdition setStatePass={setEditProject} project={project} setStateProject={setProject} />}
          {closeProject && <CloseProject setStatePass={setCloseProject} project={project} setStateProject={setProject} subscriptions={subscriptons} setStateSubscriptions={setSubscriptions} />}

        </>

      }
    </div>
  )
}

export default ManageProjectComponent;