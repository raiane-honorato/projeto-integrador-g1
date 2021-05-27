function FormEndereco(){
    return(

        <div className="endereco">

                    <label htmlFor="cepNumber">CEP:</label><br/>
                    <input type="text" id="cepNumber" name="cep" maxLength="8" 
                    onBlur={e => pegaCep(e)} required/><br/>

                    <label htmlFor="nameStreet">Rua:</label><br/>
                    <input type="text" id="nameStreet" name="street" maxLength="150" required/><br/>

                    <label htmlFor="numHouse">Nº:</label><br/>
                    <input type="text" id="numHouse" name="nStreet" required/><br/>

                    <label htmlFor="compStreet">Complemento:</label><br/>
                    <input type="text" id="compStreet" name="compStreet"/><br/>

                  </div>

    )
}

export default FormEndereco