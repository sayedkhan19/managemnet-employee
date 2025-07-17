import { useForm } from "react-hook-form";



const Register = () => {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        
    } = useForm();

   const onSubmit = data => {
        // console.log(data)
    }

    return (
        <div className="min-h-screen  flex items-center justify-center px-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-md shadow-md w-full max-w-lg space-y-4">
                <h2 className="text-2xl font-bold text-center text-blue-700">Create an Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className="input input-bordered w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                        validate: {
                            hasCapital: v => /[A-Z]/.test(v) || "Must include a capital letter",
                            hasSpecial: v => /[!@#$%^&*]/.test(v) || "Must include a special character"
                        },
                    })}
                    className="input input-bordered w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <select
                    {...register("role", { required: "Role is required" })}
                    className="input input-bordered w-full"
                >
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

                <input
                    type="text"
                    placeholder="Bank Account Number"
                    {...register("bank_account_no", { required: "Bank Account No is required" })}
                    className="input input-bordered w-full"
                />
                {errors.bank_account_no && <p className="text-red-500 text-sm">{errors.bank_account_no.message}</p>}

                <input
                    type="text"
                    placeholder="Designation (e.g. Sales Assistant)"
                    {...register("designation", { required: "Designation is required" })}
                    className="input input-bordered w-full"
                />
                {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}

                <input
                    type="number"
                    placeholder="Salary"
                    {...register("salary", { required: "Salary is required" })}
                    className="input input-bordered w-full"
                />
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}

                {/* <input
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: "Photo is required" })}
                    className="file-input file-input-bordered w-full"
                />
                {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>} */}

                <button
                    type="submit"
                    // disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    {/* {loading ? "Creating..." : "Register"} */}
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;