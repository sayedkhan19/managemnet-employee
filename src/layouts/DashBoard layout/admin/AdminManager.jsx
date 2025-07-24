import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AdminManager = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  // ✅ Fetch current user role
  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`/auth-role?email=${user.email}`);
          setCurrentRole(res.data.role);
        } catch (err) {
          console.error('Failed to fetch role:', err);
        }
      }
    };
    fetchRole();
  }, [user, axios]);

  const handleSearch = async () => {
    if (!query.trim()) return toast.error('Enter a name or email to search');

    setLoading(true);
    try {
      const res = await axios.get(`/search-users?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleMakeAdmin = async (id) => {
    try {
      const res = await axios.patch(`/make-admin/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success('User promoted to Admin');
        handleSearch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to make admin');
    }
  };

  const handleRemoveAdmin = async (id, fallbackRole) => {
    try {
      const res = await axios.patch(`/remove-admin/${id}`, { newRole: fallbackRole });
      if (res.data.modifiedCount > 0) {
        toast.success('Admin role removed');
        handleSearch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove admin');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.photoURL || 'https://i.ibb.co/2n4qQ6F/default-user.png'}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    {user.role === 'Admin' ? (
                      currentRole === 'Admin' ? (
                        <>
                          <button
                            onClick={() => handleRemoveAdmin(user._id, 'Employee')}
                            className="btn btn-warning btn-sm mr-2"
                          >
                            Remove Admin (→ Emp)
                          </button>
                          <button
                            onClick={() => handleRemoveAdmin(user._id, 'HR')}
                            className="btn btn-info btn-sm"
                          >
                            Remove Admin (→ HR)
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">Only Admin can remove</span>
                      )
                    ) : currentRole === 'Admin' ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-success btn-sm"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span className="text-sm text-gray-400">Only Admin can promote</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
