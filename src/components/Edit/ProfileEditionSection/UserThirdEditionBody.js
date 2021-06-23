import "./userThirdEdition.css";

function UserThirdEditionBody({ formik }) {
  return (
    <div className="causesAndHabilities">
      <div className="inputs">
        <label htmlFor="causas">Causas</label>
        <select
          type="text"
          name="causas"
          id="causas"
          value={formik.values.causas}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option selected disabled value="escolha">
            Escolha uma causa
          </option>
          <option value="saude">Saúde</option>
          <option value="meio ambiente">Meio Ambiente</option>
          <option value="mulheres">Mulheres</option>
          <option value="arte e cultura">Arte e Cultura</option>
          <option value="educação">Educação</option>
          <option value="direitos humanos">Direitos Humanos</option>
          <option value="criancas">Crianças</option>
          <option value="idosos">Idosos</option>
          <option value="proteção animal">Proteção Animal</option>
          <option value="refugiados">Refugiados</option>
        </select>
        {formik.touched.causas && formik.errors.causas && (
          <span className="formikError">{formik.errors.causas}</span>
        )}
      </div>
      <div className="inputs">
        <label htmlFor="causas">Habilidades</label>
        <select
          type="text"
          name="habilidades"
          id="habilidades"
          value={formik.values.habilidades}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option selected disabled value="escolha">
            Escolha uma habilidades
          </option>
          <option value="saude">Saúde</option>
          <option value="danca">Dança</option>
          <option value="malhacao">Malhação</option>
          <option value="musica">Música</option>
          <option value="meditacao">Meditação</option>
          <option value="programacao">Programação</option>
          <option value="criancas">Crianças</option>
          <option value="idosos">Idosos</option>
          <option value="culinária">Culinária</option>
          <option value="artes">Artes</option>
          <option value="esportes">Esportes</option>
          <option value="barbearia">Barbearia</option>
        </select>
        {formik.touched.habilidades && formik.errors.habilidades && (
          <span className="formikError">{formik.errors.habilidades}</span>
        )}
      </div>
    </div>
  );
}

export default UserThirdEditionBody;
