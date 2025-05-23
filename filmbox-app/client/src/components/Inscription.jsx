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
import { validEmail, validPassword, validName, validPhoneNumber } from './regex.js';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [matchingPwdError, setMatchingPwdError] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        //Clear errors 
        setEmailErr(false);
        setPwdError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setPhoneNumberError(false);
        setMatchingPwdError(false);
        setMessage('');

        let isValid = true;

        if (!validEmail.test(email)) {
            setEmailErr(true);
            isValid = false;
        }
        if (!validPassword.test(password)) {
            setPwdError(true);
            isValid = false;
        }
        if (!validName.test(firstName) || !validName.test(firstName)) {
            setFirstNameError(true);
            isValid = false;
        }
        if (!validName.test(lastName) || !validName.test(lastName)) {
            setLastNameError(true);
            isValid = false;
        }
        if (!validPhoneNumber.test(phoneNumber)) {
            setPhoneNumberError(true);
            isValid = false;
        }
        if (password != confirmPassword) {
            setMatchingPwdError(true);
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            setMessage("Invalid, please correct the following inputs");
            return;
        }

        const newUser = { firstName, lastName, email, phoneNumber, password, confirmPassword };

        //AJOUTER MESSAGE D'ERREURRR !!!
        try {
            const response = await fetch('http://localhost:4000/LoginRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(newUser)
            });

            const data = await response.json();

            if (response.ok && data.success)
            {
                console.log("User succesfully created!");
                navigate("/listeFilms");
            } else {
                setMessage(data.message || "something went wrong");
            }

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
            <h1 style={{ marginTop: '15vh' }} >Sign Up</h1> {/*style={{marginTop: '25px'}} */}
            <div className="wrapper">

                <div className="d-flex flex-column rounded-2 mx-auto" style={{
                    width: '100%',//width: '110%',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '2.5rem 4rem',//'5rem 5rem',
                    boxShadow: '0 10px 20px rgba(17, 1, 1, 0.2)',
                    //transform: 'translateX(-5%)'
                }}>

                    {message && <p className="text-danger mb-2">{message}</p>}

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '5rem' }}>

                        {/* Nom Prenom */}
                        <div className="input-box" id="blocForm haut" style={{ gridColumn: '1/2', marginTop: '2rem' }}>
                            <p id="titresForm"> First Name:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: Lila" required value={firstName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFirstName(e.target.value);
                                    setFirstNameError(!validName.test(value));
                                }}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            {firstNameError && <p className="text-danger mt-1">Only letters allowed</p>}
                        </div>

                        <div className="input-box" id="blocForm" style={{ gridColumn: '2/3', marginTop: '2rem' }}>
                            <p id="titresForm"> Last Name:</p>
                            <input id="inputForm" className='w-100  p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: Tremblay" required value={lastName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLastName(e.target.value);
                                    setLastNameError(!validName.test(value));
                                }}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            <div style={{ minHeight: '1.5rem' }}>

                                {/* The code to use an invisible placeholder to not move the whole when showing an error was given by chat*/}
                                {lastNameError ? (
                                    <p className="text-danger mt-1">Only letters allowed</p>
                                ) : (
                                    <p className="invisible mt-1">Placeholder</p>
                                )}
                            </div>
                            {/*lastNameError && <p className="text-danger mt-1">Only letters allowed</p>*/}
                        </div>


                        {/* Email / telephone */} {/* BTW : input className= 'p-2 pe-5' OU 'p-2 pe-5 ps-3'*/}
                        <div className="input-box" id="blocForm" style={{ gridColumn: '1/2', marginTop: '4rem' }}>
                            <p id="titresForm"> Email:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: lilatremblay@gmail.com" required value={email}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setEmail(e.target.value);
                                    setEmailErr(!validEmail.test(value));
                                }}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            {emailErr && <p className="text-danger mt-1">Invalid email format</p>}

                        </div>

                        <div className="input-box" id="blocForm" style={{ gridColumn: '2/3', marginTop: '4rem' }}>
                            <p id="titresForm"> Phone Number:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="text" placeholder="Ex: 514-123-5678" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            {phoneNumberError && <p className="text-danger mt-1">Invalid phone number</p>}
                        </div>


                        {/* Mot de passe */}
                        <div className="input-box" id="blocForm" style={{ gridColumn: '1/2', marginTop: '4rem' }}>
                            <p id="titresForm"> Password:</p>
                            <input id="inputForm" className='w-100  p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            {pwdError && <p className="text-danger mt-1">Invalid password format</p>}
                        </div>

                        <div className="input-box" id="blocForm" style={{ gridColumn: '2/3', marginTop: '4rem' }}>
                            <p id="titresForm"> Confirm Password:</p>
                            <input id="inputForm" className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-4 ' type="password" placeholder="Enter your password again" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ backgroundImage: `url(${cadenas})` }} />
                            {matchingPwdError && <p className="text-danger mt-1">Passwords don't match</p>}
                        </div>

                        <div className="d-flex flex-column align-items-center" style={{
                            gridColumn: 'span 2',
                            gap: '0rem',
                            marginTop: '2.5rem'
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
            <div className="LoginLink btnWrapper" style={{ textAlign: "center", marginBottom: '15vh' }}>
                <p>You already have an account ?</p>
                <Link to="/connexion">
                    <button type="submit" className="btnFakeBorder" style={{ fontSize: '16px' }} /*className="nav-link active text-white"*/ >
                        LOGIN
                    </button>
                </Link>
            </div>

        </div>
    );
}

export default LoginRegister;