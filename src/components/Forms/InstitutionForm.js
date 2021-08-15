import { useState, useEffect, useCallback } from "react";
import InputMask from "react-input-mask";
import "./institutionForm.css";
import Select, { components } from "react-select";
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import api from "../../services/api";

function useFormik({ initialValues, validate }) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [cep, setCep] = useState("");

  useCallback(() => {
    function validateValues(values) {
      setErrors(validate(values));
    }
    validateValues(values);
  }, [values, validate]);

  useEffect(() => {
    if (cep.length > 7)
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((response) =>
          setValues({
            ...values,
            address: {
              street: response.logradouro,
              neighborhood: response.bairro,
              city: response.localidade,
              state: response.uf
            }
          })
        )
        .catch((error) =>
          console.log(
            `Não foi possível obter o endereço do CEP informado! Erro:${error}`
          )
        );
  }, [cep,values]);

  function searchingData(e) {
    setCep(e.target.value);
  }

  function fillingForm({ target }) {
    const { id, value } = target;
    setValues({ ...values, [id]: value });
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

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
    cep,
    searchingData,
    fillingForm,
  };
}

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableMultiValueLabel = sortableHandle((props) => (
  <components.MultiValueLabel {...props} />
));

const SortableSelect = SortableContainer(Select);

function InstForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [causes, setCauses] = useState([]);


  useEffect(() => {
    api('/cause')
    .then(res => setCauses(res.data))
    .catch((erro) => alert('Não foi possível carregar as causas!'))
  },[])

  const onChange = (selectedOptions) => setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const formik = useFormik({
    initialValues: {
      name: "",
      summary: "",
      cnpj: "",
      address: {
          street: "",
          neighborhood: "",
          address_number: "",
          city: "",
          state: ""
      },
      causes: "",
      phone: "",
      site: "",
      facebook: "",
      instagram: "",
      bio: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: function (values) {
      const cnpj = onlyNumbers(values.cnpj);
      const phone = onlyNumbers(values.phone);

      const errors = {};

      if ((values.name.length < 3) | (values.name.length > 100)) {
        errors.name = "Nome Invalido";
      }

      if ((values.summary.length < 5) | (values.summary.length > 100)) {
        errors.summary = "Texto invalido";
      }

      if (cnpj.length < 14) {
        errors.cnpj = "CNPJ invalido";
      }

      if ((phone.length < 10) | (phone.length > 11)) {
        errors.phone = "Telefone invalido";
      }

      if ((values.bio.length < 5) | (values.bio.length > 520)) {
        errors.bio = "Texto invalido";
      }

      if (!values.email.includes("@") | (values.email.lengthh < 7)) {
        errors.email = "Email invalido";
      }

      if ((values.password.length < 8) | (values.password.length > 15)) {
        errors.senha = "Senha invalida";
      }

      if (
        (values.passwordConfirmation !== values.password) |
        (values.passwordConfirmation === undefined)
      ) {
        errors.passwordConfirmation = "Senha inválida";
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
    <div className="container-instForm">
      <h1 className="instituition-form-title">Cadastre sua Instituição</h1>
      <form
        className="instForm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h2>{steps[currentStep].title}</h2>
        <hr className="inst-hr-style" />
        <p className="inst-step-guide">
          {currentStep + 1} de {steps.length}
        </p>

        {steps[currentStep].id === "dados-base1" && (
          <div className="dados-base1">
            <div className="inst-inputs">
              <label htmlFor="name">Nome da instituição</label>
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
              <label htmlFor="summary">Resumo da instituição</label>
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
                <span className="inst-formikError">{formik.errors.cep}</span>
              )}
            </div>
            <div className="inst-inputs">
              <label htmlFor="street">Rua</label>
              <input
                type="text"
                name="street"
                id="street"
                value={formik.values.address.street}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.street && formik.errors.street && (
                <span className="inst-formikError">{formik.errors.street}</span>
              )}
            </div>
            <div className="inst-inputs">
              <label htmlFor="neighborhood">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                id="neighborhood"
                value={formik.values.address.neighborhood}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.neighborhood && formik.errors.neighborhood && (
                <span className="inst-formikError">{formik.errors.neighborhood}</span>
              )}
            </div>
            <div className="inst-inputs">
              <label htmlFor="address_number">Número</label>
              <input
                type="text"
                name="address_number"
                id="address_number"
                value={formik.values.address.address_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.address_number && formik.errors.address_number && (
                <span className="inst-formikError">{formik.errors.address_number}</span>
              )}
            </div>
            <div className="inst-inputs">
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                name="city"
                id="city"
                value={formik.values.address.city}
                onChange={formik.fillingForm}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.city && formik.errors.city && (
                <span className="inst-formikError">{formik.errors.city}</span>
              )}
            </div>
            <div className="inst-inputs">
              <label htmlFor="state">Estado</label>
              <input
                type="text"
                name="state"
                id="state"
                value={formik.values.address.state}
                onChange={formik.fillingForm}
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
              <label>Causas</label>
              <SortableSelect
                className='causesInput'
                useDragHandle
                // react-sortable-hoc props:
                axis="xy"
                onSortEnd={onSortEnd}
                distance={4}
                // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                // react-select props:
                isMulti
                options={causes}
                value={selected}
                onChange={onChange}
                components={{
                  MultiValue: SortableMultiValue,
                  MultiValueLabel: SortableMultiValueLabel,
                }}
                closeMenuOnSelect={false}
              />
            </div>

           
            <div className="inst-inputs">
              <label htmlFor="cnpj">CNPJ</label>
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
              <label htmlFor="phone">Telefone</label>
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
              <label htmlFor="site">Site</label>
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
                <span className="inst-formikError">{formik.errors.facebook}</span>
              )}
            </div>

            <div className="inst-inputs">
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
                <span className="inst-formikError">{formik.errors.instagram}</span>
              )}
            </div>
          </div>
        )}
        {steps[currentStep].id === "sobre" && (
          <div className="sobre">
            <div className="inst-inputs">
              <label htmlFor="bio">Descrição da Ong</label>
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
                <span className="inst-formikError">{formik.errors.email}</span>
              )}
            </div>

            <div className="inst-inputs">
              <label htmlFor="senha">Senha:</label>
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
              <label htmlFor="passwordConfirmation">Confirmar Senha:</label>
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
    </div>
  );
}

export default InstForm;
