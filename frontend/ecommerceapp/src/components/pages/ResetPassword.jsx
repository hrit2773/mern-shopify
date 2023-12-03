import React from 'react'
import { resetPasswordAsync } from '../auth/AuthSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
function ResetPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const { resetToken } = useParams()
    const dispatch=useDispatch()
    let resetPasswordMsg=useSelector((state)=>state.users.resetPassword)
    return (
        <div className=' flex justify-center mt-32'>
        <div className='flex flex-col justify-center'>
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            New password
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <form onSubmit={handleSubmit((data)=>{
                let Data={newPassword:data.newPassword,resetToken:resetToken}
                dispatch(resetPasswordAsync(Data))
            })}>
                <input
                {...register("newPassword",{
                    required: "New password is required",
                    pattern:{
                      value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters` 
                    }
                })}
                type="text"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="enter new passsword"
                />
                {errors.email && <p className=' m-2 text-red-600'>{errors.email?.message}</p>}
                {(resetPasswordMsg!=="" && !errors.email)? <p className=' m-2 text-red-600'>{resetPasswordMsg}</p>:<></>}
                <div className=' mt-5'>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Reset password
                    </button>
                </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default ResetPassword
