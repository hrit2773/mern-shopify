import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { addUser,loginUser,validateUser,forgotPassword,resetPassword } from './AuthApi'

export const createUserasync=createAsyncThunk('createUserasync',addUser)
export const loginUserAsync=createAsyncThunk('loginUserAsync',loginUser)
export const validateUserAsync=createAsyncThunk('ValidateUserAsync',validateUser)
export const forgotPasswordAsync=createAsyncThunk('forgotPasswordAsync',forgotPassword)
export const resetPasswordAsync=createAsyncThunk('resetPasswordAsync',resetPassword)
export const user_slice=createSlice({
    name:'users',
    initialState:{
        loggedinUser:null,
        status:'idle',
        forgotPassword:"",
        resetPassword:""
    },
    extraReducers:(builder)=>{
        builder.addCase(createUserasync.pending,(state,action)=>{
            state.status='Loading'
        })
        builder.addCase(createUserasync.fulfilled,(state,action)=>{
            
            state.status='idle'
        })
        builder.addCase(loginUserAsync.pending,(state,action)=>{
            state.status='Loading'
        })
        builder.addCase(loginUserAsync.fulfilled,(state,action)=>{
            localStorage.setItem("userToken",action.payload.token)
            state.loggedinUser=action.payload
            state.status='idle'     
        })
        builder.addCase(validateUserAsync.pending,(state,action)=>{
            state.status='Loading'
        })
        builder.addCase(validateUserAsync.fulfilled,(state,action)=>{
            state.loggedinUser=action.payload
            state.status='idle'
        })
        builder.addCase(forgotPasswordAsync.fulfilled,(state,action)=>{
            state.forgotPassword=action.payload.message
        })
        builder.addCase(resetPasswordAsync.fulfilled,(state,action)=>{
            state.resetPassword=action.payload.message
        })
    },
    reducers:{
        getFromLS:(state,action)=>{
            state.loggedinUser=action.payload
        }
    }
})

export const {getFromLS}=user_slice.actions