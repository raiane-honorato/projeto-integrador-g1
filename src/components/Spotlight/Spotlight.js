import "./spotlight.css";
import barber from "../../img/barber.svg";
import artist from "../../img/artist2.svg";
import dev from "../../img/dev.svg";
import cooking from "../../img/cooking.svg";
import medical_care from "../../img/medical_care.svg";
import music from "../../img/music.svg";
import sports from "../../img/sports.svg";
import teacher from "../../img/teacher.svg";
import workout from "../../img/workout.svg";
import ecologial_cause from "../../img/ecological_cause.svg";
import meditation from "../../img/meditation.svg";
import personal from "../../img/personal.svg";


function Spotlight() {
  return (
    <>
      <section className="spotlight-section spotlight-section-one">
        <div className="spotlight-section-one-content">
          <h2>Deixe suas habilidades aflorarem...</h2>
          <div className="habilities-grid">
            <div className="hability-img-div">
              <img className="hability-img" src={barber} alt="Barbearia" />
              Barbearia
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={artist} alt="Artes" />
              Artes
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={dev} alt="Programação" />
              Programação
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={music} alt="Música" />
              Música
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={cooking} alt="Culinária" />
              Culinária
            </div>
            <div className="hability-img-div">
              <img
                className="hability-img"
                src={medical_care}
                alt="Medicina e Enfermagem"
              />
              Medicina e Enfermagem
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={teacher} alt="Educação" />
              Educação
            </div>
            <div className="hability-img-div">
              <img
                className="hability-img"
                src={workout}
                alt="Dança e Musculação"
              />
              Dança
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={sports} alt="Esportes" />
              Esportes
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={ecologial_cause} alt="Meio-ambiente" />
              Meio-ambiente
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={meditation} alt="Meditação" />
              Meditação
            </div>
            <div className="hability-img-div">
              <img className="hability-img" src={personal} alt="personal" />
              Atividades físicas
            </div>
          </div>
        </div>
      </section>
      <section className="spotlight-section spotlight-section-two">


    {/* Vagas em destaque */}

        <h2>As mais desejadas...</h2>
        <div className="job-cards">
      
          <div className="card">
            
            <div class="card-image-div">
              <img
                className="card-image"
                alt="orphanatofalt"
                src="https://images.unsplash.com/photo-1445985543470-41fba5c3144a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
              />
            </div>
            <div className="card-content">
              <h3 className="job-title">Professor(a) de Música</h3>
              
              <p className="job-schedule">
                <strong>Horários: </strong>Turno verspestino. Oito (8) horas por
                semana.
              </p>
              <p><strong>Categoria: </strong> Música</p>
            </div>
          </div>
  
          <div className="card">
            <div class="card-image-div">
              <img
                className="card-image"
                alt="orphanatofalt"
                src="https://images.unsplash.com/photo-1518148750009-25b2522df9c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              />
            </div>
            <div className="card-content">
              <h3 className="job-title">Cozinheira(o)</h3>
              
              <p className="job-schedule">
                <strong>Horários: </strong>Turno verspestino. Oito (8) horas por
                semana.
              </p>
              <p><strong>Categoria: </strong> Culinária</p>
            </div>
          </div>

          <div className="card">
            <div class="card-image-div">
              <img
                className="card-image"
                alt="orphanatofalt"
                src="https://images.unsplash.com/photo-1518148750009-25b2522df9c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              />
            </div>
            <div className="card-content">
              <h3 className="job-title">Cozinheira(o)</h3>
             
              <p className="job-schedule">
                <strong>Horários: </strong>Turno verspestino. Oito (8) horas por
                semana.
              </p>
              <p><strong>Categoria: </strong> Música</p>
            </div>
          </div>

          <div className="card">
            <div class="card-image-div">
              <img
                className="card-image"
                alt="orphanatofalt"
                src="https://images.unsplash.com/photo-1518148750009-25b2522df9c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80"
              />
            </div>
            <div className="card-content">
              <h3 className="job-title">Cozinheira(o)</h3>
             
              <p className="job-schedule">
                <strong>Horários: </strong>Turno verspestino. Oito (8) horas por
                semana.
              </p>
              <p><strong>Categoria: </strong> Culinária</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Spotlight;