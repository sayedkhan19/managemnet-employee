import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VerifiedHRList = () => {
     const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["verifiedUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified-hr-or-verified-employee");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load data</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">✅ Verified HRs & Verified Employees</h2>

      {users.length === 0 ? (
        <p className="text-gray-600">No matching users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-xl">
            <thead className="bg-blue-50 text-left">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full text-sm text-gray-600">
                        N/A
                      </div>
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    {user.isVerified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-ghost">Not Verified</span>
                    )}
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

export default VerifiedHRList;