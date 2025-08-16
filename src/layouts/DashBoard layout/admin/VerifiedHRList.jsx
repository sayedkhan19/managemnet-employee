import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTable, FaThLarge } from "react-icons/fa";

const VerifiedHRList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState("card"); // default card/grid view

  // Fetch users
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

  // Mutation for Fire/Unfire
  const toggleFireMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/toggle-fire/${email}`);
      return res.data;
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
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 mt-4">
          ✅ Verified HRs & Employees
        </h2>
        <button
          onClick={() =>
            setViewMode(viewMode === "table" ? "card" : "table")
          }
          className="p-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition flex items-center justify-center"
          title={viewMode === "table" ? "Switch to Card View" : "Switch to List View"}
        >
          {viewMode === "table" ? <FaThLarge size={18} /> : <FaTable size={18} />}
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600">No matching users found.</p>
      ) : viewMode === "table" ? (
        // ✅ List View (single-column card)
        <div className="flex flex-col gap-4">
          {[...users].reverse().map((user) => (
            <div
              key={user.email}
              className={`rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-lg ${
                user.ifFired ? "border border-red-300 bg-red-50" : "border border-green-300 bg-white"
              }`}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/80"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-500 break-words">{user.email}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium text-gray-700">Role:</span>{" "}
                  <span className="capitalize text-indigo-600">{user.role}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  {user.isVerified ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-gray-400">Not Verified</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleToggleFire(user)}
                disabled={toggleFireMutation.isLoading}
                className={`btn btn-sm mt-2 sm:mt-0 ${
                  user.ifFired
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                {user.ifFired ? "✅ Cancel Fired" : "🔥 Fire"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        // ✅ Card/Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...users].reverse().map((user) => (
            <div
              key={user.email}
              className={`rounded-2xl shadow-md bg-white p-5 flex flex-col justify-between transition-all hover:shadow-lg ${
                user.ifFired ? "border border-red-300 bg-red-50" : "border border-green-300"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.photoURL || "https://via.placeholder.com/80x80?text=No+Image"}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500 break-words">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Role:</span>{" "}
                  <span className="capitalize text-indigo-600">{user.role}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  {user.isVerified ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-gray-400">Not Verified</span>
                  )}
                </p>
              </div>

              <button
                onClick={() => handleToggleFire(user)}
                disabled={toggleFireMutation.isLoading}
                className={`btn btn-sm mt-4 w-full text-white font-medium rounded ${
                  user.ifFired ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"
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
