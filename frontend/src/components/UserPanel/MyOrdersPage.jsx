import React, { useState, useEffect } from 'react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetching orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/orders'); // Updated URL with port 4000
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json(); // Assuming the response is JSON
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th><th>Date</th><th>Status</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td> {/* Format date */}
                <td>{order.status}</td>
                <td>${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p> // Handle empty orders
      )}
    </div>
  );
};

export default MyOrdersPage;
