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
    return <span className="loading loading-bars loading-xl"></span>;
  }

  const employeeOptions = allUsers.filter((user) => user.role === 'Employee');

  return (
    <div className="p-4 max-w-5xl mx-auto bg-base-100 text-base-content">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 mt-4">
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

      {/* One-column card system instead of table */}
      <div className="space-y-4">
        {worksheets.length === 0 ? (
          <p className="text-center text-red-500 font-semibold">
            No data found.
          </p>
        ) : (
          worksheets.map((item, idx) => (
            <div
              key={item._id}
              className="p-4 rounded-lg shadow-md border bg-base-100 text-base-content hover:shadow-lg transition "
            >
              <div className="flex justify-between items-center mb-2 text-base-content">
                <h3 className="text-lg font-semibold text-blue-600">
                  {item.task}
                </h3>
                <span className="text-sm text-base-content">
                  #{idx + 1}
                </span>
              </div>
              <p className="text-base-content">
                <span className="font-medium">Hours:</span> {item.hours}
              </p>
              <p className="text-base-content">
                <span className="font-medium">Email:</span> {item.email}
              </p>
              <p className="text-base-content">
                <span className="font-medium">Date:</span> {item.date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Progress;
