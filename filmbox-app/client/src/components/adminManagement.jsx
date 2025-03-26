import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminManagement() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/adminLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        console.log("WE ARE HEREE THOOOO");
        navigate('/adminManagement');
      } else {
        setError(data.message || 'Erreur de connexion admin');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur serveur');
    }
  };

  return (
    <div>
      <h2>Admin Management Page</h2>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input
          id="username"
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log in</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AdminManagement;
