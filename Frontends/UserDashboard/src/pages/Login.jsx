import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ onLogin, onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://auth-service-lphz.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || 'Invalid credentials' });
        return;
      }

      // ✅ Save token
      localStorage.setItem('token', data.token);

      // ✅ Save entire user object
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Save only u_id separately (important!)
      localStorage.setItem('userId', data.user.u_id);

      if (onLogin) onLogin(data.user);
      if (onClose) onClose();

      // ✅ Redirect based on role
      if (data.user.role === 'U' || data.user.role === 'user') {
        navigate('/userDashboard');
      } else if (data.user.role === 'O' || data.user.role === 'organization') {
        navigate('/orgDashboard');
      }

    } catch (err) {
      setErrors({ general: 'Server error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.general && <p className="error-message">{errors.general}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account?{' '}
            <button className="link-btn" onClick={onSwitchToSignup}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
