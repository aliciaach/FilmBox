import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminManagement() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("WE ARE HEREE THOOOO");
        navigate("/adminManagement");
      } else {
        setError(data.message || "Erreur de connexion admin");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur serveur");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100" >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h4 className="mb-4 text-center">Admin Login</h4>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Enter your admin username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminManagement;
