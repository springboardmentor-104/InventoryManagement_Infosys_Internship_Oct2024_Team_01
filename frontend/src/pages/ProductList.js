import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from '../components/ProductModal';
import Product from '../components/Product';
import './ProductList.css'; // Add a new CSS file for styling

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:4000/api/products", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleSaveProduct = async (product) => {
        if (product._id) {
            const response = await axios.put(`http://localhost:4000/api/products/${product._id}`, product);
            setProducts(products.map(p => (p._id === response.data._id ? response.data : p)));
        } else {
            const response = await axios.post("http://localhost:4000/api/products", product);
            setProducts([...products, response.data]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:4000/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
    };

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <button onClick={handleAddProduct} className="btn">Add Product</button>
            <div className="product-grid">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        onEdit={() => handleEditProduct(product)}
                        onDelete={() => handleDeleteProduct(product._id)}
                    />
                ))}
            </div>

            <ProductModal
                product={currentProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProduct}
            />
        </div>
    );
};

export default ProductList;
