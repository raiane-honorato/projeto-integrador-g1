import React from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

//import projects from "../../data/projects.json";
import ProjectCart from "../../components/ProjectCart/ProjectCart";

function Search() {

      //getting project list from JSON server on 8000
    const [projects, setProjects] = useState(null);
    
    useEffect( () => {
        fetch(" http://localhost:8000/projects")
        .then(res => res.json())
        .then(res => {
            setProjects(res)
        })
        .catch(erro => alert(`Erro ao obter lista de projetos: ${erro}`))
    },[]
    )
    
    // q search parameter
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const q = searchParams.get('q');

    //filter project list by q parameter
    const [filteredProjects, setFilteredProjects] = useState(null);

    useEffect(() => {
        projects && setFilteredProjects( projects.filter((project) =>  
        (
            (project['title'].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) > -1)          
        )).sort((a,b) => {return(b.popularity - a.popularity)})
    )
    },[projects, q])
    
    // filter states
    const [locationTypeState, setLocationTypeState] = useState(false);

    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [displayProjects, setDisplayProjects] = useState(null);
    
    const projectsPerPage = 10;
    const [projectsViewd,setProjectsViewd] = useState(pageNumber * projectsPerPage);

    useEffect( () => {
        filteredProjects && setPageCount(Math.ceil(filteredProjects.length / projectsPerPage))
    },[filteredProjects])

    useEffect( () => {
        filteredProjects && setDisplayProjects(filteredProjects.slice(projectsViewd, projectsViewd + projectsPerPage)
    .map(project => {
       return (<ProjectCart project = {project} key = {`search-${project.id}`}/>)
    }))
    },[filteredProjects, projectsViewd])

    
    const changePage = ( {selected} ) => {
        setPageNumber(selected);
        setProjectsViewd( selected * projectsPerPage)
    };


    return(
        <>
            <Navbar />

        <div className = "search-container">

            <h2 className="search-title">Explore oportunidades de voluntariado</h2>
            <span className = "summary-results">
                {filteredProjects && `${filteredProjects.length} ${filteredProjects.length === 1 ? 'resultado' : 'resultados'}`}
            </span>

            <div className = "search-filter-container">

                <div className = "search-filter-button-div address">
                    <button className = "search-filter-button address">Cidade</button>
                </div>                    
                
                <div className="search-filter-button-div location-type">
                    <button className = "search-filter-button location-type" onClick = {() => {
                        setLocationTypeState(!locationTypeState)
                        }}>Remoto/Local</button>
                    <div className={locationTypeState ? "search-filter-settings location-type" : "search-filter-settings location-type set-vis"}>
                        <label id="f-lt-1">
                            <input id="f-lt-1" type="checkbox"></input>
                            <span className="search-settings-text">Remoto</span>
                        </label>
                        <label id="f-lt-2">
                            <input id="f-lt-2" type="checkbox"></input>
                            <span className="search-settings-text">Local</span>
                        </label>
                        <button className="search-settings-button">Aplicar</button>
                    </div>
                </div>

                <div className = "search-filter-button-div hability">
                    <button className = "search-filter-button hability">Habilidade</button>
                </div>

                <div className="search-filter-button-div cause">
                    <button className = "search-filter-button cause">Causa</button>
                </div>
            </div>

            <div className="search-card-container">
                {filteredProjects && displayProjects}
            </div>
            <div className="search-pagination-container">
               {filteredProjects && <ReactPaginate 
                    previousLabel = {"Anterior"}
                    nextLabel = {"Próximo"}
                    pageCount = {pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    
                />}
            </div>
        </div>


        <Footer />
        </>
    )
}

export default Search;