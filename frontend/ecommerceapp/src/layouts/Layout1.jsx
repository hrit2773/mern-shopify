import React from 'react'
import {Outlet} from 'react-router-dom'
import Home from '../components/pages/Home'
import Navbar from '../components/Navbar'
import ProductPage from '../components/ProductPage'
import { validateUserAsync } from "../components/auth/AuthSlice"
import { useDispatch } from 'react-redux'

import { useEffect } from 'react'
function Layout1() {
    let dispatch=useDispatch()
    
    return (
        <div>
            
            <Outlet/>
        </div>
    )
}

export default Layout1
