import React from 'react'

function LoginRegister() {
    return (
        <div className="wrapper">
            <div className="form-box login">
                <form action="">
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text"
                            placeholder='Ex: Marie' required />
                    </div>
                    <div className="input-box">
                        <input type="text"
                        placeholder='Ex: Tremblay' required />
                    </div>
                    <div className="input-box">
                        <input type="text"
                        placeholder='Ex: marietremblay@gmail.com' required />
                    </div>
                    <div className="input-box">
                        <input type="text"
                        placeholder='Ex: 514-123-5678' required />
                    </div>
                    <div className="input-box">
                        <input type="password"
                        placeholder='Enter your password' required />
                    </div>
                    <div className="input-box">
                        <input type="password"
                        placeholder='Enter your password again' required />
                    </div>

                    <button type="submit">CREATE ACCOUNT</button>

                    <div className="LoginLink">
                        <p>Already have an account ?</p>
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    ) 
}

export default LoginRegister