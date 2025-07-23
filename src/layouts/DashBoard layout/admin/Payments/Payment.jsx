import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests/pending");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load requests</div>;

  const handlePay = (id) => {
    navigate(`/dashboard/pay-salary/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Salary Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-6 rounded shadow">
          🎉 No pending salary requests at the moment!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
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
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
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
      )}
    </div>
  );
};

export default Payment;
