import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Product from '../Product';
import ProductModal from '../ProductModal';
import './ProductList.css';

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
        const config = { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } };
        try {
            if (product._id) {
                const response = await axios.put(
                    `http://localhost:4000/api/products/${product._id}`, 
                    product, 
                    config
                );
                setProducts(products.map(p => (p._id === response.data._id ? response.data : p)));
            } else {
                const response = await axios.post("http://localhost:4000/api/products", product, config);
                setProducts([...products, response.data]);
            }
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product. Please check your permissions.");
        }
        setIsModalOpen(false);
    };

    const handleDeleteProduct = async (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        
        try {
            await axios.delete(`http://localhost:4000/api/products/${id}`, config);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please check your permissions.");
        }
    };

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <div className="add-product-button">
                <button onClick={handleAddProduct} className="btn">Add Product</button>
            </div>
            <section className="product-grid">
                {products.map(product => (
                    <Product
                        key={product._id}
                        product={product}
                        onEdit={() => handleEditProduct(product)}
                        onDelete={() => handleDeleteProduct(product._id)}
                    />
                ))}
            </section>
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
