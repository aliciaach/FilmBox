import React, { useState } from 'react';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/arobase.png';
import cadenas from '../assets/cadenas.png';
import '../styles/Connexion.css';

function Connexion(){
    //My variables 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userLogin = { email, password };

      //AJOUTER MESSAGE D'ERREURRR !!!
      try {
          const response = await fetch('http://localhost:4000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userLogin)
          });
          
          const data = await response.json();
      } catch (error) {
          console.error('Error:', error);
      }
  };

return(

  <div className="classBody"> 
    <h2 className="form-title">Log in</h2>
     
    <div className='login-container'>

      <form onSubmit={handleSubmit} className='login-form'>
        {/* Email */}
        <label htmlFor="email" className="input-label">Email</label>
        
        <div className='input-wrapper'>
          <input type='email' placeholder='example@gmail.com' className='input-field' required value={email} onChange={(e) => setEmail(e.target.value)} ></input>
          <i><img src={arobase} alt="Arobase" className="icon-image" /> </i>
        </div>

        {/* Mot de passe */}
        <label htmlFor="password" className="input-label">Password</label>
          
        <div className='input-wrapper'>
          <input type='password' placeholder='enter your password' className='input-field' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <i><img src={cadenas} alt="Cadenas" className="icon-image" /> </i>
        </div>

        {/* Checkbox "Remember me" */}
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember"> Remember me</label>
        </div>

        {/* Ligne séparatrice */}
        <div className="separator"></div>

        {/* Bouton login */}
        <button type="submit" className="btn btn-primary login-btn">Login</button>

      </form>

      {/* Don't have an account? */}
      <div className='signup-container'>

        <p className='signup-text'>You don’t have an account? </p>
      
        {/*Ceci (le bouton) vient de ChatGPT en attendant de trouver la solution moi même */}
        <button className="btn btn-outline-primary" onClick={() => window.location.href = '/inscription'}>
          Create Account
        </button>
      </div>
    </div>
  </div>
)
};

export default Connexion