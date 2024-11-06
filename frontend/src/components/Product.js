
import React from 'react';

const Product = ({ product, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>{product.stockQuantity}</td>
            <td>{product.category ? product.category.name : 'N/A'}</td> {/* Assuming category is an object with a 'name' field */}
            <td>{product.description}</td>
            <td>{product.imageUrl}</td>
            <td>
                <button onClick={onEdit} className="btn btn-edit">Edit</button>
                <button onClick={onDelete} className="btn btn-delete">Delete</button>
            </td>
        </tr>
    );
};

export default Product;
