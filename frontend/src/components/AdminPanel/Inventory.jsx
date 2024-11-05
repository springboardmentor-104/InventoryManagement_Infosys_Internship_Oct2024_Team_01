import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import './Inventory.css';

const Inventory = () => {
    // State to store inventory items
    const [inventoryItems, setInventoryItems] = useState([]);

    // Fetch inventory data from the backend
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('https://your-backend-api-url.com/inventory');
                const data = await response.json();
                setInventoryItems(data);
            } catch (error) {
                console.error('Error fetching inventory items:', error);
            }
        };

        fetchInventory();
    }, []);

    return (
        <div className="inventory">
            <h2>Inventory</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;
