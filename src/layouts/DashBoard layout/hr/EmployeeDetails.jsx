import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const EmployeeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const res = await axiosSecure.get(`/employee/${id}`);
      setEmployee(res.data);
    };
    fetchEmployee();
  }, [id, axiosSecure]);

  if (!employee) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Designation:</strong> {employee.designation}</p>
      <p><strong>Salary:</strong> ${employee.salary}</p>
      <p><strong>Status:</strong> {employee.isVerified ? "Verified" : "Unverified"}</p>
      <p><strong>Phone:</strong> {employee.phone || "N/A"}</p>
      <p><strong>Address:</strong> {employee.address || "N/A"}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default EmployeeDetails;
