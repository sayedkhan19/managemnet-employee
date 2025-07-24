import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Progress = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isHR, setIsHR] = useState(false);

  // Fetch all users (for HR role check and dropdown list)
  const { data: allUsers = [] } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axios.get('/users');
      return res.data;
    },
  });

  useEffect(() => {
    if (user && allUsers.length) {
      const loggedIn = allUsers.find((u) => u.email === user.email);
      setIsHR(loggedIn?.role === 'HR');
    }
  }, [user, allUsers]);

  // Fetch all worksheets filtered
  const { data: worksheets = [], refetch, isLoading } = useQuery({
    queryKey: ['worksheets', selectedEmail, selectedMonth],
    queryFn: async () => {
      const res = await axios.get('/worksheets', {
        params: {
          email: selectedEmail,
          month: selectedMonth,
        },
      });
      return res.data;
    },
    enabled: isHR,
  });

  if (!isHR) {
    return (
      <p className="text-center text-lg mt-10 font-semibold text-red-500">
        No data available
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const employeeOptions = allUsers.filter((user) => user.role === 'Employee');

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* Dropdown for selecting employee */}
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
          className="select select-bordered w-full md:w-1/3"
        >
          <option value="">All Employees</option>
          {employeeOptions.map((emp) => (
            <option key={emp.email} value={emp.email}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        {/* Select month */}
        <input
          type="month"
          className="input input-bordered w-full md:w-1/3"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />

        {/* Clear filter */}
        <button
          onClick={() => {
            setSelectedEmail('');
            setSelectedMonth('');
          }}
          className="btn btn-outline btn-sm"
        >
          Clear Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {worksheets.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-red-500 font-semibold">
                  No data found.
                </td>
              </tr>
            ) : (
              worksheets.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.hours}</td>
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
