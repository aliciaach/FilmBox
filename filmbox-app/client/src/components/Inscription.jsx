import React, { useState } from 'react';
import logoFilmBox from '../assets/logoFilmBox.png';
import arobase from '../assets/icone_arobase.png';
import cadenas from '../assets/icone_cadenas.png';
import utilisateur from '../assets/icone_utilisateur.png';
import telephone from '../assets/icone_telephone.png';
import upImage from '../assets/Upd.jpg';
import SeigneurAnneauxImage from '../assets/seigneurDesAnneaux.png'; /////////
import '../styles/Inscription.css';
import { Link } from 'react-router-dom';
 
function LoginRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
   
        const newUser = { firstName, lastName, email, phoneNumber, password, confirmPassword };
 
        //AJOUTER MESSAGE D'ERREURRR !!!
        try {
            const response = await fetch('http://localhost:4000/LoginRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
 
            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };
 
    return (
        <div className="text-white d-flex flex-column justify-content-center align-items-center m-0 p-0"// vh-100 "
          style={{
            boxSizing: 'border-box', //
            fontFamily: 'Istok Web, sans-serif',

            minHeight: '120vh', // Page + haute   => minHeight: '100vh', ///////
            paddingTop: '15vh', //
            paddingBottom: '15vh', //
 

            fontSize: 'large',
            gap: '2rem',
       
            background: `linear-gradient(to bottom,
                rgba(5, 14, 66, 1),
                rgba(26, 0, 255, 0.6),
                rgba(0, 0, 255, 0.5),
                rgba(5, 0, 50, 1)),
                url(${SeigneurAnneauxImage})`,

            backgroundSize: 'cover', //'auto'
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        <h1 style={{marginTop: '15vh'}} >Sign Up</h1> {/*style={{marginTop: '25px'}} */}
        <div className="wrapper">

            <div className="d-flex flex-column rounded-2 mx-auto" style={{
                    width:'100%',//width: '110%',

                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '2.5rem 4rem',//'5rem 5rem',
                    boxShadow: '0 10px 20px rgba(17, 1, 1, 0.2)',
                    //transform: 'translateX(-5%)'
                }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '5rem'}}>
                        {/* Nom Prenom */}
 
                        <div className="input-box" id="blocForm haut" style={{gridColumn : '1/2',  marginTop:'2rem'}}>
                            <p id="titresForm"> First Name:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: Lila" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
                       
                        <div className="input-box" id="blocForm" style={{gridColumn : '2/3', marginTop:'2rem'}}>
                            <p id="titresForm"> Last Name:</p>
                            <input id="inputForm" className='w-100  p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: Tremblay" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
 
                   
                        {/* Email / telephone */} {/* BTW : input className= 'p-2 pe-5' OU 'p-2 pe-5 ps-3'*/}
 
                        <div className="input-box" id="blocForm" style={{gridColumn : '1/2',  marginTop:'4rem'}}>
                            <p id="titresForm"> Email:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: lilatremblay@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
 
                        <div className="input-box" id="blocForm" style={{gridColumn : '2/3', marginTop:'4rem'}}>
                            <p id="titresForm"> Phone Number:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 'type="text" placeholder="Ex: 514-123-5678" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
 
                   
                        {/* Mot de passe */}
 
                        <div className="input-box" id="blocForm" style={{gridColumn : '1/2', marginTop:'4rem'}}>
                            <p id="titresForm"> Password:</p>
                            <input id="inputForm" className='w-100  p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
                       
                        <div className="input-box" id="blocForm" style={{gridColumn : '2/3', marginTop:'4rem'}}>
                            <p id="titresForm"> Confirm Password:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="password" placeholder="Enter your password again" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})`}}/>
                        </div>
 
                    <div className="d-flex flex-column align-items-center" style={{
                            gridColumn: 'span 2',
                            gap: '0rem',
                            marginTop:'2.5rem'
                        }}>
 
                        {/* Ligne séparatrice */}
                            <div className="w-100 my-4" style={{
                                height: '1px',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            }}></div>
 
                        {/* Bouton Créer Compte */}
                        <button type="submit" className="btn btn-primary login-btn">CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
            </div>
            <div className="LoginLink" style={{ textAlign: "center", marginBottom: '15vh'}}>
                <p>You already have an account ?</p>
                <Link to="/connexion">
                <button type="submit" className="btn btn-outline-primary" /*className="nav-link active text-white"*/ >
                    LOGIN
                    </button>
                </Link>
            </div>
        </div>
    );
}
 
export default LoginRegister;