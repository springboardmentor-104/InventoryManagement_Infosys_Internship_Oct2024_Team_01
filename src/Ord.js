import React, { useState, useEffect } from "react";
import "./OrderPage.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [newOrder, setNewOrder] = useState({
    productName: "",
    quantity: "",
    customerName: "",
    status: "pending",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [stock, setStock] = useState({
    Laptop: 50,
    Mouse: 100,
    // Add more products here with their stock levels
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const dummyOrders = [
        {
          id: 1,
          productName: "Laptop",
          quantity: 5,
          customerName: "John Doe",
          status: "completed",
          date: "2024-01-20",
        },
        {
          id: 2,
          productName: "Mouse",
          quantity: 10,
          customerName: "Jane Smith",
          status: "pending",
          date: "2024-01-22",
        },
      ];
      setOrders(dummyOrders);
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newOrder.quantity > stock[newOrder.productName]) {
      alert(`Not enough stock for ${newOrder.productName}`);
      return;
    }

    const order = {
      id: orders.length + 1,
      ...newOrder,
      date: new Date().toISOString().split("T")[0],
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setStock((prevStock) => ({
      ...prevStock,
      [newOrder.productName]: prevStock[newOrder.productName] - newOrder.quantity,
    }));

    setNewOrder({
      productName: "",
      quantity: "",
      customerName: "",
      status: "pending",
    });
  };

  const handleDeleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleEditOrder = (id) => {
    const orderToEdit = orders.find((order) => order.id === id);
    setNewOrder(orderToEdit);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );

    if (status === "completed" || status === "cancelled") {
      const completedOrder = orders.find((order) => order.id === id);
      setOrderHistory((prevHistory) => [...prevHistory, completedOrder]);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders
    .filter((order) =>
      filterStatus === "all" ? true : order.status === filterStatus
    )
    .filter((order) =>
      searchQuery
        ? order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="order-page">
      <header className="order-header">
        <h1>Order Management</h1>
      </header>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Total Orders: {orders.length}</p>
        <p>Pending Orders: {orders.filter((o) => o.status === "pending").length}</p>
        <p>Completed Orders: {orders.filter((o) => o.status === "completed").length}</p>
        <p>Order History: {orderHistory.length}</p>
      </div>

      <div className="order-container">
        <div className="new-order-form">
          <h2>Create/Edit Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={newOrder.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={newOrder.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={newOrder.customerName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              {newOrder.id ? "Update Order" : "Create Order"}
            </button>
          </form>
        </div>

        <div className="orders-list">
          <div className="orders-header">
            <h2>Orders List</h2>
            <input
              type="text"
              placeholder="Search by Product or Customer"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.productName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.customerName}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                      <select
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        value={order.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button onClick={() => handleEditOrder(order.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map((num) => (
              <button key={num} onClick={() => paginate(num + 1)}>
                {num + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="order-history">
          <h2>Order History</h2>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.id}>
                {order.productName} - {order.customerName} ({order.status})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
