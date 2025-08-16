import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTable, FaThLarge } from "react-icons/fa";

const VerifiedHRList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState("card"); // 👉 default card view

  // ✅ Fetch users with fresh data always
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["verifiedUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/verified-hr-or-verified-employee", {
        headers: { "Cache-Control": "no-cache" },
      });
      return res.data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  // ✅ Mutation with optimistic update
  const toggleFireMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/toggle-fire/${email}`);
      return res.data; // { message, user }
    },
    onMutate: async (email) => {
      await queryClient.cancelQueries(["verifiedUsers"]);
      const previousUsers = queryClient.getQueryData(["verifiedUsers"]);

      queryClient.setQueryData(["verifiedUsers"], (oldUsers) =>
        oldUsers.map((user) =>
          user.email === email ? { ...user, ifFired: !user.ifFired } : user
        )
      );

      return { previousUsers };
    },
    onError: (err, email, context) => {
      queryClient.setQueryData(["verifiedUsers"], context.previousUsers);
      Swal.fire("Error", "Failed to toggle fire status.", "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["verifiedUsers"]);
    },
    onSuccess: (data) => {
      Swal.fire("Updated!", data.message || "User fire status changed.", "success");
    },
  });

  const handleToggleFire = (user) => {
    Swal.fire({
      title: user.ifFired
        ? `Cancel Fire for ${user.name}?`
        : `Fire ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: user.ifFired ? "Cancel Fire" : "Fire",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleFireMutation.mutate(user.email);
      }
    });
  };

  if (isLoading) return <span className="loading loading-bars loading-xl"></span>;
  if (error) return <div className="p-4 text-red-500">Failed to load data</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-blue-600">
          ✅ Verified HRs & Employees
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center justify-center"
          title={viewMode === "table" ? "Switch to Card View" : "Switch to Table View"}
        >
          {viewMode === "table" ? <FaThLarge size={18} /> : <FaTable size={18} />}
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600">No matching users found.</p>
      ) : viewMode === "table" ? (
        // ✅ Table View
        <div className="overflow-x-auto rounded shadow bg-white">
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Fire Status</th>
              </tr>
            </thead>
            <tbody>
              {[...users].reverse().map((user, index) => (
                <tr
                  key={user.email}
                  className={`hover:bg-gray-50 ${
                    user.ifFired ? "bg-red-50" : "bg-green-50"
                  }`}
                >
                  <td>{users?.length - index}</td>
                  <td>
                    <img
                      src={
                        user.photoURL ||
                        "https://via.placeholder.com/80x80?text=No+Image"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td className="break-all">{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    {user.isVerified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <span className="badge badge-ghost">Not Verified</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleFire(user)}
                      disabled={toggleFireMutation.isLoading}
                      className={`btn btn-sm text-white font-medium rounded ${
                        user.ifFired
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } ${
                        toggleFireMutation.isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {user.ifFired ? "✅ Cancel Fired" : "🔥 Fire"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ✅ Card View (same style as Payment)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...users].reverse().map((user, index) => (
            <div
              key={user.email}
              className={`rounded-2xl shadow bg-white p-4 flex flex-col justify-between hover:shadow-lg transition-all ${
                user.ifFired ? "border border-red-300 bg-red-50" : "border border-green-300 bg-green-50"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    user.photoURL ||
                    "https://via.placeholder.com/80x80?text=No+Image"
                  }
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold break-words">{user.name}</h3>
                  <p className="text-sm text-gray-500 break-words">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  <span className="capitalize">{user.role}</span>
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {user.isVerified ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-gray-500">Not Verified</span>
                  )}
                </p>
              </div>

              <button
                onClick={() => handleToggleFire(user)}
                disabled={toggleFireMutation.isLoading}
                className={`btn btn-sm mt-4 w-full text-white font-medium rounded ${
                  user.ifFired
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } ${
                  toggleFireMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {user.ifFired ? "✅ Cancel Fired" : "🔥 Fire"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifiedHRList;
