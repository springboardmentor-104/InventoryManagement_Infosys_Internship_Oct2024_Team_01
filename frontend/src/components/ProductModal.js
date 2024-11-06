import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stockQuantity: product.stockQuantity,
                category: product.category ? product.category._id : '',
                imageUrl: product.imageUrl || '',
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
                category: '',
                imageUrl: '',
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
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Stock Quantity</label>
                        <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Category</label>
                        <input name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
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
