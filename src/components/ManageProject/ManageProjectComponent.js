import { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import ProjectEdition from "../Edit/ProjectEditSection/ProjectEdition";
import CloseProject from "../Edit/ProjectEditSection/CloseProject";
import "./ManageProjectComponent.css";

import { faEye, faPen, faBan, faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ManageProjectSubscription from "./ManageProjectSubscription";

function ManageProjectComponent({ projectId }) {
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState('');
  const [subscriptons, setSubscriptions] = useState();
  const [editProject, setEditProject] = useState(false);
  const [closeProject, setCloseProject] = useState(false);


  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterRegistration, setfilterRegistration] = useState({ 'approved': false, 'declined': false, 'pending': false, 'canceled': false })
  const [filterProject, setFilterProject] = useState({ 'opened': false, 'closed': false })

  //dealing with outside click to close the component
  let windowRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!windowRef.current.contains(event.target)) {
        setFilterStatus(false)
        setfilterRegistration(filterProject)
      }
    }
    filterStatus && document.addEventListener("mousedown", handler);

    return () => {
      filterStatus && document.removeEventListener("mousedown", handler)
    }
  }, [filterStatus])

  useEffect(() => {
    fetch(`http://localhost:8000/projects/${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setProject(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter dados desse projeto.")
      );
  }, [projectId]);

  useEffect(() => {
    fetch(`http://localhost:8000/subscription/?project_id=${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter inscrições.")
      )

  }, [projectId])


  useEffect(() => {
    q && fetch(`http://localhost:8000/subscription/?project_id=${projectId}&q=${q.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter inscrições.")
      )

    !q && fetch(`http://localhost:8000/subscription/?project_id=${projectId}`)
      .then((res) => res.json())
      .then((res) => {
        setSubscriptions(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter inscrições.")
      )

    q && cleanFilter()

  }, [q, projectId])

  let handleFilterChange = (event) => {
    setfilterRegistration({ ...filterRegistration, [event.target.name]: event.target.checked })
  }

  let cleanFilter = () => {
    setfilterRegistration({ 'approved': false, 'declined': false, 'pending': false, 'canceled': false })
    setFilterProject({ 'opened': false, 'closed': false })
  }

  let updateProjects = () => {
    setFilterProject(filterRegistration)
    setQ("")
    if (filterRegistration.approved === filterRegistration.declined === filterRegistration.pending === filterRegistration.canceled) {
      fetch(`http://localhost:8000/subscription/?project_id=${projectId}`)
        .then((res) => res.json())
        .then((res) => {
          setSubscriptions(res);
        })
        .catch((erro) =>
          alert("Não foi possível obter inscrições.")
        )
    }
    else {
      fetch(`http://localhost:8000/subscription/?project_id=${projectId}${filterRegistration.approved ? '&subscription_status=Aceita'
        : filterRegistration.declined ? '&subscription_status=Recusada'
          : filterRegistration.pending ? '&subscription_status=Pendente'
            : filterRegistration.canceled ? '&subscription_status=Cancelada'
              : ''
        }`)
        .then((res) => res.json())
        .then((res) => {
          setSubscriptions(res);
        })
        .catch((erro) =>
          alert("Não foi possível obter inscrições.")
        )
    }

    setFilterStatus(false)
  }


  return (
    <div className="manage-project-page">
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
                    value={q}
                    onChange={(event) => { setQ(event.target.value) }}
                  />
                </div>

                <div className="manage-projects-filter-field-container" ref={windowRef} >
                  <div className="manage-project-filter-field"
                    onClick={() => {
                      setFilterStatus(!filterStatus);
                      setfilterRegistration(filterProject)
                    }}>
                    <p>Todas as inscrições</p>
                    <FontAwesomeIcon className="manage-project-icon" icon={faChevronDown} />
                  </div>

                  {filterStatus &&

                    <div className="manage-projects-filter-dropdown">
                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="checkbox"
                          name="approved"
                          checked={filterRegistration.approved}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Aceita</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="checkbox"
                          name="declined"
                          checked={filterRegistration.declined}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Recusada</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="checkbox"
                          name="pending"
                          checked={filterRegistration.pending}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Pendente</span>
                      </label>

                      <label className="manage-projects-filter-option">
                        <input
                          className="manage-projects-filter-checkbox"
                          type="checkbox"
                          name="canceled"
                          checked={filterRegistration.canceled}
                          onChange={handleFilterChange}
                        >

                        </input>
                        <span className="manage-projects-filter-text">Cancelada</span>
                      </label>

                      <div className="manage-projects-filter-btn-container">
                        <button className="manage-projects-filter-btn" onClick={cleanFilter}>Limpar</button>
                        <button className="manage-projects-filter-btn" id="manage-projects-apply-btn" onClick={updateProjects}>Aplicar</button>
                      </div>
                    </div>
                  }
                </div>
              </div>

              {subscriptons &&
                (subscriptons.length >= 1) ?
                subscriptons.map(subscription => <ManageProjectSubscription subscription={subscription} subscriptions={subscriptons} setStateSubscriptions={setSubscriptions} project={project} />) :
                <p className="manage-project-no-subscriptions">Ainda não há inscrições</p>
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