import { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", phone_number: "" });

    const fetchUsers = () => {
        axios.get("http://localhost:5000/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUsers = (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(res => {
                alert(res.data);
                fetchUsers();
            })
            .catch(err => console.error(err));
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({ name: "", email: "", phone_number: "" });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = (id) => {
        axios.put(`http://localhost:5000/update/${id}`, editForm)
            .then(res => {
                alert(res.data);
                cancelEditing();
                fetchUsers();
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <table border={10}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(p => (
                        <tr key={p.id}>
                            {editingId === p.id ? (
                                <>
                                    <td>{p.id}</td>
                                    <td>
                                        <input
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name="phone_number"
                                            value={editForm.phone_number}
                                            onChange={handleEditChange}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(p.id)}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phone_number}</td>
                                    <td>
                                        <button onClick={() => startEditing(p)}>Edit</button>
                                        <button onClick={() => deleteUsers(p.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default Dashboard;
