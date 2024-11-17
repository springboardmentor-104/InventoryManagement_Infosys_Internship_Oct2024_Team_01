import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
    const getImageUrl = (imagePath) => {
        return `http://localhost:4000/${imagePath}`;
    };

    return (
        <Link to={`/products/${product.id}`} className="product-card">
            <div className="product-image">
                {product.images && product.images.length > 0 ? (
                    <img 
                        src={getImageUrl(product.images[0])} 
                        alt={product.name} 
                    />
                ) : (
                    <span>No Image</span>
                )}
            </div>
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stockQuantity}</p>
                <p>Category: {product.category?.name || 'Uncategorized'}</p>
            </div>
        </Link>
    );
};

export default Product;
