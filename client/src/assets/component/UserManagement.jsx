import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the URL based on your API endpoint
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`); // Adjust the URL based on your API endpoint
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update the state to remove the deleted user
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p className="text-center text-lg mt-4">Loading users...</p>;
  if (error) return <p className="text-center text-lg text-red-500 mt-4">Error fetching users: {error.message}</p>;

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">User Management</h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-2 text-left">Username</th> {/* Updated to Username */}
                <th className="py-3 px-2 text-center">Email</th>
                <th className="py-3 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 w-screen text-sm font-light">
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-2 text-left">{user.username}</td> {/* Updated to Username */}
                  <td className="py-3 px-2 text-center">{user.email}</td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                    {/* Additional actions can be added here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
