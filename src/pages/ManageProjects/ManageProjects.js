import { useContext } from "react";
import { AuthContext } from "../../context/auth";


import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

import erroImg from "../../img/404.svg";
import ManageProjectsList from "../../components/ManageProjects/ManageProjectsList/ManageProjectsList";


function ManageProjects() {
    const { user } = useContext(AuthContext);


  return (
    <>
      <Navbar />


      {/* setting page for volunteer user */}
      { user.type === 1 &&
        <div class="error-main">
        <h1>Você não tem acesso a esta página.</h1>
        <p>Faça login como uma instituição para continuar.</p>
        <img className="error-image" src={erroImg} alt="erro" />
      </div>}


        {user.type === 2 && <ManageProjectsList />}


      <Footer />

    </>
  )
}


export default ManageProjects;