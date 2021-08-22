import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import ProjectCart from "../../components/ProjectCart/ProjectCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import Loader from "../../components/Loader/Loader";
import SearchFilterOption from "../../components/SearchFilters/SearchFilterOption";

function Search() {

  // q search parameter
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const q = searchParams.get("q");

  const [projects, setProjects] = useState(null);
  const [causes, setCauses] = useState();
  const [habilities, setHabilities] = useState();
  const [filterStatus, setFilterStatus] = useState(
    {
      'local_type': false,
      'cause': false,
      'hability': false
    }
  );
  const [filterParams, setFilterParams] = useState({
    'q': q,
    'cause': '',
    'hability': '',
    'local_type': ''
  })
  const [loading, setLoading] = useState(false);

  //dealing with outside click to close the component
  let windowRef1 = useRef();
  let windowRef2 = useRef();
  let windowRef3 = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!windowRef1.current.contains(event.target) &&
        !windowRef2.current.contains(event.target) &&
        !windowRef3.current.contains(event.target)) {
        setFilterStatus({
          'local_type': false,
          'cause': false,
          'hability': false
        })
      }
    }
    filterStatus && document.addEventListener("mousedown", handler);

    return () => {
      filterStatus && document.removeEventListener("mousedown", handler)
    }
  }, [filterStatus])


  useEffect(() => {
    setLoading(true)
    api.get(`/project`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false)
      })
      .catch((erro) => alert(`Erro ao obter lista de projetos: ${erro}`));
  }, []);

  useEffect(() => {
    api.get(`/cause`)
      .then((res) => {
        setCauses(res.data);
      })
      .catch((erro) => alert(`Erro ao obter lista de causas: ${erro}`));
  }, []);

  useEffect(() => {
    api.get(`/hability`)
      .then((res) => {
        setHabilities(res.data);
      })
      .catch((erro) => alert(`Erro ao obter lista de habilidades: ${erro}`));
  }, []);


  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [displayProjects, setDisplayProjects] = useState(null);

  const projectsPerPage = 10;
  const [projectsViewd, setProjectsViewd] = useState(
    pageNumber * projectsPerPage
  );

  useEffect(() => {
    setLoading(true);
    setProjects("");
    let params = `/project`
    let condition = "?"
    if(filterParams.q){
      params += condition + "q=" + filterParams.q
      condition = "&"
    }
    if(filterParams.local_type){
      params += condition + "local_type=" + filterParams.local_type
      condition = "&"
    }
    if(filterParams.cause){
      params += condition + "cause_id=" + filterParams.cause.id
      condition = "&"
    }
    if(filterParams.hability){
      params += condition + "hability_id=" + filterParams.hability.id
      condition = "&"
    }
    
    api.get(params)
    .then(res => {
      setProjects(res.data)
      setLoading(false)
      setFilterStatus({
        'local_type': false,
        'cause': false,
        'hability': false
      })
    })
    
    
    }, [filterParams])

  useEffect(() => {
    projects &&
      setPageCount(Math.ceil(projects.length / projectsPerPage));
  }, [projects]);

  useEffect(() => {
    projects &&
      setDisplayProjects(
        projects
          .slice(projectsViewd, projectsViewd + projectsPerPage)
          .map((project) => {
            return (
              <ProjectCart project={project} key={`search-${project.id}`} />
            );
          })
      );
  }, [projects, projectsViewd]);

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
          {projects &&
            `${projects.length} ${projects.length === 1 ? "resultado" : "resultados"
            }`}
        </span>

        {/* q search */}
        <div className="search-filter-container">
          <div className="search-field-filter-q">
            <FontAwesomeIcon className="manage-projects-icon" icon={faSearch} />
            <input
              className="search-filter-q"
              type="text"
              placeholder="Palavra chave, instituição ou cidade"
              value={filterParams.q}
              onChange={(event) => setFilterParams({...filterParams, 'q':event.target.value})}
            // value={searchCity}
            // onChange={(event) => {
            //   setSearchCity(event.target.value);
            // }}
            />
          </div>

          {/* local_type filter */}
          <div className="remote-search-filter-field-container" ref={windowRef1}>
            <div
              className="search-filter-button location-type"
              onClick={() => {
                setFilterStatus({
                  'local_type': !filterStatus.local_type,
                  'cause': false,
                  'hability': false
                })
                
              }}
            >
              <p>{filterParams.local_type == "remoto" ? "Remoto" : filterParams.local_type == "local" ? "Presencial" : "Localização"}</p>
              <FontAwesomeIcon
                className="manage-projects-icon"
                icon={faChevronDown}
              />
            </div>

            {filterStatus.local_type && (
              <div className="manage-projects-filter-dropdown">
                <label className="manage-projects-filter-option">
                  <input
                    className="manage-projects-filter-checkbox"
                    type="radio"
                    name="remoto"
                    checked={filterParams.local_type == "remoto"}
                    onChange={(event) => setFilterParams({ ...filterParams, 'local_type': event.target.name })}
                  ></input>
                  <span className="manage-projects-filter-text">Remoto</span>
                </label>
                <label className="manage-projects-filter-option">
                  <input
                    className="manage-projects-filter-checkbox"
                    type="radio"
                    name="local"
                    checked={filterParams.local_type == "local"}
                    onChange={(event) => setFilterParams({ ...filterParams, 'local_type': event.target.name })}
                  ></input>
                  <span className="manage-projects-filter-text">Presencial</span>
                </label>
              </div>
            )}
          </div>


          {/* cause filter */}
          <div className="remote-search-filter-field-container" ref={windowRef2}>
            <div
              className="search-filter-button location-type"
              onClick={() => {
                setFilterStatus({
                  'local_type': false,
                  'cause': !filterStatus.cause,
                  'hability': false
                })
              }}
            >
              <p>{filterParams.cause?filterParams.cause.label : "Causas"}</p>
              <FontAwesomeIcon
                className="manage-projects-icon"
                icon={faChevronDown}
              />
            </div>

            {filterStatus.cause && (
              <div className="manage-projects-filter-dropdown">
                {causes &&
                  causes.map(cause => <SearchFilterOption entity={cause} type="cause" filterParams={filterParams} setFilterParams={setFilterParams} setFilterStatus={setFilterStatus} />)
                }
              </div>
            )}
          </div>

          {/* hability filter */}
          <div className="remote-search-filter-field-container" ref={windowRef3}>
            <div
              className="search-filter-button location-type"
              onClick={() => {
                setFilterStatus({
                  'local_type': false,
                  'cause': false,
                  'hability': !filterStatus.hability
                })
              }}
            >
              <p>{filterParams.hability?filterParams.hability.label : "Habilidades"}</p>
              <FontAwesomeIcon
                className="manage-projects-icon"
                icon={faChevronDown}
              />
            </div>

            {filterStatus.hability && (
              <div className="manage-projects-filter-dropdown">
                {habilities &&
                  habilities.map(hability => <SearchFilterOption entity={hability} type="hability" filterParams={filterParams} setFilterParams={setFilterParams} setFilterStatus={setFilterStatus} />)
                }
              </div>
            )}
          </div>

          {(filterParams.q || filterParams.cause || filterParams.hability || filterParams.local_type) &&
            <button className="manage-project-clean-filters-btn"
              onClick={(event) => setFilterParams({
                'q': '',
                'cause': '',
                'hability': '',
                'local_type': ''
              })}>Limpar</button>}

        </div>

        <div className="search-card-container">
          {loading && <Loader />}
          {projects && displayProjects}
        </div>
        <div className="search-pagination-container">
          {projects && (
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
