// src/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import './ProductsPage.css'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_API_URL/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-rating">Rating: {product.rating} ⭐</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
