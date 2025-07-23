import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: paymentHistory = [], isLoading } = useQuery({
    queryKey: ["user-payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading your payment history...</p>;
  }

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Payment History</h2>

      {paymentHistory.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <table className="min-w-full border divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Amount ($)</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paymentHistory.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">${payment.amountInCents ?? "N/A"}</td>
                <td className="px-4 py-2">{payment.transactionId}</td>
                <td className="px-4 py-2">
                  {typeof payment.paymentMethod === "string"
                    ? payment.paymentMethod
                    : Array.isArray(payment.paymentMethod)
                    ? payment.paymentMethod.join(", ")
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {new Date(payment.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPaymentHistory;
