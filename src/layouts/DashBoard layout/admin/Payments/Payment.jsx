import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const Payment = () => {
    const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests/pending");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load requests</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Salary Requests</h2>
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
                  <span className="badge badge-warning capitalize">{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;