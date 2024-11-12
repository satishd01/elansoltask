// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './componenet/Loginform';
import RegisterForm from './componenet/Registerform';
import UserTable from './componenet/Dashobord';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = (data) => {
    localStorage.setItem('token', data.token);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/register" /> : <LoginForm onLogin={handleAuth} />}
        />
        <Route
          path="/login"
          element={<RegisterForm onRegister={handleAuth} />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <UserTable /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
