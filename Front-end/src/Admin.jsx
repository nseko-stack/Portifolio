import { useEffect, useState } from "react";
import axios from "axios";

function Admin () {

    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {
        axios.get("https://portifolio-1-wbgs.onrender.com/contacts")
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            
  {/* Dashboard Header */}
  <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
    You are mostly welcome Portifolio Admin!
  </h2>

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
        {contacts.map((p) => (
          <tr 
            key={p.id} 
            className="hover:bg-gray-50 transition-colors duration-150"
          >
            <td className="py-4 px-6 font-medium text-gray-400">{p.id}</td>
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

    )
}

export default Admin;