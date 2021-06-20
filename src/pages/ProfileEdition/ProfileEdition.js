import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import ProfileEditionSection from '../../components/ProfileEditionSection/ProfileEditionSection';

import './profileEdition.css';

function Profile() {

  return (
    <div className='main-container-Profile'>
      <Navbar />
      <ProfileEditionSection />
      <Footer />
    </div>
  )
}


export default Profile;