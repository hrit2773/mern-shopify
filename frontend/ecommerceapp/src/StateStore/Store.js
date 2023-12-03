import { configureStore } from "@reduxjs/toolkit";
import { product_slice } from "./Slice";
import { user_slice } from "../components/auth/AuthSlice";
import { cartProductsSlice } from "../components/cart/CartSlice";
import { orderSlice } from "./CheckoutSlice";

export const store=configureStore({
    reducer:{
        productlist:product_slice.reducer,
        users:user_slice.reducer,
        cartProducts: cartProductsSlice.reducer,
        orderlist:orderSlice.reducer
    }
})