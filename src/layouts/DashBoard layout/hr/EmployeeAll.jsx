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
  const [viewMode, setViewMode] = useState("list"); // default list (instead of table)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
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

  if (isLoading || roleLoading) return <span className="loading loading-bars loading-xl"></span>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Employees</h2>
        <button
          className="btn btn-sm flex items-center gap-1"
          onClick={() =>
            setViewMode((prev) => (prev === "list" ? "card" : "list"))
          }
        >
          {viewMode === "list" ? <FaThLarge /> : <FaThList />}
          {viewMode === "list" ? "Card View" : "List View"}
        </button>
      </div>

      {/* LIST VIEW (1-column card style) */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white"
            >
              <div>
                <h3 className="text-lg font-semibold">{emp.name}</h3>
                <p className="text-sm">{emp.email}</p>
                <p className="text-sm text-gray-500">
                  Acct: {emp.bank_account_no || "N/A"}
                </p>
                <p className="text-sm">{emp.designation}</p>
                <p className="text-sm font-medium">💰 ${emp.salary}</p>
                <p>
                  {emp.isVerified ? (
                    <span className="text-green-600">✅ Verified</span>
                  ) : (
                    <span className="text-red-500">❌ Unverified</span>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
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
                  className="btn btn-sm btn-outline"
                >
                  <FaInfoCircle /> Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CARD VIEW (grid cards) */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="border rounded-lg shadow-md p-4 space-y-2 bg-white"
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

      {/* PAYMENT MODAL */}
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
