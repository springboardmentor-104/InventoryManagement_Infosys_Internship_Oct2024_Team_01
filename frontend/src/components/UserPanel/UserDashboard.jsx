import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './UserDashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserDashboard = () => {
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [ordersInProgress, setOrdersInProgress] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purchasesResponse = await fetch('/api/purchases');
        const purchasesData = purchasesResponse.ok ? await purchasesResponse.json() : { totalItems: 0 };
        setTotalPurchases(purchasesData.totalItems);

        const ordersResponse = await fetch('/api/orders-in-progress');
        const ordersData = ordersResponse.ok ? await ordersResponse.json() : { orders: 0 };
        setOrdersInProgress(ordersData.orders);

        const wishlistResponse = await fetch('/api/wishlist');
        const wishlistData = wishlistResponse.ok ? await wishlistResponse.json() : { items: 0 };
        setWishlistItems(wishlistData.items);

        const recentPurchasesResponse = await fetch('/api/recent-purchases');
        const recentPurchasesData = recentPurchasesResponse.ok ? await recentPurchasesResponse.json() : { recent: [] };
        setRecentPurchases(recentPurchasesData.recent);

        // Mock activity data for the chart (replace this with actual data from your backend)
        setActivityData([
          { month: 'Jan', purchases: 10 },
          { month: 'Feb', purchases: 15 },
          { month: 'Mar', purchases: 8 },
          { month: 'Apr', purchases: 20 },
          { month: 'May', purchases: 13 },
          { month: 'Jun', purchases: 25 },
        ]);

        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, []);

  // Prepare the chart data
  const chartData = {
    labels: activityData.map((data) => data.month),
    datasets: [
      {
        label: 'Purchases Over Time',
        data: activityData.map((data) => data.purchases),
        borderColor: '#42a5f5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Activity Over Time',
      },
    },
  };

  return (
    <main className="main-content">
      <h1>User Dashboard</h1>

      <div className="stats-cards">
        <div className="card">
          <h3>Total Purchases</h3>
          <p>{totalPurchases} Items</p>
        </div>
        <div className="card">
          <h3>Orders in Progress</h3>
          <p>{ordersInProgress} Orders</p>
        </div>
        <div className="card">
          <h3>Wishlist Items</h3>
          <p>{wishlistItems} Items</p>
        </div>
        <div className="card">
          <h3>Recent Purchases</h3>
          <ul>
            {recentPurchases.length > 0 ? (
              recentPurchases.map((purchase, index) => (
                <li key={index}>
                  {purchase.productName} - {purchase.units} units
                </li>
              ))
            ) : (
              <li>No recent purchases available</li>
            )}
          </ul>
        </div>
      </div>

      <div className="chart-section">
        <h2>Activity Over Time</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </main>
  );
};

export default UserDashboard;
