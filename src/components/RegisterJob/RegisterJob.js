import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import fullLogo from '../../img//logo-color.png';




function RegisterJob(){

    const parameter = useParams();
    const projectId = parameter.id;
    const [vagas, setVagas] = useState();

  //get data from localhost port 8000
    useEffect( () => {
        fetch(`http://localhost:8000/projects`)
        .then(res => res.json())
        .then(res => {
        setVagas(res)
        })
        .catch(erro => alert(`Erro ao obter lista de projetos: ${erro}`))
        },[]
    )



    return(
        <div className="page">

            <NavLink to="/" exact>
            <img
                className="footer-logo"
                src={fullLogo}
                alt="logo-corrente-do-bem"
            ></img>
            </NavLink>


            



            {/* -------------------------------------------------------------------------------------------------------------- */}
            <div className="main">

                        <ul className="items-grid">
                          {vagas && vagas
                              .filter((vaga) => vaga.id === +projectId)
                              .map((vaga) => (
                                <li>{vaga.title} titulo</li>
                          ))}
                        </ul>


                <h1>Formulário de Inscrição</h1>
                <hr/>
                <form>
                    <div className="funcoes">
                        <p className="subtitle">Função</p>
                        <input type="radio" id="func1" className="func1" name="funcOptions" value="html" />
                        <label htmlFor="func1" className="label">Habilidade 01</label> <br/>

                        <input type="radio" id="func2" className="func2" name="funcOptions" value="html" />
                        <label htmlFor="func2" className="label">Habilidade 02</label> <br/>

                        <input type="radio" id="func3" className="func3" name="funcOptions" value="html" />
                        <label htmlFor="func3" className="label">Habilidade 03</label> <br/>
                    </div>
                    
                    <div className="mensagem">
                        <p className="subtitle">Mensagem <span className="optional">- Opcional</span></p>  

                        <textarea id="msg" className="msg" rows="6" cows="30" maxLength="150"/>
                    </div>

                    <div className="dadosPessoais">
                        <p><span>Não se esqueça de manter suas informações atualizadas!</span></p>

                        <p className="dados">Seu email de contato: email@email.com</p>

                        <p className="dados">Seu telefone é: (xx) x xxxx-xxxx</p>

                        <input type="checkbox" id="confirm" name="confirm" />

                        <label htmlFor="confirm">Eu declaroque minhas informações estão corretas</label>
                    </div>

                    <div className="confirmacoes">

                        <input type="checkbox" id="terms" name="terms" required/>{" "}
                        <label htmlFor="terms">Declaro que li e aceito os <NavLink to="/termos/voluntariado" target="_blank">termos de Voluntariado</NavLink></label>
                        
                    </div>
                    
                    <div className="botao">
                        <button className="btn-confirm" type="submit">
                            Confirmar inscrição na vaga
                        </button>
                        <p className="rodape">
                            Ao confirmar a inscrição você se compromete a fazer parte dessa vaga como voluntário.
                            A ONG será informada da sua inscrição e fará contato.
                        </p>
                    </div>
                        
                </form> 

                
            </div>

    
            

            
        </div>
    )
}

export default RegisterJob