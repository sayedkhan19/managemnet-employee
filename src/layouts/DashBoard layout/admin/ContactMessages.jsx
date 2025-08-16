import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ContactMessages = () => {
  const axiosInstance = useAxiosSecure();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get('/contact');
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load messages');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/contact/${id}`);
        if (res.data.deletedCount > 0) {
          setMessages((prev) => prev.filter((msg) => msg._id !== id));

          Swal.fire('Deleted!', 'The message has been deleted.', 'success');
        } else {
          Swal.fire('Failed!', 'Delete failed.', 'error');
        }
      } catch (err) {
        Swal.fire('Error!', 'An error occurred while deleting.', 'error');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-10">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">All Contact Messages</h2>
      {messages.length === 0 ? (
        <p className="text-center text-gray-600">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm sm:text-base">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border break-all">{msg.email}</td>
                  <td className="px-4 py-2 border">{msg.message}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Delete
                    </button>
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

export default ContactMessages;
