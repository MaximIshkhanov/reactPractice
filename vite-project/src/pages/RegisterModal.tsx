import React, { useState } from 'react';

interface RegisterModalProps {
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0OTE3MDc5LCJleHAiOjE2ODYxMjY2Nzl9.s0YPmaDO1nqfgonIK5bEB6RMrgpILd1Fgh5nOTpDvn8';
      const response = await fetch('https://api.news.academy.dunice.net/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData.user);  // Посмотрите, что возвращает сервер
        alert('Registration successful!');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Registration failed: ${errorData.message || response.statusText}`);
      }
      if (response.ok) {
        alert('Registration successful!');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Registration failed: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('There was an error with the registration:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </p>
          <p>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;