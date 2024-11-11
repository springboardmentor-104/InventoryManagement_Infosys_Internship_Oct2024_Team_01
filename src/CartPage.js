import React, { useState } from "react";

const CartPage = ({ cart, onBack, setCart }) => {
  // State to manage the product details view
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle removing a product from the cart
  const handleRemove = (productToRemove) => {
    const updatedCart = cart.filter((product) => product.id !== productToRemove.id);
    setCart(updatedCart); // Update the cart state with the remaining products
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product); // Set the selected product to view details
  };

  const handleBackToCart = () => {
    setSelectedProduct(null); // Go back to cart view
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500"
      >
        ← Back to product details
      </button>

      {selectedProduct ? (
        // Show Product Details View when a product is selected
        <div>
          <button onClick={handleBackToCart} className="mb-4 text-blue-500">
            ← Back to Cart
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedProduct.images[selectedProduct.selectedColor] || Object.values(selectedProduct.images)[0]} 
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
              {/* You can add more details here like colors, availability, etc. */}
            </div>
          </div>
        </div>
      ) : (
        // Cart Page View
        <div>
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cart.map((product, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    {/* Display image based on the selected color */}
                    <img
                      src={product.images[product.selectedColor] || Object.values(product.images)[0]} 
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-lg font-bold">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(product)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(product)}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-lg font-bold">
                  Total: ${cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default CartPage;