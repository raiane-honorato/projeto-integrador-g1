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

  return (
    <div className="institution-data-profile">
      {institution && (
        <div className='institution-grid-container'>
          <div className='institution-basic-information'>
            <h1>{institution.institution_name}</h1>
            <span>CNPJ: {institution.cnpj}</span>
            <p>{institution.summary}</p>
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
                    <a href={institution.site} target='_blank' rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" alt="Instagram" /></a>
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
      )}
    </div>
  );
}

export default InstitutionData;
