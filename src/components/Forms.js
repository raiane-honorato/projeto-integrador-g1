function Formulario(){
    return(
        <>
            <p>Ola mundo!</p>

            <form className="formCadastro" id="form1">

                <div className="dados-pessoais">

                    <label htmlFor="completeName">Nome Completo:</label><br/>
                    <input type="text" id="completeName" name="nome"/><br/>

                    <label htmlFor="cpfNumber">CPF:</label><br/>
                    <input type="text" id="cpfNumber" name="cpf"/><br/>

                    <label htmlFor="dateNasc">Data de Nascimento:</label><br/>
                    <input type="date" id="dateNasc" name="date"/><br/>


                </div>

                <hr/>

                <div className="endereco">

                    <label htmlFor="cepNumber">CEP:</label><br/>
                    <input type="text" id="cepNumber" name="cep"/><br/>

                    <label htmlFor="nameStreet">Rua:</label><br/>
                    <input type="text" id="nameStreet" name="street"/><br/>

                    <label htmlFor="numHouse">Nº:</label><br/>
                    <input type="text" id="numHouse" name="nStreet"/><br/>

                    <label htmlFor="compStreet">Complemento:</label><br/>
                    <input type="text" id="compStreet" name="compStreet"/><br/>

                </div>

                <hr/>

                <div className="cadastrais">

                    <label htmlFor="contatNumber">Contato:</label><br/>
                    <input type="text" id="contatNumber" name="cNumber" placeholder="(xx) x-xxxx-xxxx"/><br/>

                    <label htmlFor="email">E-Mail:</label><br/>
                    <input type="text" id="email" name="email"/><br/>

                    <label htmlFor="password">Senha:</label><br/>
                    <input type="password" id="password" name="password"/><br/>

                    <label htmlFor="confPassword">Confirmar Senha:</label><br/>
                    <input type="password" id="confPassword" name="confPassword"/><br/>

                    <input type="checkbox" id="terms" name="terms"/> <label htmlFor="terms">Aceito os termos de uso</label><br/>

                    <input type="checkbox" id="notify" name="notify"/> <label htmlFor="notify">Receber notificações</label><br/>

                </div>

                <div className="botoes">
                <input  type="button" value="Cadastrar" className="btnCadastro"/>
                </div>



            </form>

        </>
    )
}

export default Formulario