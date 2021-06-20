import { NavLink } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";



function TermosVoluntariado(){
    return(
        <>
          
            <div className="terms">

                <h1 className="title">Termo de Voluntariado</h1>

                <div className="nossosTermos">
                    <p>
                        1. Pelo presente Termo de Adesão, o VOLUNTÁRIO decide espontaneamente realizar atividade 
                        voluntária na ORGANIZAÇÃO, nos termos e condições claramente expostas no programa de 
                        voluntariado ora anunciado e aceito, ciente do disposto na Lei nº 9.608, de 18/02/1998.
                    </p>

                        <p className="subP">
                            1.1.1. O VOLUNTÁRIO declara que o mesmo não é atividade remunerada, não representa vínculo 
                            empregatício nem gera obrigações de natureza trabalhista, previdenciária ou afim.
                        </p>

                        <p className="subP">
                            1.1.2. Declara, ainda, ter ciência de que eventuais danos pessoais ou materiais no exercício do 
                            voluntariado não serão imputados à ORGANIZAÇÃO ou ao CORRENTE DO BEM, assumindo desde já integral 
                            responsabilidade pelos riscos.
                        </p>
                    

                    <p>
                        2. O VOLUNTÁRIO cede à ORGANIZAÇÃO e ao CORRENTE DO BEM, à título gratuito, os direitos de uso de imagem
                        relativos às fotografias e gravações realizadas durante o programa de voluntariado para difusão
                        publicitária, midiática e para quaisquer outros usos que a ORGANIZAÇÃO e o CORRENTE DO BEM julgarem convenientes.
                        A cessão dos direitos de uso dessas imagens será por prazo indeterminado, sem restrições territoriais,
                        para todo e qualquer veículo de mídia (online e off-line), exclusivamente com a finalidade de divulgação
                        dos trabalhos objeto deste termo.
                    </p>
                </div>     

                <hr/>

                <div className="artigos">
                    <p>
                        Art. 1º Considera-se serviço voluntário, para os fins desta Lei, a atividade não remunerada prestada por pessoa 
                        física a entidade pública de qualquer natureza ou a instituição privada de fins não lucrativos que tenha objetivos 
                        cívicos, culturais, educacionais, científicos, recreativos ou de assistência à pessoa. Parágrafo único. O serviço 
                        voluntário não gera vínculo empregatício, nem obrigação de natureza trabalhista previdenciária ou afim.
                    </p>

                    <p>
                        Art. 2º O serviço voluntário será exercido mediante a celebração de termo de adesão entre a entidade, pública ou 
                        privada, e o prestador do serviço voluntário, dele devendo constar o objeto e as condições de seu exercício.
                    </p>

                    <p>
                        Art. 3º O prestador do serviço voluntário poderá ser ressarcido pelas despesas que comprovadamente realizar no 
                        desempenho das atividades voluntárias. Parágrafo único. As despesas a serem ressarcidas deverão estar 
                        expressamente autorizadas pela entidade a que for prestado o serviço voluntário.
                    </p>

                    <p>
                        Art. 4º Esta Lei entra em vigor na data de sua publicação. 
                    </p>

                    <p>
                        Art. 5º Revogam-se as disposições em contrário. (http://www.planalto.gov.br/ccivil_03/LEIS/L9608compilado.htm)
                    </p>'
                </div>
                
            </div>   

            <Footer />
        </>
          
    )
}

export default TermosVoluntariado