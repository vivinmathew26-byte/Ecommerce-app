import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!address.trim()) { toast.error('Please enter shipping address'); return; }
    setPlacing(true);
    try {
      const { data } = await orderAPI.create({ shipping_address: address });
      await clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${data.id}`);
    } catch {
      toast.error('Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container">
        <div className="empty-state" style={{ marginTop: '4rem' }}>
          <p style={{ fontSize: '4rem' }}>🛒</p>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.product.image || 'https://via.placeholder.com/80x80'}
                alt={item.product.name}
              />
              <div className="cart-item-info">
                <h4>{item.product.name}</h4>
                <p className="cart-item-price">₹{parseFloat(item.product.price).toLocaleString()}</p>
              </div>
              <div className="cart-item-qty">
                Qty: <strong>{item.quantity}</strong>
              </div>
              <div className="cart-item-subtotal">
                ₹{parseFloat(item.subtotal).toLocaleString()}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cart.items.length})</span>
            <span>₹{parseFloat(cart.total).toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free">FREE</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{parseFloat(cart.total).toLocaleString()}</span>
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label>Shipping Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter your full address..."
            />
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? 'Placing Order...' : '✅ Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
