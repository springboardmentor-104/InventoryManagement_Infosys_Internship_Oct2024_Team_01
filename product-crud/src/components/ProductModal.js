// src/components/ProductModal.js
import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        price: '',
        stock: '',
        views: '',
        status: 'Active',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                sku: product.sku,
                price: product.price,
                stock: product.stock,
                views: product.views,
                status: product.status,
            });
        } else {
            setFormData({
                name: '',
                sku: '',
                price: '',
                stock: '',
                views: '',
                status: 'Active',
            });
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, _id: product ? product._id : undefined });
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>{product ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>SKU</label>
                        <input name="sku" value={formData.sku} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Views</label>
                        <input type="number" name="views" value={formData.views} onChange={handleChange} required />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-add">Save</button>
                        <button type="button" onClick={onClose} className="btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
    
};

export default ProductModal;
