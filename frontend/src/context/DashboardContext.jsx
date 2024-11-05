import React, { createContext, useState, useEffect } from 'react';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [salesData, setSalesData] = useState(0);
    const [categories, setCategories] = useState([]);
    const [outOfStockItems, setOutOfStockItems] = useState(0);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [salesOverTime, setSalesOverTime] = useState([]);
    const [inventoryByCategory, setInventoryByCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         setLoading(true);
        //         console.log("Fetching data...");

        //         // Dummy API endpoint or fetch from your actual API
        //         const salesResponse = await fetch('/api/sales'); 
        //         if (!salesResponse.ok) {
        //             throw new Error('Network response was not ok');
        //         }

        //         const salesData = await salesResponse.json();
        //         console.log("Fetched sales data:", salesData);
        //         setSalesData(salesData.totalSales); // Adjust according to your response structure

        //         // Fetch other data similarly...
        //         setCategories(['Electronics', 'Clothing', 'Food']);
        //         setOutOfStockItems(5);
        //         setPendingOrders([{ id: 1, customerName: 'John Doe', status: 'Pending' }]);
        //         setSalesOverTime([{ month: 'January', amount: 1000 }, { month: 'February', amount: 1200 }]);
        //         setInventoryByCategory([{ name: 'Electronics', count: 15 }, { name: 'Clothing', count: 10 }]);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //         setError(error.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchData();
    }, []);

    return (
        <DashboardContext.Provider value={{
            salesData,
            categories,
            outOfStockItems,
            pendingOrders,
            salesOverTime,
            inventoryByCategory,
            loading,
            error,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};
