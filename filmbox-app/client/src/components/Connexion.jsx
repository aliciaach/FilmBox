import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/arobase.png';
import cadenas from '../assets/cadenas.png';
import '../styles/Connexion.css';

function Connexion(){
return(

    <div className='login-container'>
      <h2 className="form-title">Log in with</h2>


      <div className="social-login">
        <button className='social-button'>
          <img src={logoFilmBox} className="social-icon" />
        </button>
      </div>

      <form action='#' className='login-form'>
        <div className='input-wrapper'>
          <input type='email' placeholder='example@gmail.com' className='input-field' required ></input>
          <i><img src={arobase} alt="Arobase" className="icon-image" /> </i>
        </div>

        <div className='input-wrapper'>
          <input type='password' placeholder='enter your password' className='input-field' required ></input>
          <i><img src={cadenas} alt="Cadenas" className="icon-image" /> </i>
        </div>
      </form>

      <p className='signup-text'>You don’t have an account? </p>
        {/*Ceci (le bouton) vient de ChatGPT en attendant de trouver la solution moi même */}
      
      <button className="btn btn-outline-primary" onClick={() => window.location.href = '/inscription'}>
        Create Account
      </button>

    </div>
)
}

export default Connexion