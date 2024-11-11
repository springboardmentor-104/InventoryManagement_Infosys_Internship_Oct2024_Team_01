import React from 'react';
import './Product.css';

const Product = ({ product, onEdit, onDelete }) => {
    const getImageUrl = (imagePath) => {
        return `http://localhost:4000/${imagePath}`;
    };

    return (
        <div className="product-card">
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
                <p>{product.description}</p>
                <div className="product-actions">
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
