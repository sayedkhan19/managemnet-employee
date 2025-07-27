import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SalaryInfoAll = () => {
     const axiosSecure = useAxiosSecure();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["admin-payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-history/all");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Payment History</h2>

      <table className="min-w-full border divide-y divide-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Admin Email</th>
            <th className="px-4 py-2 text-left">Amount ($)</th>
            <th className="px-4 py-2 text-left">Method</th>
            <th className="px-4 py-2 text-left">Transaction ID</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paymentHistory &&  paymentHistory?.map((payment, index) => (
            <tr key={payment._id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{payment.email}</td>
              <td className="px-4 py-2">${payment.amountInCents}</td>
              <td className="px-4 py-2">{payment.paymentMethod || "N/A"}</td>
              <td className="px-4 py-2">{payment.transactionId}</td>
              <td className="px-4 py-2">
                {new Date(payment.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryInfoAll;