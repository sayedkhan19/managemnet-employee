import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PayFinal = () => {
  const { Idsalary } = useParams(); // ✅ Correct param name
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [finalSalary, setFinalSalary] = useState("");

  // ✅ use correct dependency and ID
  useEffect(() => {
    axiosSecure
      .get(`/salary-requests/${Idsalary}`)
      .then((res) => {
        setRequest(res.data);
        setFinalSalary(res.data.salary);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        Swal.fire("Error", "Could not load salary request.", "error");
      });
  }, [Idsalary, axiosSecure]);

  const handlePayment = async () => {
    if (parseFloat(finalSalary) < parseFloat(request.salary)) {
      return Swal.fire("Error", "You cannot reduce the salary amount.", "error");
    }

    const paymentInfo = {
      requestId: Idsalary, // ✅ use correct param
      email: request.email,
      month: request.month,
      year: request.year,
      originalSalary: request.salary,
      finalSalary,
      status: "paid",
      date: new Date().toISOString(),
    };

    try {
      // ✅ Save payment
      await axiosSecure.post("/payments", paymentInfo);

      // ✅ Update salary request status
      await axiosSecure.patch(`/salary-requests/${Idsalary}`, {
        status: "paid",
      });

      Swal.fire("Success", "Payment processed successfully", "success");
      navigate("/dashboard/payment");
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }
  };

  if (!request) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Finalize Payment</h2>
      <p><strong>Email:</strong> {request.email}</p>
      <p><strong>Month:</strong> {request.month}</p>
      <p><strong>Year:</strong> {request.year}</p>
      <p><strong>Requested Salary:</strong> ${request.salary}</p>

      <label className="block mt-4">
        <span className="text-gray-700">Final Salary (You can increase but not decrease)</span>
        <input
          type="number"
          min={request.salary}
          className="input input-bordered w-full mt-1"
          value={finalSalary}
          onChange={(e) => setFinalSalary(e.target.value)}
        />
      </label>

      <button onClick={handlePayment} className="btn btn-success mt-4 w-full">
        Confirm & Pay
      </button>
    </div>
  );
};

export default PayFinal;
