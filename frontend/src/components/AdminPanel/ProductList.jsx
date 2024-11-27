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
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
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
    const handleSaveProduct = (product) => {
        setProducts((prevProducts) => {
            const existingProductIndex = prevProducts.findIndex((p) => p._id === product._id);
            if (existingProductIndex !== -1) {
                // Update existing product
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = product;
                return updatedProducts;
            } else {
                // Add new product
                return [...prevProducts, product];
            }
        });
        setIsModalOpen(false);
    };

    const handleDeleteProduct = async (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, config);
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
