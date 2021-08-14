import {useState, useEffect } from "react";
import Multiselect from 'multiselect-react-dropdown';
import "./InstitutionEdition.css";

function InstitutionFirstEditionBody({ formik, institution }) {

        //setting causes list
        const [causes, setCauses] = useState();
        const [institutionCauses, setInstitutionCauses] = useState();
        useEffect(() => {
          fetch(`http://localhost:8000/cause`)
          .then((res) => res.json())
          .then((res) => {
              setCauses(res);
              return res;
          })
          .catch((erro) =>
            alert("Não foi possível obter dados dos projetos.")
          )
  
      },[])
  
      //institution's causes
      useEffect(() => {
        let filteredCauses = causes && institution && institution.cause_id.map((cause_id) => {
          return causes.filter(cause => cause.id === cause_id)[0]
        })
        setInstitutionCauses(filteredCauses)
      
    },[causes, institution])

      //chosen cause
      let onChangeCause = (selectedList, selectedItem) => {
        const habilityList = selectedList.map((hability) => {return hability.id})
        formik.setFieldValue('cause_id',habilityList)
      }


  return (
    <div className="institution-first-edition-window-body">
      <div className="inputs">
        <label htmlFor="institution_name">Nome da instituição</label>
        <input
          type="text"
          name="institution_name"
          id="ongName"
          value={formik.values.institution_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength="3"
          maxLength="100"
          required
        />
        {formik.touched.institution_name && formik.errors.institution_name && (
          <span className="formikError">{formik.errors.institution_name}</span>
        )}
      </div>

      <div className="inputs">
        <label htmlFor="summary">Resumo da instituição</label>
        <textarea
          name="summary"
          id="resumo"
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
          <span className="formikError">{formik.errors.summary}</span>
        )}
      </div>

      <div className = "project-habilities-causes-creation">
                    <label>Causas atreladas</label>
                     {causes && institutionCauses && <Multiselect 
                        options = {causes}
                        displayValue = "label"
                        selectedValues = {institutionCauses}
                        selectionLimit = "3"
                        placeholder = "Selecione até 3 habilidades"
                        onSelect = {onChangeCause}
                        onRemove = {onChangeCause}
                        avoidHighlightFirstOption = "true"
                        style =  {{
                          chips: { background: 'var(--secondColor)' },
                          multiselectContainer: {
                            color: 'var(--secondColor)',
                            background: 'white',
                            padding: "0.7rem !important",
                            borderRadius: "5px",
                            border: "none",
                            boxShadow: "1px 1px 4px #9c9c9c"
                          },
                          inputField: {
                            font: 'var(--secondFont)',
                            fontSize: ".8rem",
                            width: "15rem"
                          },
                        }}
                      />}
                    </div>



    </div>
  );
}

export default InstitutionFirstEditionBody;
