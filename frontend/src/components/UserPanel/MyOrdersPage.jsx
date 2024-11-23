import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getImageUrl } from '../../utils/imageUtil';
import './MyOrdersPage.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [sortOrder, setSortOrder] = useState('date');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: { page },
        });
        setOrders(response.data.orders || []);
        setTotalOrders(response.data.totalOrders);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  const handleOrderClick = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null); 
  };

  const sortOrders = (orders, sortOrder) => {
    return orders.sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === 'price') {
        return b.total - a.total;
      }
      return 0;
    });
  };

  const isNextDisabled = page >= Math.ceil(totalOrders / 10);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="top-controls">
        <div>
          <label>Sort by: </label>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div className="pagination-container">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={isNextDisabled}>
            Next
          </button>
        </div>
      </div>

      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {sortOrders(orders, sortOrder).map((order) => (
              <tr
                key={order.id}
                className={`status-${order.status.toLowerCase()} ${selectedOrder?.id === order.id ? 'selected' : ''}`}
                onClick={() => handleOrderClick(order.id)}
              >
                <td>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>INR {order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No orders found.</div>
      )}

      {selectedOrder && (
        <div className="order-details">
          <button className="close-btn" onClick={closeOrderDetails}>×</button>
          <h3>Order Details</h3>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
          <ul>
            {selectedOrder.products.map((item, index) => (
              <li key={index}>
                <p><strong>{item.product.name}</strong> (x{item.quantity}) - INR {item.totalPrice}</p>
                <img src={getImageUrl(item.product.image)} alt={item.product.name} width="100" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
