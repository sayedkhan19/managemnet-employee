import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const PayModal = ({ employee, closeModal }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const paymentData = {
      ...data,
      name: employee.name,
      email: employee.email,
      salary: employee.salary,
    };

    try {
      const res = await axios.post("http://localhost:5000/salary-requests", paymentData);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success("Salary payment request submitted");
        closeModal();
        reset();
      } else {
        toast.error(res.data.message || "Payment request failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[90%] max-w-md">
        <h3 className="text-lg font-bold mb-4">Send Salary Request</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Month</label>
            <select {...register("month", { required: true })} className="input input-bordered w-full">
              <option value="">Select Month</option>
              {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Year</label>
            <input
              type="number"
              {...register("year", { required: true })}
              placeholder="e.g. 2025"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayModal;
