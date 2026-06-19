import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const ordering = searchParams.get('ordering') || '';

  useEffect(() => {
    setLoading(true);
    Promise.all([
      productAPI.getAll({ search, category, ordering }),
      productAPI.getCategories()
    ]).then(([p, c]) => {
      setProducts(p.data.results || p.data);
      setCategories(c.data.results || c.data);
    }).finally(() => setLoading(false));
  }, [search, category, ordering]);

  const updateFilter = (key, value) => {
    const params = Object.fromEntries(searchParams);
    if (value) params[key] = value;
    else delete params[key];
    setSearchParams(params);
  };

  return (
    <div className="container products-page">
      <div className="products-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul className="cat-list">
            <li className={!category ? 'active' : ''} onClick={() => updateFilter('category', '')}>All</li>
            {categories.map(c => (
              <li
                key={c.id}
                className={category === String(c.id) ? 'active' : ''}
                onClick={() => updateFilter('category', c.id)}
              >
                {c.name}
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: '1.5rem' }}>Sort By</h3>
          <ul className="cat-list">
            {[
              { label: 'Newest', val: '-created_at' },
              { label: 'Price: Low to High', val: 'price' },
              { label: 'Price: High to Low', val: '-price' },
            ].map(o => (
              <li
                key={o.val}
                className={ordering === o.val ? 'active' : ''}
                onClick={() => updateFilter('ordering', o.val)}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="products-main">
          <div className="products-header">
            <h2>{search ? `Results for "${search}"` : 'All Products'}</h2>
            <span className="product-count">{products.length} products</span>
          </div>

          {loading ? (
            <div className="spinner" />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>No products found</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
