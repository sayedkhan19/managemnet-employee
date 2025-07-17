import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
    }

    return (
        <div className="min-h-screen  flex items-center justify-center px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <fieldset className="space-y-4">
                    <h2 className="text-xl font-bold text-center text-blue-700">Login to Your Account</h2>

                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Email"
                    />
                    {errors.email && <p className='text-red-600 text-sm'>Please provide your email</p>}

                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength: 6,
                        })}
                        className="input input-bordered w-full"
                        placeholder="Password"
                    />
                    {errors.password?.type === 'required' && <p className='text-red-600 text-sm'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className='text-red-600 text-sm'>Password must be 6 characters or longer</p>}

                    <div className="text-right">
                        <a className="link link-hover text-blue-500">Forgot password?</a>
                    </div>

                    <button className="btn btn-neutral w-full">Login</button>
                </fieldset>
            </form>
        </div>
    );
};

export default Login;