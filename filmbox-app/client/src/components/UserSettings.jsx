import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
    https://www.youtube.com/watch?v=oYGhoHW7zqI
    Pour ajouter token eventuellement, cookies et securite : 
    https://www.youtube.com/watch?v=oExWh86IgHA
    https://www.youtube.com/watch?v=9J3UQYcro-U
*/
function UserSettings() {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:4000/get-session');
                const data = await response.json();

                if (data.loggedIn) {
                    setUser(data.user);
                } else {
                    setMessage("SESSION INTROUVABLE");
                }
            } catch (error) {
                console.error('Error', error);
                setMessage("Error,");
            }
        };

        fetchUserData(); 
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:4000/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.courriel,
                    newPassword: newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                setMessage("Password updated");
            } else {
                setMessage("Error, couldnt update password");
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setMessage("An error occurred while updating the password.");
        }
    };

    const handleSubmitDelete = async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('http://localhost:4000/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: user.id})
            });

            const data = await response.json();

            if (data.success) {
                setMessage("User deleted");
            } else {
                setMessage("Error, couldnt delete account");
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setMessage("An error occurred while deleting account");
        }
    };

    return (
        <>
        <header>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap" rel="stylesheet" />
        </header>
        <div
            className="text-white d-flex flex-column justify-content-center align-items-center vh-100 m-0 p-0"
                style={{
                    fontFamily: 'Fredoka, sans-serif',
                    fontWeight: 300,
                    background: `linear-gradient(to bottom, rgba(4,0,69,1) 0%, rgba(32,13,134,1) 36%, rgba(44,0,140,1) 50%, rgba(32,13,134,1) 63%, rgba(4,0,69,1) 100%)`
                  }}
            >
                <h1>This is the page with the user data, he will be able to change his password or delete his account</h1>
            <div>
                <div class>
                    <p style={{fontSize:'22px'}}>First Name</p>
                    <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2' type="text" placeholder={user.prenom}
                    required value={user.firstName} onChange={(e) => setFirstName(e.target.value)}  
                    style={{ border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px' 
                }}/>

                <div className="input-box" style={{gridColumn : 1/2, width:'100%', marginTop:'2rem'}}>
                <p style={{fontSize:'22px'}}>Last Name</p>
                <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2' type="text" placeholder={user.nom}
                    style={{border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px' 
                }}/>
                <div className='input-box' style={{gridColumn : 1/2, width:'100%', marginTop:'2rem'}}>
                    <p style={{fontSize:'22px'}}>Email</p>
                    <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2 ' type="text" placeholder={user.courriel}  
                    style={{ border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px'
                }}/>
                <div className='input-box' style={{gridColumn: 1/2, width:'100%', marginTop:'2rem'}}>
                    <p style={{fontSize:'22px'}}>Phone Number</p>
                    <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2 ' type="text" placeholder={user.telephone}  
                    style={{ border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px'
                }}/>
                <div className='input-box' style={{gridColumn: 1/2, width:'100%', marginTop:'2rem'}}/>
                    <p style={{fontSize:'22px'}}>Password</p>
                    <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2 ' type="text" placeholder="***********"  
                    style={{ border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px'
                }}/>
                </div>
                <div className="input-box" style={{gridColumn : 1/2, width: '100%', marginTop:'2rem'}}>
                    <p style={{fontSize:'22px'}}>Confirm New Password</p>
                    <input className='w-100 p-2 pe-5 ps-3 text-white border-1 rounded-2 ' type="text" 
                    style={{ border: 'solid #7465F7', backgroundColor: 'rgba(116, 101, 247, 0.1)', outline: 'none', 
                    backgroundPosition: 'right 10px center', backgroundRepeat: 'no-repeat', backgroundSize: '20px'
                }}/>
                </div>
                </div>

                </div>
            </div>
                
                <div>
                    <p><strong>First Name:</strong> {user.prenom}</p>
                    <p><strong>Last Name:</strong> {user.nom}</p>
                    <p><strong>Email:</strong> {user.courriel}</p>
                    <p><strong>Phone Number:</strong> {user.telephone}</p>
                </div>
                                
                <form onSubmit={handleSubmit} className='ChangePassword'>
                    <label htmlFor="newPassword" className="input-label">New Password</label>
                    <div className='input-wrapper'>
                        <input 
                            type='password'
                            placeholder='Enter new password'
                            className='input-field'
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Update Password</button>
                </form>
                <form onSubmit={handleSubmitDelete} className='DeleteAccount'>
                    <button type="submit" className="btn btn-primary mt-3">Delete Account</button>
                </form>

            </div>
        </div>
            
        </>
    );
}

export default UserSettings;
