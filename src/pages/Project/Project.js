import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./project.css";

function ProjectPage() {
  const parameter = useParams();
  const projectId = parameter.id;

  const [vaga, setVaga] = useState();
  const [causes, setCauses] = useState([]);
  const [habilities, setHabilities] = useState([]);

  //get data from localhost port 8000
  useEffect(() => {
    fetch(`http://localhost:8000/projects/${projectId}`)
    .then(res => res.json())
    .then(res => {
      setVaga(res)
    })
    .catch(erro => alert(`Erro ao obter lista de projetos: ${erro}`))
},[]
)

useEffect(() => {
  
    let requests = vaga && (vaga.cause_id.map( (cause_id) => {
    
    return (fetch(`http://localhost:8000/cause/${cause_id}`)
    .then(res => res.json())
    )
  }
  ))

  Promise.all(requests)
  .then(p => setCauses(p))
  .catch(err => console.log(err))

}
,[vaga]);


useEffect(() => {
  
  let requests2 = vaga && (vaga.hability_id.map( (hability_id) => {
    
    return (fetch(`http://localhost:8000/cause/${hability_id}`)
    .then(res => res.json())
    )
  }
  ))

  Promise.all(requests2)
  .then(p => setHabilities(p))
  .catch(err => console.log(err))

}
,[vaga]);



  return (
    <div id="page-container">
      <Navbar />
      {vaga &&
       (
            <div key={vaga.id} className="project-container">
              <div className="project-title">
                <h2>{vaga.title}</h2>
               
              </div>
         
              <div className="grid-project">
                <div className="project-image-div">
                  <img src={vaga.img} alt="vaga" />
                </div>
                <div className="project-information">
                  <div className="project-provider">
                    <h3>{vaga.institution_name}</h3>
                    <hr/>
                    <span>Cidade: {vaga.address}</span>
                    <span>Remoto: {vaga.local_type}</span>
                  </div>
                  <div className="project-details">
                    <p>{vaga.description}</p>
                    <div className="habilities">
                      {habilities && <span>Habilidades:</span>}
                      {habilities &&
                        habilities.map((hability) => (
                          <span key={hability.id}>{hability.name}</span>
                        ))}
                    </div>
                    <div className="causes">
                      <span>Causas:</span>
                      {causes &&
                        causes.map((cause) => (
                          <span key={cause.id}>{cause.name}</span>
                        ))}
                    </div>
                  <button className='project-btn'>Quero a Vaga</button>
                  </div>
                </div>
              </div>
            </div>
          )}
      <Footer />
    </div>
  );
}

export default ProjectPage;
