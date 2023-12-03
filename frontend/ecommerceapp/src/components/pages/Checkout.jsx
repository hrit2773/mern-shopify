import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { deleteAllCartAsync, getcart } from '../cart/CartSlice'
import {useForm} from 'react-hook-form'
import Loader from '../Loader'
import { postOrder,getOrders, orderPlaced } from '../../StateStore/CheckoutSlice'
import { calculateTotalAsync } from '../cart/CartSlice'

export default function Checkout() {
  let navigate=useNavigate()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const dispatch=useDispatch()
  
  useEffect(()=>{
    dispatch(getcart())
    dispatch(calculateTotalAsync())
  },[])
  
  let products=useSelector((state)=>state.cartProducts.cartproducts)
  let isLoading=useSelector((state)=>state.cartProducts.cartLoading)
  let loading=useSelector((state)=>state.cartProducts.isLoading)

  if (isLoading || loading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader></Loader>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit((data)=>{
      let total=0
      for (let product of products){
        total+=product.quantity*product.price
      }
      let user=JSON.parse(localStorage.getItem("LoggedUser"))
      dispatch(postOrder({products:products,status:"Order Placed",total_price:total,...data,user:user.email}))
      dispatch(deleteAllCartAsync())
      dispatch(orderPlaced({total:total}))
      navigate('/OrderSuccess')
    })}>
    <div className="grid grid-rows-4 grid-flow-row gap-20">
      <div className='row-span-2 row-end-1 m-6'>
      
        <div className="space-y-12">
          
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    {...register("firstName",{required:true})}
                    type="text"
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    {...register("lastName",{required:true})}
                    type="text"
                    
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email",{
                      required:true,
                      pattern:{
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message:"Invalid email"
                      }
                    })}
                    
                    type="email"
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-2">
                  <select
                    {...register("country",{required:true})}
                    
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    {...register("Phone",{required:true})}
                    
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    
                  </input>
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    {...register("streetAddress",{required:true})}
                    type="text"
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    {...register("City",{required:true})}
                    type="text"
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    {...register("State",{required:true})}
                    type="text"
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    {...register("zip",{required:true})}
                    type="text"
                    
                    
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
            </div>

            
          </div>

          <div className="border-b border-gray-900/10 pb-12">

            {/*Payment*/}
            
          </div>
        </div>

        
      
      </div>
      {/*Cart */}
      
      <div  className=" row-span-3 mb-0 relative z-10 align-bottom" >
        
      <div className="mt-8 ml-5 mr-5">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt="img"
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <span>{product.title}</span>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500">
                                        <label className=' font-semibold text-lg text-black'>
                                            Qty
                                        </label>
                                     
                                        <span className='text-black m-1 w-1 h-3'>{product.quantity}</span> 
                                    </div>

                                    
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
        
              
        

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${JSON.parse(localStorage.getItem("cartTotal")) && JSON.parse(localStorage.getItem("cartTotal")).cart_total}</p>
                          
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          type='submit'
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Place order
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link
                            to='/'
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  
                
              
            
      </div>
    
    </div>
    </form>
    
  )
}
