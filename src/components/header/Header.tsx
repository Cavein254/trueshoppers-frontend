import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file
import { AuthContext } from '../../AuthContext';


function Header() {
  const { isLoggedIn, userEmail, logout } = useContext(AuthContext);
 
  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">My e-Commerce</Link>
      </div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/shops">Shops</Link></li>
          <li><Link to="/about">About</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/myshops">My Shops</Link></li>
              <li><Link to="/create-shop">Create Shop</Link></li>
              <li className="header-user-email">{userEmail}!</li>
              <li><button onClick={logout} className="header-logout-btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;