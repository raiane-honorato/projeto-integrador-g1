import InputMask from "react-input-mask";

function UserFirstEditionBody({ formik }) {
  return (
    <div className="dados-pessoais">
      <div className="inputs">
        <label htmlFor="dataNasc">Data de Nascimento:</label>
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

      <div className="inputs">
        <label htmlFor="contatNumber">Telefone:</label>
        <InputMask
          name="phone"
          id="phone"
          mask="(99) 9 9999-9999"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.contatNumber && formik.errors.contatNumber && (
          <span className="formikError">{formik.errors.contatNumber}</span>
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
    </div>
  );
}

export default UserFirstEditionBody;
