import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTable, FaThLarge } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 4;

const SalaryInfoAll = () => {
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
  const [currentPage, setCurrentPage] = useState(1);

  const { data: paidSalaries = [], isLoading } = useQuery({
    queryKey: ["paidSalaries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-request?status=paid");
      return res.data.sort(
        (a, b) => new Date(b.paidAt) - new Date(a.paidAt)
      );
    },
  });

  const totalPages = Math.ceil(paidSalaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = paidSalaries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleToggleView = () => {
    setViewMode(viewMode === "table" ? "card" : "table");
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Paid Salaries</h2>
        <button
          onClick={handleToggleView}
          className="p-2 border rounded bg-gray-100 hover:bg-gray-200"
          title={viewMode === "table" ? "Switch to Card View" : "Switch to Table View"}
        >
          {viewMode === "table" ? <FaThLarge /> : <FaTable />}
        </button>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Salary</th>
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Paid At</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">${item.salary}</td>
                  <td className="px-4 py-2">{item.month}</td>
                  <td className="px-4 py-2">{item.year}</td>
                  <td className="px-4 py-2 text-green-600 capitalize">{item.status}</td>
                  <td className="px-4 py-2">
                    {new Date(item.paidAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 break-all">{item.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {currentData.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Salary:</strong> ${item.salary}</p>
              <p><strong>Month/Year:</strong> {item.month}, {item.year}</p>
              <p><strong>Status:</strong> <span className="text-green-600">{item.status}</span></p>
              <p><strong>Paid At:</strong> {new Date(item.paidAt).toLocaleString()}</p>
              <p><strong>Transaction ID:</strong> <span className="break-all">{item.transactionId}</span></p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SalaryInfoAll;
