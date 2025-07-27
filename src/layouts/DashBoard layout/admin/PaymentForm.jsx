import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { Idsalary } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isPending, data: salaryInfo = {} } = useQuery({
    queryKey: ["payment", Idsalary],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${Idsalary}`);
      return res.data;
    },
  });

  const [editableSalary, setEditableSalary] = useState(0);

  useEffect(() => {
    if (salaryInfo.salary) {
      setEditableSalary(salaryInfo.salary);
    }
  }, [salaryInfo]);

  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (stripeError) {
      setError(stripeError.message);
      return;
    } else {
      setError("");
    }

    const originalSalary = salaryInfo.salary;
    const newSalary = parseFloat(editableSalary);

    // ⛔ Prevent decreasing salary
    if (newSalary < originalSalary) {
      toast.error(`You can't decrease salary below $${originalSalary}`);
      return;
    }

    // ✅ If salary is increased, update in DB
    if (newSalary > originalSalary) {
      await axiosSecure.patch(`/update-salary/${Idsalary}`, {
        salary: newSalary,
      });
    }

    const amountInCents = newSalary * 100;

    const res = await axiosSecure.post("/payment-intent", {
      amountInCents,
      Idsalary,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          Idsalary,
          email: user.email,
          amountInCents,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post(
          "/payment-success",
          paymentData
        );
        if (paymentRes.data.insertedId) {
          toast.success("Payment successful");
          navigate("/dashboard/payment");
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <label className="block font-semibold">
          Salary Amount ($)
          <input
            type="number"
            className="input input-bordered w-full mt-1"
            value={editableSalary}
            onChange={(e) => setEditableSalary(e.target.value)}
            min={salaryInfo.salary} // 👈 minimum is the original salary
            required
          />
        </label>

        <CardElement className="p-2 border rounded" />

        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full"
        >
          Pay Salary ${editableSalary}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
