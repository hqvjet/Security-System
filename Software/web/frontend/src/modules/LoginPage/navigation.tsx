'use client'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './login_form';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (role: string) => {
    switch (role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'police':
        navigate('/police');
        break;
      case 'securitystaff':
        navigate('/securitystaff');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <LoginForm onLoginSuccess={handleLoginSuccess} />
  );
};

const Navigation: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Define other routes for admin, police, and security staff */}
      </Routes>
    </Router>
  );
};

export default Navigation;
