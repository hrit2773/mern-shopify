import React, { useEffect } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { useSelector,useDispatch } from "react-redux";
import { getcart } from "../cart/CartSlice";
import Progress from "../Progress";
import { getOrders } from "../../StateStore/CheckoutSlice";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import EmptyOrders from "./EmptyOrders";

export default function OrderDetails() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getcart())
    dispatch(getOrders())
  },[])
  let orders=useSelector((state)=>state.orderlist.orders)
  let loading=useSelector((state)=>state.orderlist.isLoading)
  if (loading){
    return (
      <div className='h-screen flex justify-center items-center'>
        <Loader></Loader>
      </div>
    )
  }
  if (orders.length===0){
    return(
      <EmptyOrders></EmptyOrders>
    ) 
  }
  return(
    <>
      {orders && orders.map((order)=>{
        return(
          <div className=" bg-sky-100 shadow-2xl m-7" key={order._id}>
          <h1 className=" text-3xl mb-10">Order ID:#{order._id}</h1>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 m-5">
            {order.products.map((item, index) => (
              <div>
                <Card shadow="sm" key={index}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover h-[140px]"
                      src={item.thumbnail}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>
                      <div>
                        {item.title}

                      </div>
                      <div>
                        quantity:{item.quantity}

                      </div>
                    </b>
                    <p className="text-default-500">${item.price}</p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          <div className=" ml-5">
            <h1 className=" text-xl">Total:${order.total_price}</h1>
          </div>
          <div className=" mt-20 ml-5">
            <Progress status={order.status}></Progress>
          </div>
          </div>
        )
        })
      }
      <div className=" flex justify-center mb-10">
        <Link
          to='/'
          className="font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => setOpen(false)}
        >
          Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
        </Link>

      </div>
    </>
  )
}

  
  
  

