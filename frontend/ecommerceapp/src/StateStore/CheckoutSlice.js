import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const fetchOrderAsync=async (orderData)=>{
    const res=await fetch('/orders',{
        method:'POST',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        body:JSON.stringify(orderData)
    })
    return res.json()
}
const getOrdersAsync=async ()=>{
    let user=JSON.parse(localStorage.getItem("LoggedUser"))
    const res=await fetch(`/orders/${user.email}`)
    return res.json()
}
const getAllOrdersAsync=async ()=>{
    const res=await fetch('/orders')
    return res.json()
}
const updateStatusAsync=async (statusData)=>{
    const res=await fetch(`/orders`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        body:JSON.stringify(statusData)
    })
    return res.json()
}
const orderPlacedAsync= async (data)=>{
    let user=JSON.parse(localStorage.getItem("LoggedUser"))
    const res=await fetch(`/orderplaced/${user.email}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        body:JSON.stringify(data)
    })
    return res.json()
}

export const postOrder=createAsyncThunk('postOrder',fetchOrderAsync)
export const getOrders=createAsyncThunk('getOrders',getOrdersAsync)
export const getAllOrders=createAsyncThunk('getAllOrders',getAllOrdersAsync)
export const updateStatus=createAsyncThunk('updateStatus',updateStatusAsync)
export const orderPlaced=createAsyncThunk('orderPlaced',orderPlacedAsync)
export const orderSlice=createSlice({
    name:'orderlist',
    initialState:{
        orders:[],
        isLoading:false,
        allOrders:[]
    },
    extraReducers:(builder)=>{
        builder.addCase(postOrder.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(postOrder.fulfilled,(state,action)=>{
            state.orders[0]=action.payload
            state.isLoading=false
        })
        builder.addCase(getOrders.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getOrders.fulfilled,(state,action)=>{
            state.orders=action.payload
            state.isLoading=false
        })
        builder.addCase(getAllOrders.fulfilled,(state,action)=>{
            state.allOrders=action.payload
        })
        builder.addCase(updateStatus.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(updateStatus.fulfilled,(state,action)=>{
            state.allOrders=action.payload
            state.isLoading=false
        })
        builder.addCase(orderPlaced.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(orderPlaced.fulfilled,(state,action)=>{
            state.isLoading=false
        })
    }
})