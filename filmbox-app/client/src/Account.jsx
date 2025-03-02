import React, { useState } from 'react';
import './SignIn.css';

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

        try {
            // Send the data to your backend endpoint
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            // Process the response
            const data = await response.json();
            setMessage(data.message || 'Registration successful!');
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while registering.');
        }
    };

    return (
        <>
    <h1>Sign Up</h1>
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-box">
                            <p>First Name:</p>
                            <input type="text" placeholder="Ex: Marie" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <p>Last Name:</p>
                            <input type="text" placeholder="Ex: Tremblay" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-box">
                            <p>Email:</p>
                            <input type="text" placeholder="Ex: marietremblay@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <p>Phone Number:</p>
                            <input type="text" placeholder="Ex: 514-123-5678" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-box">
                            <p>Password:</p>
                            <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <p>Confirm Password:</p>
                            <input type="password" placeholder="Enter your password again" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">CREATE ACCOUNT</button>
                </form>
            </div>
            </div>
            <div className="LoginLink">
                <p>Already have an account ?</p>
                <button type="submit">LOGIN</button>
            </div>
        </>
    );
}

export default LoginRegister;
