import React from 'react';
import './SignIn.css';

function LoginRegister() {
    return (
        <>
    <h1>Sign Up</h1>
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    
                    <div className="row">
                        <div className="input-box">
                            <p>First Name:</p>
                            <input type="text" placeholder="Ex: Marie" required />
                        </div>
                        <div className="input-box">
                            <p>Last Name:</p>
                            <input type="text" placeholder="Ex: Tremblay" required />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-box">
                            <p>Email:</p>
                            <input type="text" placeholder="Ex: marietremblay@gmail.com" required />
                        </div>
                        <div className="input-box">
                            <p>Phone Number:</p>
                            <input type="text" placeholder="Ex: 514-123-5678" required />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="input-box">
                            <p>Password:</p>
                            <input type="password" placeholder="Enter your password" required />
                        </div>
                        <div className="input-box">
                            <p>Confirm Password:</p>
                            <input type="password" placeholder="Enter your password again" required />
                        </div>
                    </div>

                    <button type="submit">CREATE ACCOUNT</button>
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
