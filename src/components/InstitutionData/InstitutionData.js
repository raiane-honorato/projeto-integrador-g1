import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useParams } from "react-router";
import "./institutiondata.css";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectCart from "../ProjectCart/ProjectCart";
import EditButton from "../Edit/EditButton";
import InstitutionFirstEdition from "../Edit/InstitutionFirstEdition";


function InstitutionData() {
  const parameter = useParams();
  const institutionId = parameter.id;
  const [institution, setInstitution] = useState("");
  const [causes, setCauses] = useState([]);
  const [projects, setProjects] = useState("");
  const { user } = useContext(AuthContext);

  //states of content edition
  const [firstEditState, setFirstEditState] = useState(false);
  const [secondEditState, setSecondEditState] = useState(false);
  const [thirdEditState, setThirdEditState] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/institution/${institutionId}`)
      .then((res) => res.json())
      .then((res) => {
        setInstitution(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter dados dessa instituição.")
      );
  }, [institutionId]);

  useEffect(() => {
    fetch(`http://localhost:8000/projects/?institution_id=${institutionId}`)
      .then((res) => res.json())
      .then((res) => {
        setProjects(res);
      })
      .catch((erro) =>
        alert("Não foi possível obter dados dessa instituição.")
      );
  }, [institutionId]);

  useEffect(() => console.log(user),[])

  useEffect(() => {
  
    let requests = institution && (institution.cause_id.map( (cause_id) => {
      
      return (fetch(`http://localhost:8000/cause/${cause_id}`)
      .then(res => res.json())
      )
    }
    ))

    Promise.all(requests)
    .then(p => setCauses(p))
    .catch(err => alert("Não foi possível obter as causas"))

  }
  ,[institution]);


  return (
    <>
    <div className="institution-data-profile">
      {institution && (
        <>
        <div className = "institution-first-section-profile">
          {user.institution_id == institutionId && <EditButton editClass = "institution-first-edit" setStatePass = {setFirstEditState}/>}
          <img className = "institution-profile-pic" src = {institution.img} />
          <div>
            <span className = "institution-city">{`${institution.city}, ${institution.state}`}</span>
            <h2 className = "institution-name">{institution.institution_name}</h2>
            <p className = "institution-summary">{institution.summary}</p>
            {causes &&
            causes.map(cause => (
              <>
              <span className = "institution-cause-bullet-point"></span>
              <span className = "institution-cause" key = {`cause-${cause.id}`}>{cause.name}</span>
              </>
            ))}
          </div>
        </div>
        <div className='institution-grid-container'>
          
          <div className='institution-project-list'>
            <h3>Projetos de voluntariado</h3>
              {
                projects && projects.map(project => <ProjectCart project = {project} key = {`search-${project.id}`}/>)
              }

          </div>  
          
          <div className="institution-second-column"> 
            <div className='institution-information'>
            {user.institution_id == institutionId && <EditButton editClass = "institution-second-edit" setStatePass = {setSecondEditState}/>}
              <div className="institution-address">
                <h3>Endereço</h3>      
                <span>{institution.street}, </span>     
                <span>{institution.address_number},  </span>     
                <span>{institution.complement}</span>     
                <span>{institution.city}</span>   
                <span>, {institution.state}.</span>    
              </div>
              <div className="institution-social-contacts">
                <h3>Contatos</h3>   
                <p><strong>Telefone: </strong>{institution.phone}</p>
                <strong>Site: </strong> <a href={institution.site} target='_blank' rel="noreferrer"> {institution.site}</a>  
                <div className="institution-social-media">                 
                    <div className="institution-social-media-icon">
                      <a href={institution.instagram} target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" alt="Instagram" /></a>
                    </div>      
                    <div className="institution-social-media-icon">
                      <a href={institution.facebook} target='_blank' rel="noreferrer"> <FontAwesomeIcon
                      icon={faFacebookSquare}
                      size="2x"
                      alt="Facebook"
                    /></a>
                    </div>                                  
                  </div>
                </div>
            </div>
            <div className='institution-information'>
            {user.institution_id == institutionId && <EditButton editClass = "institution-second-edit" setStatePass = {setThirdEditState}/>}
              <h3>Sobre a Instituição</h3>
              <p>{institution.bio}</p>
            </div>  
          </div>    
        </div>
        </>
      )}
    </div>

    <div 
      className = {`institution-overlay ${(firstEditState || secondEditState || thirdEditState) ? "institution-set-vis" : ""}`}
      onClick = {() => {
        setFirstEditState(false)
        setSecondEditState(false)
        setThirdEditState(false)
      }}
      > </div>

      {firstEditState && <InstitutionFirstEdition setStatePass = {setFirstEditState} setStateInstitution = {setInstitution} institution = {institution} causes = {causes} />}

    </>
  );
}

export default InstitutionData;
