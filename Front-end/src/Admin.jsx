import { useEffect, useState } from "react";
import axios from "axios";

function Admin () {

    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {
        axios.get("http://localhost:3000/contacts")
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map (p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.email}</td>
                            <td>{p.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;