import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);  // State for the current image URL

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stockQuantity: product.stockQuantity,
                category: product.category ? product.category._id : '',
            });
            setCurrentImage(product.images ? product.images[0].url : null); // Set the current image URL
            setImageFile(null);  // Clear the image file when the product is edited
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
                category: '',
            });
            setCurrentImage(null);  // No image when adding a new product
            setImageFile(null);
        }
    }, [product]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    
        // Create a preview URL for the selected file
        if (file) {
            const imagePreviewUrl = URL.createObjectURL(file);
            setCurrentImage(imagePreviewUrl);  // Update the image preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            let productId = product ? product._id : null;

            const productPayload = { ...formData };

            if (!productId) {
                // Create the product
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/products`,
                    productPayload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                productId = response.data._id;
            } else {
                // Update the product
                await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`,
                    productPayload,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            if (imageFile) {
                // Handle image upload
                const imageFormData = new FormData();
                imageFormData.append("images", imageFile);

                const imageResponse = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}/images`,
                    imageFormData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                // Merge images into the product payload
                productPayload.images = imageResponse.data.images;
            } else if (!imageFile && currentImage) {
                // If no new image is selected, retain the current image
                productPayload.images = [{ url: currentImage }];
            }

            // Return the updated product to the parent
            onSave({ ...productPayload, _id: productId });
        } catch (error) {
            console.error("Failed to save product or upload image:", error);
            alert("An error occurred while saving the product. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            stockQuantity: '',
            category: '',
        });
        setImageFile(null);
        setCurrentImage(null);  // Reset the current image
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
                        <select name="category" value={formData.category} onChange={handleChange} required>
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Product Image</label>
                        {currentImage && <img src={currentImage} alt="Product" className="product-image-preview" />}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="button-group">
                        <div className="left-buttons">
                            <button type="button" onClick={onClose} className="btn btn-cancel">Cancel</button>
                            <button type="button" onClick={handleReset} className="btn btn-reset">Reset</button>
                        </div>
                        <div className="right-button">
                            <button type="submit" className="btn btn-add">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default ProductModal;
