import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import './vacant.css';

function Vacant() {

  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/felipeblobo/felipeblobo.github.io/main/projects.json`)
      .then((res) => res.json())
      .then((res) => setVagas(res))
      .catch(erro => alert(`Erro ao obter dados sobre a vaga: ${erro}`))
    },[]) 
  return (
    <>
    {vagas.map(vaga => (
      <div className='vacant-container'>
      <div className='vacant-header'>
        <img src='https://source.unsplash.com/random' alt='vaga'/>
        <h2>{vaga.title}</h2>
      </div>
      <div className='vacant-provider'>
        <span>{vaga.institution_name}</span>
        <span>{vaga.address}</span>
        <span>{vaga.local_type}</span>
      </div>
      <div className='vacant-details'>
        <p>{vaga.description}</p>
        <p>{vaga.hability}</p>
        <p>{vaga.cause}</p>
      </div>   
    </div>
    ))}      
      <Footer />
    </>
  )
}

export default Vacant
