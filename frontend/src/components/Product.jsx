import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtil';
import './Product.css';

const Product = ({ product, onEdit, onDelete }) => {

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={getImageUrl(product.images[0])} alt={product.name} />
        ) : (
          <span>No Image</span>
        )}
      </Link>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stockQuantity}</p>
        <p>Category: {product.category?.name || 'Uncategorized'}</p>

        {onEdit && onDelete && (
          <div className="product-actions">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
