import React, { useEffect } from 'react'
import AdminOrders from '../AdminOrders'
import AdminNavbar from '../AdminNavbar'
import { getOrders,getAllOrders } from '../../StateStore/CheckoutSlice'
import { useDispatch } from 'react-redux'
function AdminOrdersPage() {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllOrders())
    },[])
    return (
        <div>
            <AdminNavbar/>
            <AdminOrders/>
        </div>
    )
}

export default AdminOrdersPage
