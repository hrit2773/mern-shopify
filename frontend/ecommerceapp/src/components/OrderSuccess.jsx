// components/OrderSuccessPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';
import Loader from './Loader';
const OrderSuccessPage = () => {
  
  let cartLoading=useSelector((state)=>state.cartProducts.isLoading)
  let orderLoading=useSelector((state)=>state.orderlist.isLoading)
  const fadeInAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });
  if (cartLoading || orderLoading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader></Loader>
      </div>
    )
  }

  return (
    <animated.div style={fadeInAnimation} className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-500 to-pink-500 text-white">
      <div className="text-center">
        
        <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
        <p className="text-lg mb-6">Your order is on its way. Thank you for choosing us!</p>
        <Link
          to="/"
          className="bg-white text-purple-500 px-6 py-3 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </animated.div>
  );
};

export default OrderSuccessPage;
