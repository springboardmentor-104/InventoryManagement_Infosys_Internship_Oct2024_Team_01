import "./ProductModal.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageUrl: '',
    });
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/categories'); // Assuming you have this route
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

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
                <br />
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
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
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
