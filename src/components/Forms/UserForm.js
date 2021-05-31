import { useState } from "react";
import MaskedInput from "./formComponents/MaskedInput";
import './userform.css';

function Formulario() {
  const [values, setValues] = useState({});
  const [currentStep, setCurrentStep] = useState(0);


  const blocklist = ["puta", "merda", "shit", "karalho", "caralho"];

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function teste() {
    if (values.nome != undefined) {
      console.log(values.nome.length);
    }
  }

  function handleSubmit(event) {
    const nome = values.nome;
    const email = values.email;
    const senha = values.senha;
    const confirmSenha = values.confSenha;

    const nomeSemEspaco = nome.trim();

    const emailSemEspaco = email.trim();
    const senhaSemEspaco = senha.trim();
    const confSenhaSemEspaco = confirmSenha.trim();

    const nomeESobrenome = nomeSemEspaco
      .split(" ")
      .filter((nome) => nome !== "" || nome !== "");

    const nomeImproprio = blocklist
      .map((palavra) => nomeESobrenome.includes(palavra))
      .find((elemento) => elemento === true);

    if (nomeImproprio) {
      alert("Nome Invalido!");
      event.preventDefault();
      return;
    }

    if (values.nome.length < 2) {
      alert("Favor colocar nome e sobrenome");
      event.preventDefault();
      return;
    }

    if ((nomeSemEspaco.length < 3) | (nomeSemEspaco.length > 100)) {
      alert("Campo Nome deve conter entre 3 e 100 caracteres");
      event.preventDefault();
      return;
    }

    if ((emailSemEspaco.length < 6) | (emailSemEspaco.length > 100)) {
      alert("Campo Email deve conter entre 6 e 100 caracteres");
      event.preventDefault();
      return;
    }

    if ((senhaSemEspaco.length < 4) | (senhaSemEspaco.length > 15)) {
      alert("Campo Senha deve conter entre 4 e 15 caracteres");
      event.preventDefault();
      return;
    }

    if (confSenhaSemEspaco != senhaSemEspaco) {
      alert("Os campos de Senha e Confirmação de Senha estão diferentes");
      event.preventDefault();
      return;
    }

    alert("cadastrou");
  }

  function handleNextStep() {
    setCurrentStep((prevStep) => prevStep + 1 )
  }


  function handlePreviousStep(){
    setCurrentStep((prevStep) => prevStep -1 )
  }

  // formulário multi etapas

  const steps =[

    {
      id: 'personal-data',
      title: 'Dados Pessoais'
    },
    {
      id: 'registration-data',
      title: 'Dados Cadastrais'
    }
  ]

  return (
    <>
      <h1 className='user-form-title'>Crie sua conta</h1>


      <form
        className="formCadastro"
        id="form1"
        onSubmit={(e) => handleSubmit(e)}
      >
           <h2>{steps[currentStep].title}</h2>
           <p className="step-guide">
            {currentStep + 1} de {steps.length}
          </p>

        {steps[currentStep].id === 'personal-data' && (
        <div className="dados-pessoais">
          {/* <h2>Dados pessoais</h2> */}
          <div className="inputs">
            <label htmlFor="completeName">Nome Completo:</label>
            <input
              type="text"
              id="completeName"
              name="nome"
              minLength="3"
              maxLength="100"
              value={values.nome}
              onChange={handleChange}
              onBlur={teste}
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="cpfNumber">CPF:</label>
            <MaskedInput
              name="cpf"
              id="cpfNumber"
              mask="999.999.999-99"
              value={values.cpf}
              onChange={handleChange}
            />
          </div>

          <div className="inputs">
            <label htmlFor="dataNasc">Data de Nascimento:</label>
            <input
              type="date"
              id="dataNasc"
              name="dataNasc"
              value={values.dataNasc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="teste"></div>
        </div>
        )}

        {steps[currentStep].id == 'registration-data' && (
        <div className="cadastrais">
          {/* <h2>Dados cadastrais</h2> */}
          <div className="inputs">
            <label htmlFor="contatNumber">Telefone:</label>
            <MaskedInput
              name="contatNumber"
              id="contatNumber"
              mask="(99) 9 9999-9999"
              value={values.contatNumber}
              onChange={handleChange}
            />
          </div>

          <div className="inputs">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
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
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              minLength="4"
              maxLength="15"
              value={values.senha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="confSenha">Confirmar Senha:</label>
            <input
              type="password"
              id="confSenha"
              name="confSenha"
              minLength="4"
              maxLength="15"
              value={values.confSenha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkBox">
            <input type="checkbox" id="terms" name="terms" />{" "}
            <label htmlFor="terms">Aceito os termos de uso</label>
            <br />
            <input type="checkbox" id="notify" name="notify" />{" "}
            <label htmlFor="notify">Receber notificações</label>
            <br />
          </div>
        </div>
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
        <div className='btn-div'>
          <button 
            className="btn-form btn-previous" 
            type="button" 
            onClick={handlePreviousStep}
          >
            Voltar
          </button>


          <button className="btn-form btn-submit" type="submit">
            Cadastrar
          </button>
        </div>
      )}

        {/* <div className="botoes">
          <input type="submit" value="Cadastrar" className="btnCadastro" />
        </div> */}
      </form>
    </>
  )
}

export default Formulario;
