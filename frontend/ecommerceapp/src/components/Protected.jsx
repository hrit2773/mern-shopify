import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate,useNavigate } from "react-router-dom"
import { validateUserAsync } from "./auth/AuthSlice"
import Loader from "./Loader"
function Protected({children}) {
    let dispatch=useDispatch()
    function isAdminEmail(email) {
        let adminDomain = "admin.com";
      
        if (email.includes(adminDomain)) {
          return true
        } else {
          return false
        }
    }
    let user=useSelector((state)=>state.users.loggedinUser)
    let status=useSelector((state)=>state.users.status)
    let navigate=useNavigate()
    useEffect(()=>{
        let curr_user=JSON.parse(localStorage.getItem("LoggedUser"))

        if (!curr_user || !curr_user.email || !curr_user.password){
            navigate('/Login')
        }
        else if (isAdminEmail(curr_user.email)){
            navigate('/AdminOrders')
        }
    },[])

    if (status=='Loading'){
        return (
            <div className='h-screen flex justify-center items-center'>
                <Loader></Loader>
            </div>
        )
    }
    else{
        return children
    }
    
    
    
}

export default Protected
