import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import FlashCard from '../common/FlashCard';
import './AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    // State variables for real-time data
    const [salesData, setSalesData] = useState(0);
    const [categories, setCategories] = useState([]);
    const [outOfStockItems, setOutOfStockItems] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [salesOverTime, setSalesOverTime] = useState([]);
    const [inventoryByCategory, setInventoryByCategory] = useState([]);

    // Fetch data from the backend using `fetch`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesResponse = await fetch('/api/salesData');
                const salesData = await salesResponse.json();

                const categoriesResponse = await fetch('/api/categories');
                const categoriesData = await categoriesResponse.json();

                const outOfStockResponse = await fetch('/api/outOfStockItems');
                const outOfStockData = await outOfStockResponse.json();

                const totalProductsResponse = await fetch('/api/totalProducts');
                const totalProductsData = await totalProductsResponse.json();

                const salesOverTimeResponse = await fetch('/api/salesOverTime');
                const salesOverTimeData = await salesOverTimeResponse.json();

                const inventoryResponse = await fetch('/api/inventoryByCategory');
                const inventoryData = await inventoryResponse.json();

                setSalesData(salesData);
                setCategories(categoriesData);
                setOutOfStockItems(outOfStockData);
                setTotalProducts(totalProductsData);
                setSalesOverTime(salesOverTimeData);
                setInventoryByCategory(inventoryData);
            } catch (error) {
                console.error("Error fetching data from backend:", error);
            }
        };

        fetchData();
    }, []);

    // Prepare chart data
    const salesChartData = {
        labels: salesOverTime.map(data => data.month),
        datasets: [
            {
                label: 'Sales',
                data: salesOverTime.map(data => data.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const categoryChartData = {
        labels: inventoryByCategory.map(category => category.name),
        datasets: [
            {
                label: 'Inventory by Category',
                data: inventoryByCategory.map(category => category.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverOffset: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="dashboard-cards">
                <FlashCard title="Total Sales" value={salesData} />
                <FlashCard title="Categories" value={categories.length} />
                <FlashCard title="Out of Stock Items" value={outOfStockItems} />
                <FlashCard title="Total Products" value={totalProducts} />
            </div>

            <div className="charts">
                <div className="chart-card">
                    <FlashCard title="Sales Over Time">
                        <Bar data={salesChartData} options={chartOptions} />
                    </FlashCard>
                </div>
                <div className="chart-card">
                    <FlashCard title="Inventory by Category">
                        <Pie data={categoryChartData} options={chartOptions} />
                    </FlashCard>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
