// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/authService';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(to top right, #6366f1, #8b5cf6, #ec4899)',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-4 rounded-4 shadow-lg"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 className="text-white text-center mb-4 fw-bold">Login to Your Account</h2>
        <AuthForm title="Login" onSubmit={handleLogin} buttonText="Login" />
        {error && (
          <p className="text-danger text-center mt-3">{error}</p>
        )}
        <p className="text-white text-center mt-3">
          Don’t have an account?{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
