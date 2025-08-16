import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaTable, FaThLarge } from "react-icons/fa";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isTableView, setIsTableView] = useState(false);

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests/pending");
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-bars loading-xl"></span>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load requests</div>;

  const handlePay = (id) => {
    navigate(`/dashboard/pay-salary/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">
          Pending Salary Requests
        </h2>
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
          title={isTableView ? "Switch to Card View" : "Switch to Table View"}
        >
          {isTableView ? <FaThLarge size={18} /> : <FaTable size={18} />}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-6 rounded shadow">
          🎉 No pending salary requests at the moment!
        </div>
      ) : isTableView ? (
        // ✅ Table View (single column merged)
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <p className="text-xs text-gray-400">Request #{index + 1}</p>
                  <p className="font-semibold">📧 {item.email}</p>
                  <p>💰 Salary: ${item.salary}</p>
                  <p>📅 {item.month} {item.year}</p>
                  <p>
                    🏷️ Status:{" "}
                    <span className="badge badge-warning capitalize">
                      {item.status}
                    </span>
                  </p>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handlePay(item._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // ✅ Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((item, index) => (
            <motion.div
              key={item._id}
              className="rounded-2xl shadow bg-white p-4 flex flex-col justify-between hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Request #{index + 1}</p>
                <h3 className="font-semibold text-sm sm:text-base break-words">
                  📧 <span className="break-words block">{item.email}</span>
                </h3>
                <p className="text-gray-700 text-sm">
                  💰 Salary: <span className="font-medium">${item.salary}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  📅 {item.month} {item.year}
                </p>
                <p className="text-gray-700 text-sm">
                  🏷️ Status:{" "}
                  <span className="badge badge-warning capitalize">
                    {item.status}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handlePay(item._id)}
                className="btn btn-primary btn-sm mt-4 w-full"
              >
                Pay
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payment;
