import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/arobase.png';
import cadenas from '../assets/cadenas.png';
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

  <div className="classBody"
  style={{
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Istok Web, sans-serif',

    fontSize: 'large', /* avant c'était dans "*" AAAA*/
    display: 'flex',
    flexDirection: 'column',
    gap: '1.31rem',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',

    background: `linear-gradient(to bottom,
        rgba(5, 14, 66, 1),
        rgba(26, 0, 255, 0.6), 
        rgba(0, 0, 255, 0.5), 
        rgba(5, 0, 50, 1)),
        url(${titanicImage})`,

        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff'
  }}
  > 
    <h2 /*className="form-title"*/ style={{marginTop: '25px'}}>Log in</h2>
     
     {/* Container du formulaire */}
    <div /*className='login-container'*/>

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
        
        <div /*className='input-wrapper'*/style={{ display: 'flex', alignItems: 'center' }} /*AAAA POURQUOI*/>
          <input type='email' placeholder='example@gmail.com' className='input-field' required value={email} onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '10px', border: '1px solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', borderRadius: '15px'/*, flexGrow: 1 */}}/>
          <i><img src={arobase} alt="Arobase" /*className="icon-image"*/ style={{right:'10px', width: '20px', height: '20px', marginLeft: '10px' }}/> </i>
        </div>

        {/* Mot de passe */}
        <label htmlFor="password" className="input-label">Password</label>
          
        <div /*className='input-wrapper'*/style={{ display: 'flex', alignItems: 'center' }} /*AAAA POURQUOI*/>
          <input type='password' placeholder='enter your password' className='input-field' required value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', border: '1px solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', borderRadius: '15px'/*, flexGrow: 1 */}}/>
          <i><img src={cadenas} alt="Cadenas" /*className="icon-image"*/ style={{right:'10px', width: '20px', height: '20px', marginLeft: '10px' }} /> </i>
        </div>

        {/* Checkbox "Remember me" */}
        <div /*className="remember-me"*/ style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px'}}>
          <input type="checkbox" id="remember" style={{ accentColor: '#7465F7', cursor: 'pointer' }} />
          <label htmlFor="remember"> Remember me</label>
        </div>

        {/* Ligne séparatrice */}
        <div /*className="separator"*/ style={{alignSelf: 'center', width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}></div>

        {/* Bouton login */}
        <button type="submit" className="btn btn-primary login-btn">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}

      </form>

      {/* Don't have an account? */}
      <div /*className='signup-container'*/style={{textAlign: 'center', marginTop: '50px'}}>

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
