import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
    console.log("Users component rendered");

    // State to store users data
    const [users, setUsers] = useState([]);

    // Fetch users data from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://your-backend-api-url.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="users">
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
