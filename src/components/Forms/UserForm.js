import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./userform.css";

function useFormik({ initialValues, validate }) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    function validateValues(values) {
      setErrors(validate(values));
    }
  
    validateValues(values);
  }, [values, validate]);

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

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
  };
}

function UserForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const formik = useFormik({
    initialValues: {
      userName: "",
      cpfNumber: "",
      birth_date: "",
      phone: "",
      email: "",
      senha: "",
      confSenha: "",
    },
    validate: function (values) {
      const cpf = onlyNumbers(values.cpfNumber);
      const tel = onlyNumbers(values.phone);
    

      const errors = {};

      if ((values.userName.length < 3) | (values.userName.length > 100)) {
        errors.userName = "Nome Invalido";
      }

      if (cpf.length < 11) {
        errors.cpfNumber = "CPF invalido";
      }

      if (values.birth_date.length === undefined) {
        errors.birth_date = "Data invalida";
      }

      if ((tel.length < 10) | (tel.length > 11)) {
        errors.phone = "Telefone invalido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7)) {
        errors.email = "Email inválido";
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

  // formulário multi etapas

  const steps = [
    {
      id: "personal-data",
      title: "Dados Pessoais",
    },
    {
      id: "registration-data",
      title: "Dados Cadastrais",
    },
  ];

  return (
    <div className="container-useform">
      <h1 className="user-form-title">Crie sua conta</h1>
      <form
        className="formCadastro"
        id="form1"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2>{steps[currentStep].title}</h2>
        <hr className="hr-style" />
        <p className="step-guide">
          {currentStep + 1} de {steps.length}
        </p>

        {steps[currentStep].id === "personal-data" && (
          <div className="dados-pessoais">
            <div className="inputs">
              <label htmlFor="userName">Nome Completo:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                minLength="3"
                maxLength="100"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.userName && formik.errors.userName && (
                <span className="formikError">{formik.errors.userName}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="cpfNumber">CPF:</label>
              <InputMask
                name="cpfNumber"
                id="cpfNumber"
                mask="999.999.999-99"
                value={formik.values.cpfNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cpfNumber && formik.errors.cpfNumber && (
                <span className="formikError">{formik.errors.cpfNumber}</span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="birth_date">Data de Nascimento:</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formik.values.birth_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.birth_date && formik.errors.birth_date && (
                <span className="formikError">{formik.errors.birth_date}</span>
              )}
            </div>

            <div className="teste"></div>
          </div>
        )}

        {steps[currentStep].id === "registration-data" && (
          <div className="cadastrais">
            {/* <h2>Dados cadastrais</h2> */}
            <div className="inputs">
              <label htmlFor="phone">Telefone:</label>
              <InputMask
                name="phone"
                id="phone"
                mask="(99) 9 9999-9999"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="formikError">
                  {formik.errors.phone}
                </span>
              )}
            </div>

            <div className="inputs">
              <label htmlFor="email">E-Mail:</label>
              <input
                type="email"
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
                minLength="8"
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
                minLength="8"
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

            <div className="checkBox">
              <input type="checkbox" id="terms" name="terms" required />{" "}
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
          <div className="btn-div">
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
      </form>
    </div>
  );
}

export default UserForm;
