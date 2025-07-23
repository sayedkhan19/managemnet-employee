import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import useAuth from "../../../hooks/useAuth";

// 🎨 Predefined color set for colorful bars
const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57",
  "#a4de6c", "#d88884", "#a28cf4", "#00c49f", "#f28eb1", "#c6b0f5",
];

const EmployeeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Get employee data
  const { data: employee, isLoading: empLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Get salary history
  const { data: salaryHistoryRaw = [], isLoading: historyLoading } = useQuery({
    queryKey: ["salaryHistory", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employee-salary-history/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Process salary data (combine by month-year + assign color)
  const salaryHistory = React.useMemo(() => {
    const grouped = {};

    salaryHistoryRaw.forEach((entry) => {
      const key = `${entry.month} ${entry.year}`;
      if (!grouped[key]) grouped[key] = 0;
      grouped[key] += entry.salary;
    });

    return Object.entries(grouped).map(([monthYear, salary], index) => ({
      monthYear,
      salary,
      fill: COLORS[index % COLORS.length],
    }));
  }, [salaryHistoryRaw]);

  if (empLoading || historyLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* 🧾 Employee Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">👤 Employee Details</h2>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-32 h-32 rounded-full object-cover border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                N/A
              </div>
            )}
          </div>

          {/* Employee Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg w-full">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Salary:</strong> ${employee.salary}</p>
            <p>
              <strong>Status:</strong>
              <span className={`ml-2 font-semibold ${employee.isVerified ? 'text-green-600' : 'text-red-500'}`}>
                {employee.isVerified ? "Verified" : "Unverified"}
              </span>
            </p>
            <p><strong>Phone:</strong> {employee.phone || "N/A"}</p>
            <p><strong>Address:</strong> {employee.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* 📊 Salary Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">📊 Salary History Chart</h2>
        {salaryHistory.length === 0 ? (
          <p className="text-gray-500">No paid salary history available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={salaryHistory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" isAnimationActive={true}>
                {salaryHistory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
