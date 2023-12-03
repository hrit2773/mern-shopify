import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAsync } from '../auth/AuthSlice';
const ForgotPassword = () => {
    const dispatch=useDispatch()
    let forgotPasswordMsg=useSelector((state)=>state.users.forgotPassword)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    return (
        <div className=' flex justify-center mt-32'>
        <div className='flex flex-col justify-center'>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <form onSubmit={handleSubmit((data)=>{
                console.log(data)
                dispatch(forgotPasswordAsync(data))
            })}>
                <input
                {...register("email",{
                    required: "Email is required",
                    pattern:{
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message:"Invalid email"
                    }
                })}
                type="text"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="enter email"
                />
                {errors.email && <p className=' m-2 text-red-600'>{errors.email?.message}</p>}
                {(forgotPasswordMsg!=="" && !errors.email)? <p className=' m-2 text-red-600'>{forgotPasswordMsg}</p>:<></>}
                <div className=' mt-5'>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Send reset mail
                    </button>
                </div>
            </form>
        </div>
        </div>
        </div>
    );
};

export default ForgotPassword;
