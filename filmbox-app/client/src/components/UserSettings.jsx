import React, { useState } from 'react';
import '../styles/UserSettings.css';
import { Link } from 'react-router-dom';

function UserSettings() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userData = { firstName, lastName, email, phoneNumber, password, confirmPassword };

        //AJOUTER MESSAGE D'ERREURRR !!!
        try {
            const response = await fetch('http://localhost:4000/UserSettings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="inscription-page">
    <h1>This is the page with the user data</h1>
        </div>
    );
}

export default UserSettings;
