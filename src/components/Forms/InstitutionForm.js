import { useState } from "react";
import MaskedInput from "./formComponents/MaskedInput";
import './userform.css';

function InstFormulario() {
  const [values, setValues] = useState({});
//   const [count, setCount] = useState({})

  const blocklist = ["puta", "merda", "shit", "karalho", "caralho"];

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    
  }

  function handleSubmit(event) {
    // event.preventDefault();

    const nome = values.ongName
    const resumo = values.resumo
    const endereco = values.endereco
    const causas = values.causas
    const numBeneficiados = values.numBeneficiados
    const cnpj = values.cnpjNumber
    const telOng = values.telOng
    const email = values.email
    const site = values.urlSite
    const facebook = values.facebook
    const instagram = values.instagram
    const descricao = values.descricao


    const nomeCompleto = nome.trim().split(" ").filter((nome) => nome !== "" || nome !== "")

    const nomeImproprio = blocklist
    .map((palavra) => nomeCompleto.includes(palavra))
    .find((elemento) => elemento === true);

    if (nomeImproprio) {
        alert("Nome Invalido!");
        event.preventDefault();
        return;
      }

  }

  return (
    <>
      <h1 className='instituition-form-title'>Cadastre sua Instituição</h1>

      <form className="instForm" onSubmit={(e) => handleSubmit(e)}>
        <div className="dados-base">
          <div className="inputs">
            <label htmlFor="nomeOng">Nome da Ong</label>
            <input
              type="text"
              name="ongName"
              id="ongName"
              value={values.ongName}
              onChange={handleChange}
              minLength="3"
              maxLength="100"
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="resumo">Resumo da Ong</label>
            {/* {tamanho && <p className="errors-input">{tamanho}</p>} */}
            <textarea
              name="resumo"
              id="resumo"
              rows="3"
              cols="50"
              minLength="10"
              maxLength="180"
              value={values.resumo}
              onChange={handleChange}
              minLength="3"
              maxLength="100"
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
              onChange={handleChange}
              minLength="3"
              maxLength="100"
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="causas">Causas</label>
            <input
              type="text"
              name="causas"
              id="causas"
              value={values.causas}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="numBeneficiados">Numero de Beneficiádos</label>
            <input
              type="text"
              name="numBeneficiados"
              id="numBeneficiados"
              value={values.numBeneficiados}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <label htmlFor="cnpjNumber">CNPJ</label>
            <MaskedInput
              name="cnpjNumber"
              id="cnpjNumber"
              mask="99.999.999/9999-99"
              value={values.cnpjNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <hr />

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
            <label htmlFor="urlSite">Site</label>
            <input
              type="url"
              id="urlSite"
              name="urlSite"
              minLength="5"
              maxLength="100"
              value={values.urlSite}
              onChange={handleChange}
            />
          </div>

          <div className="inputs">
            <label htmlFor="facebook">facebook</label>
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
            <label htmlFor="instagram">instagram</label>
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
              onChange={handleChange}
              minLength="3"
              maxLength="100"
              required
            />
          </div>
        </div>

        <hr />

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

        <div className="buttons">
          <div className="inputs">
            <input type="submit" value="Cadastrar" className="btnCadastro" />
          </div>


        </div>
      </form>
    </>
  );
}

export default InstFormulario;
