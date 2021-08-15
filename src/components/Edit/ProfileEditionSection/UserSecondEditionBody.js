import './userSecondEdition.css';

function UserSecondEditionBody({ formik }) {
  return (
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
        <span className="formikError">{formik.errors.street}</span>
      )}
    </div>
    <div className="inputs">
      <label htmlFor="bairro">Bairro</label>
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
        <span className="formikError">{formik.errors.neighborhood}</span>
      )}
    </div>
    <div className="inputs">
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
        <span className="formikError">{formik.errors.address_number}</span>
      )}
    </div>
    <div className="inputs">
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
        <span className="formikError">{formik.errors.city}</span>
      )}
    </div>
    <div className="inputs">
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
        <span className="formikError">{formik.errors.state}</span>
      )}
    </div>
  </div>
  );
}

export default UserSecondEditionBody;
