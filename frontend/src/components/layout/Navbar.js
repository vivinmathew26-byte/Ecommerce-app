import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          🛍️ ShopEasy
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(`/products?search=${e.target.value}`);
            }}
          />
        </div>

        <div className="navbar-actions">
          <Link to="/products" className="nav-link">Products</Link>

          {user ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <div className="user-menu">
                <button onClick={() => setMenuOpen(!menuOpen)} className="user-btn">
                  👤 {user.username}
                </button>
                {menuOpen && (
                  <div className="dropdown">
                    <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
