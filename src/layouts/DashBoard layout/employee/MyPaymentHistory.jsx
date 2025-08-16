import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaThLarge, FaTable } from 'react-icons/fa';

const ITEMS_PER_PAGE = 4;

const MyPaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [viewMode, setViewMode] = useState('table');
  const [currentPendingPage, setCurrentPendingPage] = useState(1);
  const [currentPaidPage, setCurrentPaidPage] = useState(1);

  const { data: salaryData = [], isLoading } = useQuery({
    queryKey: ['mySalaryHistory', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/salary-request/user?email=${user.email}`);
      return res.data;
    }
  });

  const pendingData = salaryData.filter(item => item.status === 'pending');
  const paidData = salaryData
    .filter(item => item.status === 'paid')
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt));

  const toggleView = () => {
    setViewMode(prev => (prev === 'table' ? 'card' : 'table'));
  };

  const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  if (isLoading) return <span className="loading loading-bars loading-xl"></span>;

  return (
    <div className="p-4 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">My Payment History</h2>
        <button
          onClick={toggleView}
          className="p-2 border rounded bg-gray-100 hover:bg-gray-200"
          title={viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
        >
          {viewMode === 'table' ? <FaThLarge /> : <FaTable />}
        </button>
      </div>

      {/* Pending Payments */}
      <section>
        <h3 className="text-lg font-semibold text-yellow-600 mb-2">Pending Payments</h3>
        {pendingData.length === 0 ? (
          <p className="text-gray-500">No pending payments.</p>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="px-4 py-2 text-left">Month</th>
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-left">Salary</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {paginate(pendingData, currentPendingPage).map(item => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.month}</td>
                    <td className="px-4 py-2">{item.year}</td>
                    <td className="px-4 py-2">${item.salary}</td>
                    <td className="px-4 py-2 capitalize">{item.status}</td>
                    <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginate(pendingData, currentPendingPage).map(item => (
              <div key={item._id} className="border p-4 rounded bg-white shadow">
                <p><strong>Month:</strong> {item.month}</p>
                <p><strong>Year:</strong> {item.year}</p>
                <p><strong>Salary:</strong> ${item.salary}</p>
                <p><strong>Status:</strong> <span className="text-yellow-600">{item.status}</span></p>
                <p><strong>Requested At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pending Pagination */}
        {pendingData.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={currentPendingPage === 1}
              onClick={() => setCurrentPendingPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {currentPendingPage} of {Math.ceil(pendingData.length / ITEMS_PER_PAGE)}</span>
            <button
              disabled={currentPendingPage === Math.ceil(pendingData.length / ITEMS_PER_PAGE)}
              onClick={() => setCurrentPendingPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Paid Payments */}
      <section>
        <h3 className="text-lg font-semibold text-green-600 mb-2">Paid Payments</h3>
        {paidData.length === 0 ? (
          <p className="text-gray-500">No paid salaries yet.</p>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full border">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-4 py-2 text-left">Month</th>
                  <th className="px-4 py-2 text-left">Year</th>
                  <th className="px-4 py-2 text-left">Salary</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Paid At</th>
                  <th className="px-4 py-2 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paginate(paidData, currentPaidPage).map(item => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{item.month}</td>
                    <td className="px-4 py-2">{item.year}</td>
                    <td className="px-4 py-2">${item.salary}</td>
                    <td className="px-4 py-2 text-green-600 capitalize">{item.status}</td>
                    <td className="px-4 py-2">{new Date(item.paidAt).toLocaleString()}</td>
                    <td className="px-4 py-2 break-all">{item.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginate(paidData, currentPaidPage).map(item => (
              <div key={item._id} className="border p-4 rounded bg-white shadow">
                <p><strong>Month:</strong> {item.month}</p>
                <p><strong>Year:</strong> {item.year}</p>
                <p><strong>Salary:</strong> ${item.salary}</p>
                <p><strong>Status:</strong> <span className="text-green-600">{item.status}</span></p>
                <p><strong>Paid At:</strong> {new Date(item.paidAt).toLocaleString()}</p>
                <p><strong>Transaction ID:</strong> <span className="break-all">{item.transactionId}</span></p>
              </div>
            ))}
          </div>
        )}

        {/* Paid Pagination */}
        {paidData.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={currentPaidPage === 1}
              onClick={() => setCurrentPaidPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {currentPaidPage} of {Math.ceil(paidData.length / ITEMS_PER_PAGE)}</span>
            <button
              disabled={currentPaidPage === Math.ceil(paidData.length / ITEMS_PER_PAGE)}
              onClick={() => setCurrentPaidPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyPaymentHistory;
