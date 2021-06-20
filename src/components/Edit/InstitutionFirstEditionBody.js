import "./InstitutionEdition.css"


function InstitutionFirstEditionBody({formik}) {

    

    return (

                <div className = "institution-first-edition-window-body">
                    
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


                </div>


                
                
    )

}

export default InstitutionFirstEditionBody;