import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for routing
import axios from "axios";

function Admin() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate(); // Added navigation hook

    const fetchContacts = () => {
        axios.get("https://portifolio-1-wbgs.onrender.com/contacts")
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Logout handling function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clears the authentication token
        // Optional: clear any extra stored data here (e.g., localStorage.removeItem('user'))
        navigate('/login'); // Redirects back to the login screen
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            
            {/* Dashboard Header Container with Flexbox */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                    You are mostly welcome Portfolio Admin!
                </h2>
                
                {/* Dashboard Logout Button */}
                <button
                    onClick={handleLogout}
                    className="self-start sm:self-auto rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    Logout
                </button>
            </div>

            {/* Table Container for Responsiveness */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="py-4 px-6 w-16">No</th>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Message</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {contacts.map((p, index) => (
                            <tr 
                                key={p._id || p.id || index} // Safe fallback keys
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Falls back to sequential row layout if p.id doesn't match API structure */}
                                <td className="py-4 px-6 font-medium text-gray-400">
                                    {index + 1}
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-900">{p.name}</td>
                                <td className="py-4 px-6 text-gray-500">{p.email}</td>
                                <td className="py-4 px-6 text-gray-600 max-w-xs truncate" title={p.message}>
                                    {p.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
