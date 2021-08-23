import InputMask from "react-input-mask";
import './userFirstEdition.css';

function UserFourthEditionBody({ formik }) {
  return (
    <div className="dados-pessoais">
      <img className = "manage-project-img project-edit-img fourth-edition-img" src = {formik.values.img} alt="imagem do projeto" />
      <div className="inputs">
        <label htmlFor="img">Imagem:</label>
        <input
          type="text"
          id="ongName"
          name="img"
          value={formik.values.img}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.img && formik.errors.img && (
          <span className="formikError">{formik.errors.img}</span>
        )}
      </div>

     
    </div>
  );
}

export default UserFourthEditionBody;
