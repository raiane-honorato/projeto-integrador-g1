import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import UserData from '../../components/UserData/UserData';
import './profile.css';

function Profile() {

  return (
    <div className='main-container-Profile'>
      <Navbar />
      <UserData />
      <Footer />
    </div>
  )
}


export default Profile;