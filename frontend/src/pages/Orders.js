import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import './Orders.css';

const statusColor = { pending: '#f59e0b', confirmed: '#3b82f6', shipped: '#8b5cf6', delivered: '#10b981', cancelled: '#ef4444' };

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getAll()
      .then(({ data }) => setOrders(data.results || data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ marginTop: '4rem' }} />;

  return (
    <div className="container orders-page">
      <h1 className="page-title">My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: '3rem' }}>📦</p>
          <h3>No orders yet</h3>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="order-card card">
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <span className="order-date">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="status-badge" style={{ background: statusColor[order.status] + '20', color: statusColor[order.status] }}>
                  {order.status.toUpperCase()}
                </span>
                <p className="order-total">₹{parseFloat(order.total_amount).toLocaleString()}</p>
              </div>
            </div>
            <div className="order-items">
              {order.items?.map(item => (
                <div key={item.id} className="order-item-row">
                  <span>{item.product_name}</span>
                  <span>x{item.quantity}</span>
                  <span>₹{parseFloat(item.subtotal).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <p className="order-address">📍 {order.shipping_address}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
