import React, { useState, useEffect } from 'react';
import '../styles/UserSettings.css';

function UserSettings() {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');

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

    return (
        <div>
            <h1>This is the page with the user data, he will be able to change his password or delete his account</h1>
                <div>
                    <p><strong>First Name:</strong> {user.prenom}</p>
                    <p><strong>Last Name:</strong> {user.nom}</p>
                    <p><strong>Email:</strong> {user.courriel}</p>
                    <p><strong>Phone Number:</strong> {user.telephone}</p>
                </div>
            </div>
    );
}

export default UserSettings;
