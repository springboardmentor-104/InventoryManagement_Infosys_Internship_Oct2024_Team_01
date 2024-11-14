import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(response.data); // Set the products from the backend
      } catch (err) {
        setError(err.message);
        // If there's an error, set products with null values
        setProducts([
          { id: 1, name: null, price: null, image: null }
        ]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.image || 'placeholder.jpg'} 
              alt={product.name || 'No Image Available'} 
            />
            <h4>{product.name || 'N/A'}</h4>
            <p>${product.price !== null ? product.price.toFixed(2) : 'N/A'}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductsPage;
