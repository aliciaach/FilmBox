import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/arobase.png';
import cadenas from '../assets/cadenas.png';
import '../styles/Connexion.css';
import { useNavigate } from 'react-router-dom';

function Connexion(){
    //My variables 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
          console.log("data:" + data);
          if (response.ok)
          {
            console.log("Going to film page");
            navigate('/listeFilms');
          } else {
            setError(data.message || "Inavalid logon")
          }
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
        {error && <p style={{ color: "red" }}>{error}</p>}

      </form>

      {/* Don't have an account? */}
      <div className='signup-container'>

        <p className='signup-text'>You don’t have an account? </p>
      
        
        <button className="btn btn-outline-primary" >
          <Link
            to="/inscription"
            className="nav-link active text-white text-"
            style={{ fontSize:"20px"}}
            >
          Create Account
            </Link>
        </button>
      </div>
    </div>
  </div>
)
};

export default Connexion