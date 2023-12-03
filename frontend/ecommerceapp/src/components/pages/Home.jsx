import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import ProductPage from '../ProductPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../StateStore/Slice'
import Loader from '../Loader'
import { validateUserAsync } from '../auth/AuthSlice'
import { Navigate } from 'react-router-dom'

function Home() {
    const dispatch=useDispatch()
    let isLoading=useSelector((state)=>state.productlist.productsLoading)
    let user=useSelector((state)=>state.users.loggedinUser)
    useEffect(()=>{
        dispatch(fetchProducts())    
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
                <ProductPage products/>
            </Navbar>
        </div>
    )
}

export default Home
