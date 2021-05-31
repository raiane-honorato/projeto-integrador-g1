import { useState } from "react";
import MaskedInput from "./formComponents/MaskedInput";
import "./userform.css";

function InstFormulario() {
  const [values, setValues] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const blocklist = ["puta", "merda", "shit", "karalho", "caralho"];

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  // Formulário multi etapas

  function handleNextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function handlePreviousStep() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  const steps = [
    {
      id: "dados-base",
      title: "Sobre a ONG",
    },
    {
      id: "dados-base2",
      title: "Sobre a ONG",
    },
    {
      id: "contatos",
      title: "Contatos",
    },
    {
      id: "sobre-ong",
      title: "Mais detalhes",
    },
  ];

  return (
    <>
      <h1 className="instituition-form-title">Cadastre sua Instituição</h1>
      <form className="instForm">
        {steps[currentStep].id === "dados-base" && (
          <div className="dados-base">
            <div className="inputs">
              <label htmlFor="nomeOng">Nome da Ong</label>
              <input
                type="text"
                name="ongName"
                id="ongName"
                value={values.name}
                onChange={handleSubmit}
                minLength="3"
                maxLength="100"
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="resumo">Resumo da Ong</label>
              <textarea
                name="resumo"
                id="resumo"
                rows="3"
                cols="50"
                minLength="10"
                maxLength="180"
                value={values.resumo}
                onChange={handleSubmit}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                name="endereco"
                id="endereco"
                value={values.endereco}
                onChange={handleSubmit}
                minLength="3"
                maxLength="100"
                required
              />
            </div>
          </div>
        )}

        {steps[currentStep].id === "dados-base2" && (
          <div className="dados-base2">
            <div className="inputs">
              <label htmlFor="causas">Causas</label>
              <input
                type="text"
                name="causas"
                id="causas"
                value={values.causas}
                onChange={handleSubmit}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="numBeneficiados">Numero de Beneficiádos</label>
              <input
                type="number"
                name="numBeneficiados"
                id="numBeneficiados"
                value={values.numBeneficiados}
                onChange={handleSubmit}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="cnpj">CNPJ</label>
              <MaskedInput
                name="cnpj"
                id="cnpj"
                mask="99.999.999/9999-99"
                value={values.cnpj}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {steps[currentStep].id === "contatos" && (
          <div className="contatos">
            <div className="inputs">
              <label htmlFor="telOng">Telefone</label>
              <MaskedInput
                name="telOng"
                id="telOng"
                mask="(99) 9 9999-9999"
                value={values.telOng}
                onChange={handleChange}
              />
            </div>

            <div className="inputs">
              <label htmlFor="email">E-Mail</label>
              <input
                type="text"
                id="email"
                name="email"
                minLength="6"
                maxLength="100"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputs">
              <label htmlFor="site">Site</label>
              <input
                type="url"
                id="site"
                name="site"
                minLength="5"
                maxLength="100"
                value={values.site}
                onChange={handleChange}
              />
            </div>

            <div className="inputs">
              <label htmlFor="facebook">Facebook (URL)</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                minLength="5"
                maxLength="100"
                value={values.facebook}
                onChange={handleChange}
              />
            </div>

            <div className="inputs">
              <label htmlFor="instagram">Instagram (URL)</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                minLength="5"
                maxLength="100"
                value={values.instagram}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {steps[currentStep].id === "sobre-ong" && (
          <div className="sobre">
            <div className="inputs">
              <label htmlFor="descricao">Descrição da Ong</label>
              <textarea
                name="descricao"
                id="descricao"
                rows="6"
                cols="50"
                minLength="10"
                maxLength="180"
                value={values.descricao}
                onChange={handleSubmit}
                required
              />
            </div>
          </div>
        )}

        <div className="btn-div">
          {currentStep > 0  && (
  
              <button
                className="btn-form btn-previous"
                type="button"
                onClick={handlePreviousStep}
              >
                Voltar
              </button>
            
          )}

          {currentStep < steps.length - 1 && (
            <button
              className="btn-form btn-next"
              type="button"
              onClick={handleNextStep}
            >
              Próximo
            </button>
          )}

            {currentStep === steps.length - 1 && (
          <button className="btn-form btn-submit" type="submit">
            Cadastrar
          </button>
            )}

          
        </div>

        {/* <div className="buttons">
          <div className="inputs">
            <input
              type="submit"
              value="Cadastrar"
              className="btn-form btn-submit"
            />
          </div>
        </div> */}
      </form>
    </>
  );
}

export default InstFormulario;
