import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import {
  FaMoneyCheckAlt,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaThList,
  FaThLarge,
} from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EmployeeAll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [viewMode, setViewMode] = useState("table");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/auth-role?email=${user?.email}`);
      return res.data?.role;
    },
    enabled: !!user?.email,
  });

  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  const { data: salaryRequests = [] } = useQuery({
    queryKey: ["salaryRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests");
      return res.data;
    },
  });

  const isDuplicateRequest = () => {
    return salaryRequests.some(
      (req) =>
        req.email === selectedEmployee?.email &&
        req.month === month &&
        req.year === year
    );
  };

  const handleSendRequest = async () => {
    if (!month || !year) {
      toast.error("Please select Month and Year!");
      return;
    }

    const paymentData = {
      employeeId: selectedEmployee._id,
      email: selectedEmployee.email,
      salary: selectedEmployee.salary,
      month,
      year,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/salary-request", paymentData);
      if (res.data.insertedId) {
        toast.success("Payment request sent!");
        setSelectedEmployee(null);
        refetch();
      } else {
        toast.error("Failed to send payment request.");
      }
    } catch {
      toast.error("You can't pay duplicate for same month & year.");
    }
  };

  const handleVerify = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/users/verify/${id}`, {
        isVerified: !currentStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Verification updated");
        refetch();
      }
    } catch {
      toast.error("Error updating verification");
    }
  };

  if (isLoading || roleLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Employees</h2>
        <button
          className="btn btn-sm flex items-center gap-1"
          onClick={() =>
            setViewMode((prev) => (prev === "table" ? "card" : "table"))
          }
        >
          {viewMode === "table" ? <FaThLarge /> : <FaThList />}
          {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th>Name</th>
                <th>Email & Account</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td className="break-words max-w-xs">
                    <p>{emp.email}</p>
                    <p className="text-sm text-gray-500">
                      Acct: {emp.bank_account_no || "N/A"}
                    </p>
                  </td>
                  <td>{emp.designation}</td>
                  <td>${emp.salary}</td>
                  <td>
                    {emp.isVerified ? (
                      <span className="text-green-600 font-medium">
                        ✅ Verified
                      </span>
                    ) : (
                      <div>
                        <span className="text-red-500 font-medium">
                          ❌ Unverified
                        </span>
                        <p className="text-xs text-gray-400">
                          Verify to enable payment
                        </p>
                      </div>
                    )}
                  </td>
                  <td>
                    {emp.paymentStatus === "pending" ? (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="flex flex-wrap gap-2">
                    {roleData === "HR" && (
                      <>
                        <button
                          className={`btn btn-sm flex items-center gap-1 ${
                            emp.isVerified
                              ? "btn-primary"
                              : "btn-disabled bg-gray-300 text-gray-500"
                          }`}
                          onClick={() => {
                            setMonth("");
                            setYear("");
                            setSelectedEmployee(emp);
                          }}
                          disabled={!emp.isVerified}
                        >
                          <FaMoneyCheckAlt /> Pay
                        </button>
                        <button
                          className="btn btn-sm btn-secondary flex items-center gap-1"
                          onClick={() => handleVerify(emp._id, emp.isVerified)}
                        >
                          {emp.isVerified ? (
                            <>
                              <FaTimes /> Unverify
                            </>
                          ) : (
                            <>
                              <FaCheck /> Verify
                            </>
                          )}
                        </button>
                      </>
                    )}
                    <NavLink
                      to={`/dashboard/employee-details/${emp._id}`}
                      className="btn btn-sm btn-outline flex items-center gap-1"
                    >
                      <FaInfoCircle /> Details
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="border rounded-lg shadow-md p-4 space-y-2"
            >
              <h3 className="text-lg font-semibold">{emp.name}</h3>
              <p className="text-sm">{emp.email}</p>
              <p className="text-sm text-gray-500">
                Acct: {emp.bank_account_no || "N/A"}
              </p>
              <p>{emp.designation}</p>
              <p>💰 ${emp.salary}</p>
              <p>
                {emp.isVerified ? (
                  <span className="text-green-600">✅ Verified</span>
                ) : (
                  <span className="text-red-500">❌ Unverified</span>
                )}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {roleData === "HR" && (
                  <>
                    <button
                      className={`btn btn-sm ${
                        emp.isVerified
                          ? "btn-primary"
                          : "btn-disabled bg-gray-300 text-gray-500"
                      }`}
                      disabled={!emp.isVerified}
                      onClick={() => {
                        setMonth("");
                        setYear("");
                        setSelectedEmployee(emp);
                      }}
                    >
                      <FaMoneyCheckAlt /> Pay
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleVerify(emp._id, emp.isVerified)}
                    >
                      {emp.isVerified ? <FaTimes /> : <FaCheck />}
                    </button>
                  </>
                )}
                <NavLink
                  to={`/dashboard/employee-details/${emp._id}`}
                  className="btn btn-sm btn-outline"
                >
                  <FaInfoCircle />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Pay Salary to {selectedEmployee.name}
            </h3>
            <input
              readOnly
              value={selectedEmployee.salary}
              className="input input-bordered w-full mb-3"
            />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="select select-bordered w-full mb-3"
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {month && year && isDuplicateRequest() && (
              <p className="text-red-500 text-sm mb-2">
                ❌ Already paid for this month and year!
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSendRequest}
                disabled={!month || !year || isDuplicateRequest()}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAll;
