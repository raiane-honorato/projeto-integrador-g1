import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./institutiondata.css";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InstitutionData() {
  const parameter = useParams();
  const institutionId = parameter.id;
  const [institution, setInstitution] = useState("");
  const [causes, setCauses] = useState([]);

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
    <div className="institution-data-profile">
      {institution && (
        <>
        <div className = "institution-first-section-profile">
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
          <div className='institution-basic-information'>

            <h3>Sobre a Instituição</h3>
            <p>{institution.bio}</p>
          </div>  
          <div className='institution-other-information'>
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
        </div>
        </>
      )}
    </div>
  );
}

export default InstitutionData;
