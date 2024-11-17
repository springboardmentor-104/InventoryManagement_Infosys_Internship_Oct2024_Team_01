import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getImageUrl = (imagePath) => {
    return `${process.env.REACT_APP_BACKEND_URL}/${imagePath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/user/products/${product._id}`} 
            className="product-link"
          >
            <div className="product-card">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={getImageUrl(product.images[0])} 
                  alt={product.name || 'Product'} 
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h4>{product.name || 'N/A'}</h4>
              <p>${product.price !== null ? product.price.toFixed(2) : 'N/A'}</p>
              <button>Add to Cart</button>
            </div>
          </Link>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductsPage;
