import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        //update user info in the database

        //update user profile in firebase
        const userProfile = {
              displayName : data.name,
              photoURL : profilePic
        }
        updateUserProfile(userProfile)
        .then(() =>{
          console.log("Profile Pic updated")
        })
        .catch(error=>{
          console.log(error);
        })


      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = ()=>{
    signInWithGoogle()
    .then(result=>{
        console.log(result.user)
        toast.success("Login Successful")
    })
    .catch(error=>{
        console.error(error)
    })
  };

  //img upload
  const handleImgUpload = async(e) =>{
    const image = e.target.files[0];
    console.log(image);
   
    const formData = new FormData();
    formData.append("image", image)
    
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`;
    
    const res = await axios.post(imageUploadUrl, formData);

    setProfilePic(res.data.data.url);
  }

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
