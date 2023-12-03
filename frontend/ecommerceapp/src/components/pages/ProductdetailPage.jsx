import React from 'react'
import Navbar from '../Navbar'
import Productdetail from '../Productdetail'
import { useDispatch, useSelector } from 'react-redux'
import { fetchById } from '../../StateStore/Slice'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getcart } from '../cart/CartSlice'
import Loader from '../Loader'
import { getFromLS } from '../auth/AuthSlice'
function ProductdetailPage() {
    const dispatch=useDispatch()
    let isLoading=useSelector((state)=>state.productlist.isLoading)
    const {id}=useParams()
    useEffect(()=>{
        dispatch(fetchById(id))
        dispatch(getcart())
        dispatch(getFromLS(localStorage.getItem('LoggedUser')))
    },[])
    if (isLoading){
        return (
            <div className='h-screen flex justify-center items-center'>
                <Loader></Loader>
            </div>
        )
    }
    return (
        <div>
            <Navbar>
                <Productdetail/>
            </Navbar>
        </div>
    )
}

export default ProductdetailPage
