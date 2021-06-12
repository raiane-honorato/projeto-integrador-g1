import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./institutiondata.css";

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
            <p>{institution.summary}</p>
            <p>{institution.bio}</p>
          </div>  
          <div className='institution-other-information'>
            <div>
              <h3>Endereço</h3>
            
            </div>
          </div>     
        </div>
      )}
    </div>
  );
}

export default InstitutionData;
