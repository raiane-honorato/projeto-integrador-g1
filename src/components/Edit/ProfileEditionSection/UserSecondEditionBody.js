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
  );
}

export default UserSecondEditionBody;
