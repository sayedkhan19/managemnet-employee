import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxios";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const WorkSheet = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingData, setEditingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: worksheets = [] } = useQuery({
    queryKey: ["worksheets", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worksheets/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const addMutation = useMutation({
    mutationFn: (newEntry) => axiosPublic.post("/worksheets", newEntry),
    onSuccess: () => {
      queryClient.invalidateQueries(["worksheets", email]);
      toast.success("Task added successfully!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/worksheets/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["worksheets", email]);
      setEditingData(null);
      setIsModalOpen(false);
      toast.success("Task updated!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/worksheets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["worksheets", email]);
      toast.success("Task deleted!");
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      email,
      date: format(selectedDate, "yyyy-MM-dd"),
    };

    if (editingData) {
      updateMutation.mutate({ id: editingData._id, data: payload });
    } else {
      addMutation.mutate(payload);
    }

    reset();
    setSelectedDate(new Date());
  };

  const handleEdit = (item) => {
    setEditingData(item);
    setValue("task", item.task);
    setValue("hours", item.hours);
    setSelectedDate(new Date(item.date));
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this task!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Add Task Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row flex-wrap gap-4 items-start bg-white p-4 shadow rounded"
      >
        <div className="w-full md:w-auto">
          <label className="block text-sm">Task</label>
          <select
            {...register("task", { required: true })}
            className="input input-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select Task
            </option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Content">Content</option>
            <option value="Paper-work">Paper-work</option>
          </select>
          {errors.task && (
            <p className="text-red-500 text-sm mt-1">Please select a task</p>
          )}
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm">Hours Worked</label>
          <input
            type="number"
            {...register("hours", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.hours && (
            <p className="text-red-500 text-sm mt-1">Hours are required</p>
          )}
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="self-end w-full md:w-auto">
  <button type="submit" className="btn btn-primary w-full md:w-auto">
    {editingData ? "Update" : "Add"}
  </button>
</div>

      </form>

      {/* Data Table */}
      <div className="mt-6 overflow-x-auto bg-white shadow rounded">
        <table className="table w-full text-sm">
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {worksheets && worksheets?.map((item) => (
              <tr key={item._id}>
                <td>{item.task}</td>
                <td>{item.hours}</td>
                <td>{item.date}</td>
                <td className="space-x-2 whitespace-nowrap">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleEdit(item)}
                  >
                    🖊 Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(item._id)}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded shadow max-w-md w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-2 top-2 text-red-500 text-xl"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm">Task</label>
                <select
                  {...register("task", { required: true })}
                  className="input input-bordered w-full"
                >
                  <option value="" disabled>
                    Select Task
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-work">Paper-work</option>
                </select>
                {errors.task && (
                  <p className="text-red-500 text-sm mt-1">Please select a task</p>
                )}
              </div>

              <div>
                <label className="block text-sm">Hours Worked</label>
                <input
                  type="number"
                  {...register("hours", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.hours && (
                  <p className="text-red-500 text-sm mt-1">Hours are required</p>
                )}
              </div>

              <div>
                <label className="block text-sm">Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSheet;
