import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";

const Login = () => {
  const { user, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.error(error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

const handleGoogleSignIn = () => {
  signInWithGoogle()
    .then(async (result) => {
      const { user } = result;

      // Build user payload
      const newUser = {
        name: user.displayName || "Unknown",
        email: user.email,
        role: "Employee", // default role for Google users
        bank_account_no: "5867352045",
        designation: "Marketing",
        salary: 150,
        photoURL: user.photoURL || "",
        createdAt: new Date().toISOString(),
        last_login: new Date().toISOString(),
        isVerified: false,
        ifFired: false,
      };

      try {
        // Always attempt to post — your backend will prevent duplicates
        const res = await axiosInstance.post("/users", newUser);
        console.log("User handled:", res.data);
      } catch (err) {
        console.error("User save failed:", err);
      }

      toast.success("Login successful");
      navigate(from, { replace: true });
    })
    .catch((error) => {
      console.error("Google Sign-in failed:", error);
      toast.error("Google Sign-in failed");
    });
};



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-blue-700">
          Login to Your Account
        </h2>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">Email is required</p>
          )}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 text-sm">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <div className="text-right">
          <a className="link link-hover text-blue-500">Forgot password?</a>
        </div>

        <button type="submit" className="btn btn-neutral w-full">
          Login
        </button>

        <p className="text-center mt-2">
          <small>
            Don’t have an account?{" "}
            <NavLink className="text-blue-600 font-semibold" to="/register">
              Register
            </NavLink>
          </small>
        </p>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
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
      </form>
    </div>
  );
};

export default Login;
