import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo }  from '../components'
import { Link } from 'react-router-dom' 

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />   
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>Tracking</span> app
                    </h1>
                    <p>
                        Shabby chic vape street art post-ironic. Coloring book blog master cleanse sartorial,
                        next level etsy helvetica biodiesel neutra pok pok williamsburg praxis irony
                        selvage sustainable
                    </p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing;