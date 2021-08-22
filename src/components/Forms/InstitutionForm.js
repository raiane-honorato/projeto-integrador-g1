import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import "./institutionForm.css";
import Multiselect from "multiselect-react-dropdown";
import api from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useFormik } from 'formik';
import { formatRelative } from "date-fns";

function InstForm() {

  const [loading, setLoading] = useState(false);
  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const history = useHistory();

  function savingInstitution(event) {
    event.preventDefault();
    setLoading(true);

    api({
      method: "POST",
      url: `/address`,
      headers: { "Content-type": "application/json" },
      data: formik.values.address,
    })
      .then((res) => {
        return (
          api({
            method: "POST",
            url: "/institution",
            headers: { "Content-type": "application/json" },
            data: {
              "name": formik.values.name,
              "img": "https://firebasestorage.googleapis.com/v0/b/correte-do-bem.appspot.com/o/no-photo-user.png?alt=media&token=c4f3e73c-cbf1-44b9-adb2-5c7d10cbb61e",
              "email": formik.values.email,
              "summary": formik.values.summary,
              "cnpj": onlyNumbers(formik.values.cnpj),
              "phone": onlyNumbers(formik.values.phone),
              "site": formik.values.site,
              "facebook": formik.values.facebook,
              "instagram": formik.values.instagram,
              "bio": formik.values.bio,
              "causes": formik.values.causes,
              "address": res.data
            }
          })
        )
      }).then((res) => {
        return (
          api({
            method: "POST",
            url: "/user",
            headers: { "Content-type": "application/json" },
            data: {
              "name": formik.values.name,
              "img": "https://firebasestorage.googleapis.com/v0/b/correte-do-bem.appspot.com/o/no-photo-user.png?alt=media&token=c4f3e73c-cbf1-44b9-adb2-5c7d10cbb61e",
              "email": formik.values.email,
              "type": 2,
              "institution": res.data,
              "cpf": "12345678912",
              "phone": res.data.phone,
              password: formik.values.password
            }
          })
        )
      }
      )
      .then((res) => {
        setLoading(false);
        toast.success("Instituição cadastrada!", {
          duration: 2000,
          position: "top-right",
        });
        history.push("/login");
      })
      .catch((erro) => {
        toast.error("Não foi possível realizar cadastro!", {
          duration: 2000,
          position: "top-right",
        });
      });

  }

  const [currentStep, setCurrentStep] = useState(0);
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    api.get('/cause ')
      .then(res => setCauses(res.data))
      .catch((erro) => alert('Não foi possível carregar as causas!'))
  }, [])

  let onChangeCause = (selectedList, selectedItem) => {
    formik.setFieldValue("causes", selectedList);
  };

  const formik = useFormik({

    initialValues: {
      "name": "",
      "img": "https://firebasestorage.googleapis.com/v0/b/correte-do-bem.appspot.com/o/no-photo-user.png?alt=media&token=c4f3e73c-cbf1-44b9-adb2-5c7d10cbb61e",
      "email": "",
      "summary": "",
      "cnpj": "",
      "phone": "",
      "site": "",
      "facebook": "",
      "instagram": "",
      "bio": "",
      "causes": "",
      "password": "",
      "passwordConfirmation": "",
      "address": {
        "city": "",
        "state": "",
        "street": "",
        "address_number": "",
        "complement": "",
        "neighborhood": "",
        "zip_code": ""
      },
    },
    validate: function (values) {
      const cnpj = onlyNumbers(values.cnpj);
      const phone = onlyNumbers(values.phone);

      const errors = {};

      if ((values.name.length < 3) | (values.name.length > 100) | !values.name) {
        errors.name = "Nome Invalido";
      }

      if ((values.summary.length < 5) | (values.summary.length > 100) | !values.summary) {
        errors.summary = "Texto invalido";
      }

      if (cnpj.length < 14 |  !values.cnpj) {
        errors.cnpj = "CNPJ invalido";
      }

      if ((phone.length < 10) | (phone.length > 11) | !values.phone) {
        errors.phone = "Telefone invalido";
      }

      if ((values.bio.length < 5) | (values.bio.length > 520) | !values.bio) {
        errors.bio = "Texto invalido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7) | !values.email) {
        errors.email = "Email invalido";
      }

      if ((values.password.length < 8) | (values.password.length > 15) |  !values.senha) {
        errors.senha = "Senha invalida";
      }

      if (
        (values.passwordConfirmation !== values.password) |
        (values.passwordConfirmation === undefined) |  !values.passwordConfirmation
      ) {
        errors.passwordConfirmation = "Senha inválida";
      }

      return errors;
    },
  });

  const [values, setValues] = useState(formik.initialValues);

  useEffect(() => {
  }, [formik.values]);

  function handleNextStep() {

    const errors = {};

    switch (currentStep) {
      case 0:
        if (formik.values.name.length == 0 || formik.values.summary.length == 0) {
          formik.errors.name = "Nome Invalido";
          return errors
        } else {
          return setCurrentStep((prevStep) => prevStep + 1);
        }

      case 1:
        if (formik.values.address.zip_code == 0 || formik.values.address.street == 0 || formik.values.address.neighborhood == 0 ||
          formik.values.address.address_number == 0 || formik.values.address.city == 0 || formik.values.address.state == 0) {
          return
        } else {
          return setCurrentStep((prevStep) => prevStep + 1);
        }

      case 2:
        if (formik.values.cnpj.length == 0) {
          return
        } else {
          return setCurrentStep((prevStep) => prevStep + 1);
        }
      case 3:
        if (formik.values.phone.length == 0) {
          return
        } else {
          return setCurrentStep((prevStep) => prevStep + 1);
        }
      case 4:
        if (formik.values.bio.length == 0) {
          return
        } else {
          return setCurrentStep((prevStep) => prevStep + 1);
        }
      default:
        return
    }


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
    <div className="container-instForm">
      <Toaster />
      {formik.loading ? (
        <Loader />
      ) : (
        <>

          <h1 className="instituition-form-title">Cadastre sua Instituição</h1>
          <form
            className="instForm"
            id="form1"
            onSubmit={savingInstitution}
          >
            <h2>{steps[currentStep].title}</h2>
            <hr className="inst-hr-style" />
            <p className="inst-step-guide">
              {currentStep + 1} de {steps.length}
            </p>

            {steps[currentStep].id === "dados-base1" && (
              <div className="dados-base1">
                <div className="inst-inputs">
                  <label htmlFor="name">Nome da instituição:*</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength="3"
                    maxLength="100"
                    required
                  />
                  {formik.touched.name && formik.errors.name && (
                    <span className="inst-formikError">{formik.errors.name}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="summary">Resumo da instituição:*</label>
                  <textarea
                    name="summary"
                    id="summary"
                    rows="3"
                    cols="50"
                    minLength="10"
                    maxLength="180"
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.summary && formik.errors.summary && (
                    <span className="inst-formikError">{formik.errors.summary}</span>
                  )}
                </div>
              </div>
            )}
            {steps[currentStep].id === "endereco" && (
              <div className="inst-endereco">
                <div className="inst-inputs">
                  <label htmlFor="zip_code">CEP:*</label>
                  <input
                    type="number"
                    name="address.zip_code"
                    id="cep"
                    value={formik.address?.zip_code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength="8"
                    maxLength="8"
                    required
                  />
                  {formik.touched.zip_code && formik.errors.zip_code && (
                    <span className="inst-formikError">{formik.errors.zip_code}</span>
                  )}
                </div>
                <div className="inst-inputs">
                  <label htmlFor="street">Rua:*</label>
                  <input
                    type="text"
                    name="address.street"
                    id="street"
                    value={formik.values.address?.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.street && formik.errors.street && (
                    <span className="inst-formikError">{formik.errors.street}</span>
                  )}
                </div>
                <div className="inst-inputs">
                  <label htmlFor="neighborhood">Bairro:*</label>
                  <input
                    type="text"
                    name="address.neighborhood"
                    id="neighborhood"
                    value={formik.values.address?.neighborhood}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.neighborhood && formik.errors.neighborhood && (
                    <span className="inst-formikError">{formik.errors.neighborhood}</span>
                  )}
                </div>
                <div className="inst-inputs">
                  <label htmlFor="address_number">Número:*</label>
                  <input
                    type="text"
                    name="address.address_number"
                    id="address_number"
                    value={formik.values.address?.address_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.address_number && formik.errors.address_number && (
                    <span className="inst-formikError">{formik.errors.address_number}</span>
                  )}
                </div>
                <div className="inst-inputs">
                  <label htmlFor="city">Cidade:*</label>
                  <input
                    type="text"
                    name="address.city"
                    id="city"
                    value={formik.values.address?.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.city && formik.errors.city && (
                    <span className="inst-formikError">{formik.errors.city}</span>
                  )}
                </div>
                <div className="inst-inputs">
                  <label htmlFor="state">Estado:*</label>
                  <input
                    type="text"
                    name="address.state"
                    id="state"
                    value={formik.values.address?.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.state && formik.errors.state && (
                    <span className="inst-formikError">{formik.errors.state}</span>
                  )}
                </div>
              </div>
            )}
            {steps[currentStep].id === "dados-base2" && (
              <div className="dados-base2">
                <div className="inst-inputs">
                  <label>Causas:</label>
                  {causes && (
                    <Multiselect
                      options={causes}
                      displayValue="label"
                      selectionLimit="3"
                      placeholder="Selecione até 3 causas"
                      onSelect={onChangeCause}
                      onRemove={onChangeCause}
                      avoidHighlightFirstOption="true"
                      style={{
                        chips: { background: "var(--secondColor)" },
                        multiselectContainer: {
                          color: "var(--secondColor)",
                          background: "white",
                          padding: "0.7rem !important",
                          borderRadius: "5px",
                          border: "none",
                          boxShadow: "1px 1px 4px #9c9c9c",
                        },
                        inputField: {
                          font: "var(--secondFont)",
                          fontSize: ".8rem",
                          width: "15rem",
                        },
                      }}
                    />
                  )}
                </div>


                <div className="inst-inputs">
                  <label htmlFor="cnpj">CNPJ:*</label>
                  <InputMask
                    name="cnpj"
                    id="cnpj"
                    mask="99.999.999/9999-99"
                    value={formik.values.cnpj}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.cnpj && formik.errors.cnpj && (
                    <span className="inst-formikError">{formik.errors.cnpj}</span>
                  )}
                </div>
              </div>
            )}
            {steps[currentStep].id === "contatos" && (
              <div className="contatos">
                <div className="inst-inputs">
                  <label htmlFor="phone">Telefone:*</label>
                  <InputMask
                    name="phone"
                    id="phone"
                    mask="(99) 9 9999-9999"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <span className="inst-formikError">{formik.errors.phone}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="site">Site:</label>
                  <input
                    type="url"
                    id="site"
                    name="site"
                    minLength="5"
                    maxLength="100"
                    value={formik.values.site}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.site && formik.errors.site && (
                    <span className="inst-formikError">{formik.errors.site}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="facebook">Facebook (URL):</label>
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
                    <span className="inst-formikError">{formik.errors.facebook}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="instagram">Instagram (URL):</label>
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
                    <span className="inst-formikError">{formik.errors.instagram}</span>
                  )}
                </div>
              </div>
            )}
            {steps[currentStep].id === "sobre" && (
              <div className="sobre">
                <div className="inst-inputs">
                  <label htmlFor="bio">Descrição da Ong:*</label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows="6"
                    cols="50"
                    minLength="10"
                    maxLength="180"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.bio && formik.errors.bio && (
                    <span className="inst-formikError">{formik.errors.bio}</span>
                  )}
                </div>
              </div>
            )}
            {steps[currentStep].id === "outros-contatos" && (
              <div className="outros-contatos">
                <div className="inst-inputs">
                  <label htmlFor="email">E-Mail:*</label>
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
                    <span className="inst-formikError">{formik.errors.email}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="senha">Senha:*</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    minLength="4"
                    maxLength="15"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <span className="inst-formikError">{formik.errors.password}</span>
                  )}
                </div>

                <div className="inst-inputs">
                  <label htmlFor="passwordConfirmation">Confirmar Senha:*</label>
                  <input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    minLength="4"
                    maxLength="15"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                    <span className="inst-formikError">{formik.errors.passwordConfirmation}</span>
                  )}
                </div>
              </div>
            )}

            <div className="inst-btn-div">
              {currentStep > 0 && (
                <button
                  className="inst-btn-form inst-btn-previous"
                  type="button"
                  onClick={handlePreviousStep}
                >
                  Voltar
                </button>
              )}

              {currentStep < steps.length - 1 && (
                <button
                  className="inst-btn-form inst-btn-next"
                  type="button"
                  onClick={handleNextStep}
                >
                  Próximo
                </button>
              )}

              {currentStep === steps.length - 1 && (
                <button className="inst-btn-form inst-btn-submit" type="submit">
                  Cadastrar
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default InstForm;