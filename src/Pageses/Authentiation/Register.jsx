import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  if (!profilePic) {
    toast.error("Please wait for the image to upload or upload again");
    return;
  }

  try {
    const result = await createUser(data.email, data.password);

    const userInfo = {
      name: data.name,
      email: data.email,
      role: data.role,
      bank_account_no: data.bank_account_no,
      designation: data.designation,
      salary: parseFloat(data.salary),
      photoURL: profilePic,
      createdAt: new Date().toISOString(),
      last_login: new Date().toISOString(),
      isVerified: false,
      ifFired: false,
    };

    await axiosInstance.post("/users", userInfo);

    await updateUserProfile({
      displayName: data.name,
      photoURL: profilePic,
    });

    toast.success("Registration complete!");
    navigate(from); // ✅ Move here
  } catch (error) {
    console.error("Register error:", error);
    toast.error("Something went wrong");
  }
};



 const handleGoogleSignIn = () => {
  signInWithGoogle()
    .then(async (result) => {
      const { user } = result;
      const { isNewUser } = result._tokenResponse; 

      // If first-time Google login, save to DB
      if (isNewUser) {
        const userInfo = {
          name: user.displayName || "Unknown",
          email: user.email,
          role: "Employee", // default role
          bank_account_no: "16168592303", // optional placeholder
          designation: "",
          salary: 150,
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
          last_login: new Date().toISOString(),
          isVerified: false,
          ifFired: false,
        };

        try {
          const res = await axiosInstance.post("/users", userInfo);
          console.log("User added:", res.data);
        } catch (err) {
          console.error("Failed to save Google user:", err);
        }
      }

      toast.success("Login Successful");
      navigate(from);
    })
    .catch((error) => {
      console.error("Google login error:", error);
      toast.error("Login failed");
    });
};


  //img upload
 const handleImgUpload = async (e) => {
  const image = e.target.files[0];
  if (!image) return toast.error("No image selected");

  const formData = new FormData();
  formData.append("image", image);

  const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;

  try {
    toast.loading("Uploading image...", { id: "imgUpload" });
    const res = await axios.post(imageUploadUrl, formData);

    if (res.data && res.data.success) {
      const imageUrl = res.data.data.url;
      setProfilePic(imageUrl);
      toast.success("Image uploaded successfully", { id: "imgUpload" });
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    toast.error("Image upload failed", { id: "imgUpload" });
    console.error("Image upload error:", error);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Create an Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
            validate: {
              hasCapital: (v) =>
                /[A-Z]/.test(v) || "Must include a capital letter",
              hasSpecial: (v) =>
                /[!@#$%^&*]/.test(v) || "Must include a special character",
            },
          })}
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <select
          {...register("role", { required: "Role is required" })}
          className="input input-bordered w-full"
        >
          <option value="">Select Role</option>
          <option value="Employee">Employee</option>
          <option value="HR">HR</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}

        <input
          type="text"
          placeholder="Bank Account Number"
          {...register("bank_account_no", { required: "Bank Account No is required" })}
          className="input input-bordered w-full"
        />
        {errors.bank_account_no && (
          <p className="text-red-500 text-sm">
            {errors.bank_account_no.message}
          </p>
        )}

        <input
          type="text"
          placeholder="Designation (e.g. Sales Assistant)"
          {...register("designation", { required: "Designation is required" })}
          className="input input-bordered w-full"
        />
        {errors.designation && (
          <p className="text-red-500 text-sm">{errors.designation.message}</p>
        )}

        <input
          type="number"
          placeholder="Salary"
          {...register("salary", { required: "Salary is required" })}
          className="input input-bordered w-full"
        />
        {errors.salary && (
          <p className="text-red-500 text-sm">{errors.salary.message}</p>
        )}

        
        <input
          type="file"
          onChange={handleImgUpload}
          accept="image/*"
          // {...register("photo", { required: "Photo is required" })}
          className="file-input file-input-bordered w-full"
        />
        {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>} 
       

        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center">
          <small>
            Have an account? Please{" "}
            <NavLink to={"/login"} className="text-blue-600 font-semibold">
              Login
            </NavLink>
          </small>
        </p>
      </form>

      <div className="w-full max-w-lg mt-4">
        <button
        onClick={handleGoogleSignIn}
          type="button"
          className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center gap-2 justify-center"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
