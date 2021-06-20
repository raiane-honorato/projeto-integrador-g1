import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import InstitutionData from '../../components/InstitutionData/InstitutionData';
import './institutionprofile.css';

function InstituitionProfile() {
  return (
    
    <div className='main-container-InstitutionProfile'>
      <Navbar />
      <InstitutionData />
      <Footer />
    </div>
  
  )
}

export default InstituitionProfile;