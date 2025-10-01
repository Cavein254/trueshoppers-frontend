import { useContext, useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn, logout, userEmail } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      return toast.error("Invalid credentials");
    }
    return navigate('/')
  };

  return (
    <div className="auth-container">
      {isLoggedIn ? (
        <div>
          <p>Welcome {userEmail}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      </>
      )}
    </div>
  );
};

export default Login;