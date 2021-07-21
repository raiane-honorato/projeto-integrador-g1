import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//import projects from "../../data/projects.json";
import ProjectCart from "../../components/ProjectCart/ProjectCart";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const [filterStatus, setFilterStatus] = useState(false);
  const [filterState, setFilterState] = useState({
    remote: false,
    notRemote: false,
  });
  const [filterProject, setFilterProject] = useState({
    opened: false,
    closed: false,
  });
  const [s, setS] = useState("");
  const { user } = useContext(AuthContext);
  let windowRef = useRef();

  let handleFilterChange = (event) => {
    setFilterState({
      ...filterState,
      [event.target.name]: event.target.checked,
    });
  };

  let cleanFilter = () => {
    setFilterState({ remote: false, notRemote: false });
    setFilterProject({ opened: false, closed: false });
  };

  let updateProjects = () => {
    setFilterProject(filterState);
    setS("");
    if (filterState.remote === filterState.notRemote) {
      fetch(
        `http://localhost:8000/projects/`
      )
        .then((res) => res.json())
        .then((res) => {
          setProjects(res);
        })
        .catch((erro) => alert("Não foi possível obter dados dos projetos."));
    } else {
      fetch(
        `http://localhost:8000/projects/?${
          filterState.remote
            ? "local_type=remoto"
            : filterState.notRemote
            ? "local_type=local"
            : ""
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          setProjects(res);
        })
        .catch((erro) => alert("Não foi possível obter dados dos projetos."));
    }

    setFilterStatus(false);
  };

  //getting project list from JSON server on 8000
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch(" http://localhost:8000/projects")
      .then((res) => res.json())
      .then((res) => {
        setProjects(res);
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, []);

  // q search parameter
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const q = searchParams.get("q");

  //filter project list by q parameter
  const [filteredProjects, setFilteredProjects] = useState(null);

  useEffect(() => {
    projects &&
      setFilteredProjects(
        projects
          .filter(
            (project) =>
              project["title"]
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .indexOf(
                  q
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                ) > -1
          )
          .sort((a, b) => {
            return b.popularity - a.popularity;
          })
      );
  }, [projects, q]);

  // filter states
  const [locationTypeState, setLocationTypeState] = useState(false);

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [displayProjects, setDisplayProjects] = useState(null);

  const projectsPerPage = 10;
  const [projectsViewd, setProjectsViewd] = useState(
    pageNumber * projectsPerPage
  );

  useEffect(() => {
    filteredProjects &&
      setPageCount(Math.ceil(filteredProjects.length / projectsPerPage));
  }, [filteredProjects]);

  useEffect(() => {
    filteredProjects &&
      setDisplayProjects(
        filteredProjects
          .slice(projectsViewd, projectsViewd + projectsPerPage)
          .map((project) => {
            return (
              <ProjectCart project={project} key={`search-${project.id}`} />
            );
          })
      );
  }, [filteredProjects, projectsViewd]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setProjectsViewd(selected * projectsPerPage);
  };

  return (
    <>
      <Navbar />

      <div className="search-container">
        <h2 className="search-title">Explore oportunidades de voluntariado</h2>
        <span className="summary-results">
          {filteredProjects &&
            `${filteredProjects.length} ${
              filteredProjects.length === 1 ? "resultado" : "resultados"
            }`}
        </span>

        <div className="search-filter-container">
          <div className="search-filter-button-div address">
            <button className="search-filter-button address">Cidade</button>
          </div>

          <div
            className="remote-search-filter-field-container"
            ref={windowRef}
          >
            <div
              className="search-filter-button location-type"
              onClick={() => {
                setFilterStatus(!filterStatus);
                setFilterState(filterProject);
              }}
            >
              <p>Remoto</p>
              <FontAwesomeIcon
                className="manage-projects-icon"
                icon={faChevronDown}
              />
            </div>

            {filterStatus && (
              <div className="manage-projects-filter-dropdown">
                <label className="manage-projects-filter-option">
                  <input
                    className="manage-projects-filter-checkbox"
                    type="checkbox"
                    name="remote"
                    checked={filterState.remote}
                    onChange={handleFilterChange}
                  ></input>
                  <span className="manage-projects-filter-text">Sim</span>
                </label>
                <label className="manage-projects-filter-option">
                  <input
                    className="manage-projects-filter-checkbox"
                    type="checkbox"
                    name="notRemote"
                    checked={filterState.notRemote}
                    onChange={handleFilterChange}
                  ></input>
                  <span className="manage-projects-filter-text">Não</span>
                </label>
                <div className="manage-projects-filter-btn-container">
                  <button
                    className="manage-projects-filter-btn"
                    onClick={cleanFilter}
                  >
                    Limpar
                  </button>
                  <button
                    className="manage-projects-filter-btn"
                    id="manage-projects-apply-btn"
                    onClick={updateProjects}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="search-filter-button-div hability">
            <button className="search-filter-button hability">
              Habilidade
            </button>
          </div>

          <div className="search-filter-button-div cause">
            <button className="search-filter-button cause">Causa</button>
          </div>
        </div>

        <div className="search-card-container">
          {filteredProjects && displayProjects}
        </div>
        <div className="search-pagination-container">
          {filteredProjects && (
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Próximo"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Search;
