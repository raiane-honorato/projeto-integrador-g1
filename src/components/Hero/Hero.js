import './Hero.css'

function Hero() {
   return(
    <header class = "hero">
        <div class="hero-container">
            <h2 class="hero-title">Corrente do bem</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi</p>
            <button class="hero-btn" id="hero-btn-volunteer">Seja um voluntário</button>    
            <button class="hero-btn" id="hero-btn-institution">Seja uma instituição</button>   
        </div>
    </header>
    )
}

export default Hero;