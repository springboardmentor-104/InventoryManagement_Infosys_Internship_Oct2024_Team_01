import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartPage from "./CartPage"; // Import CartPage
import "./index.css";

const ProductDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // To store selected color
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // To toggle CartPage
  const [showNotification, setShowNotification] = useState(false); // Notification state

  const products = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      description:
        "Crystal-clear sound with active noise cancellation, 30-hour battery life, and comfortable design.",
      price: 299.99,
      availability: true,
      rating: 4.5,
      colors: ["Black", "Silver", "Gold"],
      images: {
        Black: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        Silver: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
        Gold: "https://images.unsplash.com/photo-1587786612220-e39f18f0f00f",
      },
      relatedProducts: [2, 3],
    },
    {
      id: 2,
      title: "Smart LED TV 65 inch",
      description:
        "Ultra HD resolution, smart connectivity, and immersive sound quality.",
      price: 899.99,
      availability: true,
      rating: 4.7,
      colors: ["Black", "White"],
      images: {
        Black: "https://images.unsplash.com/photo-1521747116042-5d4e3e1e0a1f",
        White: "https://images.unsplash.com/photo-1505690362154-689b62bcf313",
      },
      relatedProducts: [1, 3],
    },
    {
      id: 3,
      title: "4K Ultra HD Camera",
      description:
        "Capture every detail with this professional-grade 4K camera, perfect for photography and videography.",
      price: 499.99,
      availability: true,
      rating: 4.8,
      colors: ["Black", "Red", "Blue"],
      images: {
        Black: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        Red: "https://images.unsplash.com/photo-1547643175-cf76d5e94f88",
        Blue: "https://images.unsplash.com/photo-1521747116042-5d4e3e1e0a1f",
      },
      relatedProducts: [1, 2],
    },
    {
      id: 4,
      title: "Smartphone Pro Max",
      description:
        "The latest smartphone with an advanced camera system, 5G support, and a stunning display.",
      price: 1099.99,
      availability: true,
      rating: 4.6,
      colors: ["Space Gray", "Silver", "Gold"],
      images: {
        "Space Gray": "https://images.unsplash.com/photo-1587786612220-e39f18f0f00f",
        Silver: "https://images.unsplash.com/photo-1590384186440-7d9ea3e5e759",
        Gold: "https://images.unsplash.com/photo-1590384186440-7d9ea3e5e759",
      },
      relatedProducts: [1, 2],
    },
    {
      id: 5,
      title: "Smart Watch Series 7",
      description:
        "A stylish smartwatch with fitness tracking, heart rate monitoring, and customizable bands.",
      price: 399.99,
      availability: true,
      rating: 4.4,
      colors: ["Black", "Pink", "Blue"],
      images: {
        Black: "https://images.unsplash.com/photo-1595437007801-7350e7403b4e",
        Pink: "https://images.unsplash.com/photo-1617601822766-6741b4d82f0c",
        Blue: "https://images.unsplash.com/photo-1617601822766-6741b4d82f0c",
      },
      relatedProducts: [2, 3],
    },
  ];

  const handleAddToCart = () => {
    const colorToAdd = selectedColor || selectedProduct.colors[0]; // Default to first color if none selected
    const existingProduct = cart.find(
      (item) =>
        item.id === selectedProduct.id && item.selectedColor === colorToAdd
    );

    if (existingProduct) {
      setShowNotification(true); // Optional: Notify that the product is already in the cart
      setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
      return; // Exit the function to avoid adding duplicate
    }

    setCart([...cart, { ...selectedProduct, selectedColor: colorToAdd }]);
    setShowNotification(true); // Show notification
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  const getRelatedProducts = (relatedIds) => {
    return products.filter((product) => relatedIds.includes(product.id));
  };

  if (showCart) {
    return (
      <CartPage
        cart={cart}
        onBack={() => setShowCart(false)}
        setCart={setCart}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showNotification && (
        <div className="bg-green-500 text-white p-3 rounded-md fixed top-5 right-5 shadow-md">
          Product added to cart!
        </div>
      )}

      {!selectedProduct && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={product.images[Object.keys(product.images)[0]]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="mb-4 text-blue-500"
          >
            ← Back to products
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedProduct.images[selectedColor] || Object.values(selectedProduct.images)[0]}
                alt={selectedProduct.title}
                className="w-full h-96 object-cover rounded-md"
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{selectedProduct.title}</h1>
              <p>{selectedProduct.description}</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">${selectedProduct.price}</span>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Choose Color:</h2>
                <div className="flex space-x-4 mt-2">
                  {selectedProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md ${
                        selectedColor === color ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3"
                disabled={!selectedProduct.availability}
              >
                <FaShoppingCart className="inline mr-2" />
                Add to Cart
              </button>

              <button
                onClick={() => setShowCart(true)}
                className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <FaShoppingCart className="inline mr-3" />
                View Cart
              </button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {getRelatedProducts(selectedProduct.relatedProducts).map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition"
                >
                  <img
                    src={product.images[Object.keys(product.images)[0]]}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
