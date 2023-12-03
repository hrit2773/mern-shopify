import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon,MinusSmallIcon,PlusSmallIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { updateCart,deleteCartProduct, decreaseCartProducts,increaseCartProducts,setId, getcart } from './CartSlice'
import EmptyCart from './EmptyCart'
import Spinner from '../Spinner'
import Loader from '../Loader'
import { calculateTotal } from './cartAPI'


export default function Cart() {
  const [open, setOpen] = useState(true)
  const dispatch=useDispatch()
  const products=useSelector((state)=>state.cartProducts.cartproducts)
  const cartState=useSelector((state)=>state.cartProducts)
  const isLoading=useSelector((state)=>state.cartProducts.isLoading)
  const cartLoading=useSelector((state)=>state.cartProducts.cartLoading)
  useEffect(()=>{
    dispatch(getcart())
  },[])
  

  if (cartLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader></Loader>
      </div>
    )
  }

  if (products.length===0){
    return <EmptyCart/>
  }
  return (
    
    <>
      
      <div className="mt-0 ml-5 mr-5">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {
                            products.map((product) => (
                              
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
                                        <div>{product.title}</div>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="text-gray-500 flex flex-row">
                                        
                                        <label htmlFor='quantity' className=' font-semibold text-lg text-black m-1'>
                                            Qty

                                        </label>
                                        <div className='flex flex-row border-2 border-gray-500'>
                                          
                                          <button onClick={
                                            (e)=>{
                                              if (!isLoading && product.quantity>1){
                                                dispatch(setId(product._id))
                                                dispatch(decreaseCartProducts(product._id))

                                              }
                                              
                                            }}>
                                            <MinusSmallIcon className=' m-1 w-5 text-black'/>
                                          </button>
                                          {(isLoading && cartState.selectedId===product._id)? <span className=' mt-2'><Spinner/></span>:<span className='text-black m-1 w-1 h-3'>{product.quantity}</span>}
                                          
                                          <button onClick={(e)=>{
                                            if (!isLoading && product.quantity<10){
                                              dispatch(setId(product._id))
                                              dispatch(increaseCartProducts(product._id))
                                            }
                                            
                                          }} className=' m-1 w-5 text-black'>
                                            <PlusSmallIcon />
                                          </button>
                                        </div>
                                        
                                    </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={(e)=>{dispatch(deleteCartProduct(product._id))}}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
        
              
        

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      
                      <div className="mt-6">
                        <Link
                          
                          to='/Checkout'
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
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
                  
                
              
            
      
    </>
  
  )
    
}
