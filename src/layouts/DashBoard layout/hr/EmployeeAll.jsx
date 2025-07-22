import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const EmployeeAll = () => {
    const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState(null);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch user role
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/auth-role?email=${user?.email}`);
        setRole(res.data?.role);
      } catch (err) {
        console.error("Failed to fetch role", err);
      }
    };
    if (user?.email) fetchRole();
  }, [user, axiosSecure]);

  // ✅ Fetch all employees
  const { data: employees = [], isLoading, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/employees");
      return res.data;
    },
  });

  // ✅ Fetch all salary requests
  const { data: salaryRequests = [] } = useQuery({
    queryKey: ["salaryRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/salary-requests");
      return res.data;
    },
  });

  // ✅ Send payment request
  const handleSendRequest = async () => {
    if (!month || !year) {
      toast.error("Please select Month and Year!");
      return;
    }

    const isDuplicate = salaryRequests.some(
      (req) =>
        req.email === selectedEmployee.email &&
        req.month === month &&
        req.year === year
    );

    if (isDuplicate) {
      toast.error("Salary already requested for this month and year!");
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
    } catch (err) {
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
    } catch (err) {
      toast.error("Error updating verification");
    }
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  if (isLoading) return <div className="p-4">Loading...</div>;

  const isDuplicateRequest = () => {
    return salaryRequests.some(
      (req) =>
        req.email === selectedEmployee?.email &&
        req.month === month &&
        req.year === year
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Employees</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                
                <td>
  <p>{emp.email}</p>
  <p className="text-sm text-gray-500">Acct: {emp.bank_account_no || "N/A"}</p>
</td>

                
                <td>{emp.designation}</td>
                <td>${emp.salary}</td>
                <td>
                  {emp.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-red-500">Unverified</span>
                  )}
                </td>
                <td>
                  {emp.paymentStatus === "pending" ? (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="flex flex-wrap gap-2">
                  {role === "HR" && (
                    <>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setMonth("");
                          setYear("");
                          setSelectedEmployee(emp);
                        }}
                      >
                        Pay
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleVerify(emp._id, emp.isVerified)}
                      >
                        {emp.isVerified ? "Unverify" : "Verify"}
                      </button>
                    </>
                  )}
                  <NavLink
                    to={`/dashboard/employee-details/${emp._id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Details
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Pay Salary to {selectedEmployee.name}
            </h3>
            <div className="mb-2">
              <label className="block font-medium">Salary</label>
              <input
                type="number"
                value={selectedEmployee.salary}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block font-medium">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* ❌ Duplicate alert */}
            {month && year && isDuplicateRequest() && (
              <p className="text-red-500 text-sm mt-2 mb-2">
                ❌ You already paid for this month and year!
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