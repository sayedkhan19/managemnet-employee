import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaTable, FaThLarge } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("table");

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests/pending");
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-error"></span>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load requests</div>;

  const handlePay = (id) => {
    navigate(`/dashboard/pay-salary/${id}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Pending Salary Requests</h2>
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "table" ? "card" : "table"))
          }
          className="btn btn-sm btn-outline flex items-center gap-2"
        >
          {viewMode === "table" ? (
            <>
              <FaThLarge />
              Card View
            </>
          ) : (
            <>
              <FaTable />
              Table View
            </>
          )}
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-6 rounded shadow">
          🎉 No pending salary requests at the moment!
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="table w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Month</th>
                <th>Year</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="max-w-[150px] md:max-w-none break-words truncate" title={item.email}>
                    {item.email}
                  </td>
                  <td>${item.salary}</td>
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>
                    <span className="badge badge-warning capitalize">
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handlePay(item._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((item, index) => (
            <motion.div
              key={item._id}
              className="rounded-xl shadow bg-white p-4 flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-500">#{index + 1}</p>
                <h3 className="font-semibold text-sm sm:text-base break-words">
                  📧{" "}
                  <span
                    className="break-words max-w-full block truncate"
                    title={item.email}
                  >
                    {item.email}
                  </span>
                </h3>
                <p className="text-gray-700 text-sm">
                  💰 Salary: <span className="font-medium">${item.salary}</span>
                </p>
                <p className="text-gray-700 text-sm">
                  📅 Month: {item.month} {item.year}
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
