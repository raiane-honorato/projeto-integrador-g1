import "./InstitutionEdition.css"

function InstitutionThirdEditionBody({formik}) {

    

    return (

                <div className = "institution-first-edition-window-body">

                    <div className="inputs">
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
                            <span className="formikError">{formik.errors.bio}</span>
                        )}
                    </div>  
                    
                  

                </div>


                
                
    )

}

export default InstitutionThirdEditionBody;