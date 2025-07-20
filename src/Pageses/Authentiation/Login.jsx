import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const {signInWithGoogle,} = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    
  };

//   google login
  const handleGoogleSignIn = ()=>{
    signInWithGoogle()
    .then(result=>{
        console.log(result.user)
        toast.success("Login successful")
    })
    .catch(error=>{
        console.error(error)
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center text-blue-700">Login to Your Account</h2>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-600 text-sm">Please provide your email</p>}
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && <p className="text-red-600 text-sm">Password is required</p>}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 text-sm">Password must be 6 characters or longer</p>
          )}
        </div>

        <div className="text-right">
          <a className="link link-hover text-blue-500">Forgot password?</a>
        </div>

        <button type="submit" className="btn btn-neutral w-full">Login</button>

        <p className="text-center mt-2">
          <small>Don’t have an account?{" "}
            <NavLink className="text-blue-600 font-semibold" to={"/register"}>Register</NavLink>
          </small>
        </p>

        <div className="divider">OR</div>

        <button
        onClick={handleGoogleSignIn}
         type="button" className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center gap-2 justify-center">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
