import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import cadenas from '../assets/icone_cadenas.png';
import titanicImage from '../assets/Titanic.png';
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
            localStorage.setItem("userId", data.userId);
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

  <div className="d-flex flex-column justify-content-center align-items-center" //vh-100" 
  style={{
    
    minHeight: '120vh', // Page + haute   => minHeight: '100vh', ///////
    paddingTop: '5vh', // 
    paddingBottom: '5vh', //

    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Istok Web, sans-serif',
    fontSize: 'large',

    background: `linear-gradient(to bottom,
        rgba(5, 14, 66, 1),
        rgba(26, 0, 255, 0.6), 
        rgba(0, 0, 255, 0.5), 
        rgba(5, 0, 50, 1)),
        url(${titanicImage})`,

        backgroundSize: 'cover',  //'auto'
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
  }}
  > 
    <h2 style={{marginTop: '25px', marginBottom: '2rem'}}>Log in</h2>
     
     {/* Container du formulaire */}
    <div>

      <form onSubmit={handleSubmit} className='login-form' style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.31rem',

          width: '100%',
          maxWidth: '400px',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '2rem 2.5rem',
          borderRadius: '10px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
          }}>
        
        {/* Email */}
        <label htmlFor="email" className="input-label">Email</label>
        
        <div className="mb-3 position-relative">
          <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4' type='email' placeholder='Example@gmail.com' required value={email} onChange={(e) => setEmail(e.target.value)}
            style={{backgroundImage: `url(${arobase})`}}/>
        </div>

        {/* Mot de passe */}
        <label htmlFor="password" className="input-label">Password</label>
          
        <div className="mb-3 position-relative">
          <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type='password' placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)}
            style={{backgroundImage: `url(${cadenas})`}}/>
        </div>

        {/* Checkbox "Remember me" */}
        <div  style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'}}>
          <input type="checkbox" id="remember" style={{accentColor: '#7465F7', cursor: 'pointer' }} />
          <label htmlFor="remember"> Remember me</label>
        </div>

        {/* Ligne séparatrice */}
        <div style={{alignSelf: 'center', width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}></div>

        {/* Bouton login */}
        <button type="submit" className="btn btn-primary w-100 login-btn">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

      </form>

      {/* Don't have an account? */}
      <div className='text-center mt-5'>

        <p className='signup-text'>You don’t have an account? </p>
      
        <div className='btnWrapper'>
          <button className="btnFakeBorder" >
            <Link to="/inscription" className="nav-link active " >
              Create Account
            </Link>
          </button>
        </div>

        {/*<button className="btn btn-outline-primary" >
          <Link
            to="/inscription"
            className="nav-link active text-white text-"
            style={{ fontSize:"20px"}}
            >
          Create Account
            </Link>
        </button>*/}        
      </div>

    </div>
  </div>
)
};

export default Connexion
