import React from "react";
import { useLocation } from "react-router-dom";
import "./Search.css";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import projects from "../../data/projects.json";
import ProjectCart from "../../components/Spotlight/ProjectCart";

function Search() {

    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const q = searchParams.get('q');

    const filteredProjects = projects.filter((project) =>  
        (
            (project['title'].toLowerCase().indexOf(q.toLowerCase()) > -1) ||
            (project['address'].toLowerCase().indexOf(q.toLowerCase()) > -1) ||
            (project['institution_name'].toLowerCase().indexOf(q.toLowerCase()) > -1) ||
            (project['hability'].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)    
            
        )

    )

    const [locationTypeState, setLocationTypeState] = useState(false);

    return(
        <>
        <div className = "search-nav-container">
            <Navbar />
        </div>

        <div className = "search-container">

            <h2 className="search-title">Explore oportunidades de voluntariado</h2>
            <span className = "summary-results">
                {`${filteredProjects.length} ${filteredProjects.length === 1 ? 'resultado' : 'resultados'}`}
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
                {filteredProjects.map(project => (
                    <ProjectCart project = {project} key = {`search-${project.id}`}/>
                ))}
            </div>
        </div>


        <Footer />
        </>
    )
}

export default Search;