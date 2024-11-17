import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch product details');
        }

        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-details-page">
      <h2 className="product-name">{product.name}</h2>
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/${product.images?.[0] || 'placeholder.jpg'}`}
        alt={product.name || 'Product Image'}
        className="product-image"
      />
      <div className="product-info">
        <p>
          <strong>Price:</strong> ${product.price?.toFixed(2) || 'N/A'}
        </p>
        <p>
          <strong>Stock:</strong> {product.stockQuantity || 'Out of stock'}
        </p>
        <p>
          <strong>Category:</strong> {product.category?.name || 'Uncategorized'}
        </p>
        <p>
          <strong>Description:</strong> {product.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
