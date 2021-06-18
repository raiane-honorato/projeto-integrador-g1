import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./userform.css";

function useFormik({ initialValues, validate }) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [cep, setCep] = useState('');

  useEffect(() => {
    validateValues(values);
  }, [values]);

  useEffect(() => {
    if (cep.length > 7)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((response) => setValues({
        ...values,
        rua: response.logradouro,
        bairro: response.bairro,
        cidade: response.localidade,
        estado: response.uf
      }))
      .catch((error) => console.log(`Não foi possível obter o endereço do CEP informado! Erro:${error}`));

  }, [cep]);

  function searchingData(e) {
    setCep(e.target.value);
  }  

  function fillingForm({ target }) {
    const {id, value} = target;
    setValues({...values, [id]: value})
  }
  
  function handleChange(event) {
    const fieldName = event.target.getAttribute("name");
    const value = event.target.value;

    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleBlur(event) {
    const fieldName = event.target.getAttribute("name");
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    });
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
    cep,
    searchingData,
    fillingForm
  };
}

function InstForm() {
  const [currentStep, setCurrentStep] = useState(0);


  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const formik = useFormik({
    initialValues: {
      ongName: "",
      resumo: "",
      cnpjNumber: "",
      rua: "",
      bairro: "",
      numero: "",
      cidade:"",
      estado:"",
      causas: "",
      numBeneficiados: "",
      telOng: "",
      urlSite: "",
      facebook: "",
      instagram: "",
      descricao: "",
      email: "",
      senha: "",
      confSenha: "",
    },
    validate: function (values) {
      const cnpj = onlyNumbers(values.cnpjNumber);
      const tel = onlyNumbers(values.telOng);

      const errors = {};

      if ((values.ongName.length < 3) | (values.ongName.length > 100)) {
        errors.ongName = "Nome Invalido";
      }

      if ((values.resumo.length < 5) | (values.resumo.length > 100)) {
        errors.resumo = "Texto invalido";
      }

      if (cnpj.length < 14) {
        errors.cnpjNumber = "CNPJ invalido";
      }

      if (values.causas.length < 3) {
        errors.causas = "Causa invalida";
      }

      if ((tel.length < 10) | (tel.length > 11)) {
        errors.telOng = "Telefone invalido";
      }

      if ((values.descricao.length < 5) | (values.descricao.length > 520)) {
        errors.descricao = "Texto invalido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7)) {
        errors.email = "Email invalido";
      }

      if ((values.senha.length < 8) | (values.senha.length > 15)) {
        errors.senha = "Senha invalida";
      }

      if (
        (values.confSenha !== values.senha) |
        (values.confSenha === undefined)
      ) {
        errors.confSenha = "Senha invalida";
      }

      return errors;
    },
  });

  function handleNextStep() {
    setCurrentStep((prevStep) => prevStep + 1);
  }

  function handlePreviousStep() {
    setCurrentStep((prevStep) => prevStep - 1);
  }

  const steps = [
    {
      id: "dados-base1",
      title: "Sobre a ONG",
    },
    {
      id: "endereco",
      title: "Endereço",
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
      id: "sobre",
      title: "Mais detalhes",
    },
    {
      id: "outros-contatos",
      title: "Mais detalhes",
    },
  ];

  return (
    <div>
      <h1 className="instituition-form-title">Cadastre sua Instituição</h1>
      <form
        className="instForm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2>{steps[currentStep].title}</h2>
        <p className="step-guide">
          {currentStep + 1} de {steps.length}
        </p>

        {steps[currentStep].id === "dados-base1" && (
          <div className="dados-base1">
            <div className="inputs">
              <label htmlFor="nomeOng">Nome da Ong</label>
              <input
                type="text"
                name="ongName"
                id="ongName"
                value={formik.values.ongName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minLength="3"
                maxLength="100"
                required
              />
              {formik.touched.ongName && formik.errors.ongName && (
                <span className="formikError">{formik.errors.ongName}</span>
              )}
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
                value={formik.values.resumo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.resumo && formik.errors.resumo && (
                <span className="formikError">{formik.errors.resumo}</span>
              )}
            </div>
          </div>
        )}
        {steps[currentStep].id === "endereco" && (
          <div className="endereco">
            <div className="inputs">
              <label htmlFor="cep">CEP</label>
              <input
                type="number"
                name="cep"
                id="cep"
                value={formik.cep}
                onChange={formik.searchingData}
                onBlur={formik.handleBlur}
                minLength="8"
                maxLength="8"
                required
              />
              {formik.touched.cep && formik.errors.cep && (
                <span className="formikError">{formik.errors.cep}</span>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="rua">Rua</label>
              <input
                type="text"
                name="rua"
                id="rua"
                value={formik.values.rua}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.rua && formik.errors.rua && (
                <span className="formikError">{formik.errors.rua}</span>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                name="bairro"
                id="bairro"
                value={formik.values.bairro}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.bairro && formik.errors.bairro && (
                <span className="formikError">{formik.errors.bairro}</span>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                name="numero"
                id="numero"
                value={formik.values.numero}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.numero && formik.errors.numero && (
                <span className="formikError">{formik.errors.numero}</span>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                name="cidade"
                id="cidade"
                value={formik.values.cidade}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.cidade && formik.errors.cidade && (
                <span className="formikError">{formik.errors.cidade}</span>
              )}
            </div>
            <div className="inputs">
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                name="estado"
                id="estado"
                value={formik.values.estado}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.estado && formik.errors.estado && (
                <span className="formikError">{formik.errors.estado}</span>
              )}
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
                value={formik.values.causas}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.causas && formik.errors.causas && (
                <span className="formikError">{formik.errors.causas}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="numBeneficiados">Numero de Beneficiádos</label>
              <input
                type="number"
                name="numBeneficiados"
                id="numBeneficiados"
                value={formik.values.numBeneficiados}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.numBeneficiados &&
                formik.errors.numBeneficiados && (
                  <span className="formikError">
                    {formik.errors.numBeneficiados}
                  </span>
                )}
            </div>

            <div className="inputs">
              <label htmlFor="cnpjNumber">CNPJ</label>
              <InputMask
                name="cnpjNumber"
                id="cnpjNumber"
                mask="99.999.999/9999-99"
                value={formik.values.cnpjNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cnpjNumber && formik.errors.cnpjNumber && (
                <span className="formikError">{formik.errors.cnpjNumber}</span>
              )}
            </div>
          </div>
        )}
        {steps[currentStep].id === "contatos" && (
          <div className="contatos">
            <div className="inputs">
              <label htmlFor="telOng">Telefone</label>
              <InputMask
                name="telOng"
                id="telOng"
                mask="(99) 9 9999-9999"
                value={formik.values.telOng}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.telOng && formik.errors.telOng && (
                <span className="formikError">{formik.errors.telOng}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="urlSite">Site</label>
              <input
                type="url"
                id="urlSite"
                name="urlSite"
                minLength="5"
                maxLength="100"
                value={formik.values.urlSite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.urlSite && formik.errors.urlSite && (
                <span className="formikError">{formik.errors.urlSite}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="facebook">Facebook (URL)</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                minLength="5"
                maxLength="100"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.facebook && formik.errors.facebook && (
                <span className="formikError">{formik.errors.facebook}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="instagram">Instagram (URL)</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                minLength="5"
                maxLength="100"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.instagram && formik.errors.instagram && (
                <span className="formikError">{formik.errors.instagram}</span>
              )}
            </div>
          </div>
        )}
        {steps[currentStep].id === "sobre" && (
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
                value={formik.values.descricao}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.descricao && formik.errors.descricao && (
                <span className="formikError">{formik.errors.descricao}</span>
              )}
            </div>
          </div>
        )}
        {steps[currentStep].id === "outros-contatos" && (
          <div className="outros-contatos">
            <div className="inputs">
              <label htmlFor="email">E-Mail</label>
              <input
                type="text"
                id="email"
                name="email"
                minLength="6"
                maxLength="100"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <span className="formikError">{formik.errors.email}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                minLength="4"
                maxLength="15"
                value={formik.values.senha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.senha && formik.errors.senha && (
                <span className="formikError">{formik.errors.senha}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="confSenha">Confirmar Senha:</label>
              <input
                type="password"
                id="confSenha"
                name="confSenha"
                minLength="4"
                maxLength="15"
                value={formik.values.confSenha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.confSenha && formik.errors.confSenha && (
                <span className="formikError">{formik.errors.confSenha}</span>
              )}
            </div>
          </div>
        )}
        <div className="btn-div">
          {currentStep > 0 && (
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
      </form>
    </div>
  );
}

export default InstForm;
