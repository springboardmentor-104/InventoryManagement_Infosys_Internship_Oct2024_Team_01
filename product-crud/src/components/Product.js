// src/components/Product.js
import React from 'react';

const Product = ({ product, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.sku}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>{product.views}</td>
            <td>{product.status}</td>
            <td>
                <button onClick={onEdit} className="btn btn-edit">Edit</button>
                <button onClick={onDelete} className="btn btn-delete">Delete</button>
            </td>
        </tr>
    );
};

export default Product;
