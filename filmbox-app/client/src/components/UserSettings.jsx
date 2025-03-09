import React, { useState, useEffect } from 'react';
import '../styles/UserSettings.css';

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
            <div>
                <h1>This is the page with the user data, he will be able to change his password or delete his account</h1>
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
        </>
    );
}

export default UserSettings;
