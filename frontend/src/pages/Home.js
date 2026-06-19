import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productAPI.getAll(), productAPI.getCategories()])
      .then(([p, c]) => {
        setProducts(p.data.results || p.data);
        setCategories(c.data.results || c.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Shop Everything <br /><span>You Love</span></h1>
          <p>Discover thousands of products at the best prices</p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="section container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.id}`} className="category-card">
                <span className="category-icon">🏷️</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Products */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Latest Products</h2>
          <Link to="/products" className="view-all">View All →</Link>
        </div>
        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="products-grid">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
