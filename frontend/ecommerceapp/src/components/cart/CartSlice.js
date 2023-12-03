import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart,getFromCart,deleteCart,increaseCart,decreaseCart, calculateTotal, deleteAllCart } from "./cartAPI";
export const fetchCartProducts=createAsyncThunk('fetchCartProducts',addToCart)
export const getcart=createAsyncThunk('getcart',getFromCart)
export const deleteCartProduct=createAsyncThunk('deleteCartProduct',deleteCart)
export const increaseCartProducts=createAsyncThunk('increaseCartProducts',increaseCart)
export const decreaseCartProducts=createAsyncThunk('decreaseCartProducts',decreaseCart)
export const calculateTotalAsync=createAsyncThunk('calculateTotalAsync',calculateTotal)
export const deleteAllCartAsync=createAsyncThunk('deleteAllCartAsync',deleteAllCart)

export const cartProductsSlice=createSlice({
    name:"cartProducts",
    initialState:{
        cartproducts:[],
        isLoading:false,
        cartLoading:false,
        selectedId:''
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCartProducts.fulfilled,(state,action)=>{
            state.cartproducts=action.payload
        })
        builder.addCase(getcart.pending,(state,action)=>{
            state.cartLoading=true
        })
        builder.addCase(getcart.fulfilled,(state,action)=>{
            state.cartproducts=action.payload
            state.cartLoading=false
        })
        builder.addCase(deleteCartProduct.fulfilled,(state,action)=>{
            state.cartproducts=state.cartproducts.filter((product)=>{
                return product._id!==action.payload._id
            })
        })
        builder.addCase(increaseCartProducts.pending,(state,action)=>{
            state.isLoading=true
            
        })
        builder.addCase(decreaseCartProducts.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(increaseCartProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartproducts=action.payload
            
        })
        builder.addCase(decreaseCartProducts.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartproducts=action.payload
            
        })
        builder.addCase(calculateTotalAsync.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(calculateTotalAsync.fulfilled,(state,action)=>{
        
            localStorage.setItem("cartTotal",JSON.stringify(action.payload))
            state.isLoading=false
            
        })
        builder.addCase(deleteAllCartAsync.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(deleteAllCartAsync.fulfilled,(state,action)=>{
            state.isLoading=false
        })
    },
    reducers:{
        updateCart:(state,action)=>{
            state.cartproducts=action.payload
        },
        setId:(state,action)=>{
            state.selectedId=action.payload
        }
    }
    
})
export const {updateCart,setId}=cartProductsSlice.actions