
import { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Spotlight from '../components/Spotlight/Spotlight'

function Home() {

      return(
        <>
        <Toaster />
        <Hero />
        <Spotlight/>
        <Footer />
        </>
    )
}

export default Home;