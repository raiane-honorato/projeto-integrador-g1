import "./InstitutionEdition.css"
import InputMask from "react-input-mask";

function InstitutionSecondEditionBody({ formik }) {

    return (
        <div className="institution-first-edition-window-body">
            <div className="inputs">
                <label htmlFor="street">Rua</label>
                <input
                    type="text"
                    name="address.street"
                    id="street"
                    value={formik.values.address.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength="3"
                    maxLength="100"
                    required
                />
                {formik.touched.street && formik.errors.street && (
                    <span className="formikError">{formik.errors.street}</span>
                )}
            </div>

            <div className="inputs">
                <label htmlFor="address_number">Número</label>
                <input
                    type="number"
                    name="address.address_number"
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
                    name="address.city"
                    id="city"
                    value={formik.values.address.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength="3"
                    maxLength="100"
                    required
                />
                {formik.touched.city && formik.errors.city && (
                    <span className="formikError">{formik.errors.city}</span>
                )}
            </div>

            <div className="inputs">
                <label htmlFor="city">Estado</label>
                <input
                    type="text"
                    name="address.state"
                    id="state"
                    value={formik.values.address.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    minLength="3"
                    maxLength="100"
                    required
                />
                {formik.touched.state && formik.errors.state && (
                    <span className="formikError">{formik.errors.state}</span>
                )}
            </div>

            <div className="inputs">
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
                    <span className="formikError">{formik.errors.phone}</span>
                )}
            </div>

            <div className="inputs">
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
                    <span className="formikError">{formik.errors.site}</span>
                )}
            </div>

            <div className="inputs">
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
                    <span className="formikError">{formik.errors.facebook}</span>
                )}
            </div>

            <div className="inputs">
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
                    <span className="formikError">{formik.errors.instagram}</span>
                )}
            </div>
        </div>
    )
}

export default InstitutionSecondEditionBody;