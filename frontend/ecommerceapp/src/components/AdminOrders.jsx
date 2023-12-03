import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { updateStatus } from '../StateStore/CheckoutSlice';
import Loader from './Loader';

function AdminOrders() {
    let dispatch=useDispatch()
    let orders=useSelector((state)=>state.orderlist.allOrders)
    let loading=useSelector((state)=>state.orderlist.isLoading)
    if (loading){
        return (
          <div className='h-screen flex justify-center items-center'>
            <Loader></Loader>
          </div>
        )
    }
    return (
        <>
        {/* component */}
        
        <div className="overflow-x-auto">
          <div className="min-w-screen min-h-screen flex justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order ID</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th className="py-3 px-6 text-center">Total Amount</th>
                      <th className="py-3 px-6 text-left">Shipping Address/Details</th>
                      <th className="py-3 px-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.map((order)=>{
                        return(
                            
                            <tr className="border-b border-gray-200 hover:bg-gray-100" key={order._id}>
                            
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                <div className="mr-2">
                                    
                                </div>
                                <span className="font-medium">#{order._id}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex items-start flex-col">
                                    {order.products.map((product)=>{
                                        return(
                                        <div className=' m-2' key={product._id}>
                                            <div className="mr-2" key={product._id}>
                                                <img
                                                className="w-6 h-6 rounded-full"
                                                src={product.thumbnail}
                                                />
                                            </div>
                                            <span>{product.title}-{product.quantity}</span>
                                        </div>
                                        )
                                    })}
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center">
                                ${order.total_price}
                                </div>
                            </td>

                            <td className="py-3 px-6 text-center">
                                <div className="m-3 py-3 px-6 text-left">
                                  <div>
                                    Street-{order.streetAddress}
                                  </div>

                                  <div>
                                    City-{order.City}
                                  </div>

                                  <div>
                                    State-{order.State}
                                  </div>

                                  <div>
                                    Pincode-{order.zip}
                                  </div>

                                  <div>
                                    UserId-{order.user}
                                  </div>
                                  
                                  <div>
                                    Email-{order.email}
                                  </div>
                                </div>
                            </td>
                            
                            <td className="py-3 px-6 text-center">
                                    <select value={order.status} onChange={(e)=>{
                                        
                                        dispatch(updateStatus({id:order._id,status:e.target.value}))
                                    }} className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                        <option value="Order Placed" >Order Placed</option>
                                        <option value="Processing" >Processing</option>
                                        <option value="Shipped" >Shipped</option>
                                        <option value="Delivered" >Delivered</option>
                                    </select>
                            </td>
                            
                            
                            </tr>
                            
                        )
                    })}

                  </tbody>
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
       


    )
}

export default AdminOrders
