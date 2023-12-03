import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const fetchProductsList=async ()=>{
    const res= await fetch('https://dummyjson.com/products?limit=100')
    return res.json()
}
const fetchProductsCategories=async (category)=>{
    const res=await fetch(`https://dummyjson.com/products/category/${category}`)
    return res.json()
}
const fetchProductsById=async (id)=>{
    const res=await fetch(`https://dummyjson.com/products/${id}`)
    return res.json()    
}

export const fetchProducts= createAsyncThunk("fetchProducts",fetchProductsList)
export const fetchByCategory=createAsyncThunk("fetchByCategory",fetchProductsCategories)
export const fetchById=createAsyncThunk("fetchById",fetchProductsById)

export const product_slice=createSlice({
    name: "productlist",
    initialState:{
        productsLoading:false,
        isLoading:false,
        products:[],
        filteredproducts:[],
        filter:[],
        currentPageProducts: [],
        selectedProduct:null
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.filter=[]
            state.products=action.payload.products
            state.filteredproducts=action.payload.products
            state.currentPageProducts=action.payload.products.filter((product)=>{
                return (product.id>=1)&&(product.id<=10)
            })
            state.productsLoading=false
        })
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.productsLoading=true
        })
        builder.addCase(fetchByCategory.pending,(state,action)=>{
            
            state.isLoading=true
        })
        builder.addCase(fetchByCategory.fulfilled,(state,action)=>{
            
            if (state.filter.length===0){
                state.filteredproducts=action.payload.products
                state.filter.push(action.payload.products[0].category)
            }
            else{
                let flag=false
                for (let i of state.filter){
                    if (i===action.payload.products[0].category){
                        flag=true
                    }
                }
                
                if (flag===false){
                    
                    state.filteredproducts=[...state.filteredproducts,...action.payload.products]
                    state.filter.push(action.payload.products[0].category)
                    
                }
            }
            
            state.isLoading=false
        })
        builder.addCase(fetchById.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(fetchById.fulfilled,(state,action)=>{
            state.selectedProduct=action.payload
            state.isLoading=false
        })
        
    },
    reducers:{
        removeFilter:(state,action)=>{
            if (state.filter.length>1){
                state.filteredproducts=state.filteredproducts.filter((product)=>{
                    return product.category!==action.payload
                })
            }
            else{
                state.filteredproducts=state.products
            }
            state.filter.splice(state.filter.indexOf(action.payload),1)
        },
        sortProducts:(state,action)=>{
            let order=action.payload.order
            if (order==='asc'){
                state.filteredproducts=state.filteredproducts.sort((a,b)=>{
                    return a[action.payload.sort]-b[action.payload.sort]
                })
            }
            else if (order==='desc'){
                state.filteredproducts=state.filteredproducts.sort((a,b)=>{
                    return b[action.payload.sort]-a[action.payload.sort]
                })
            }
        },
        addProductsInPage:(state,action)=>{
            state.currentPageProducts=state.filteredproducts.slice(action.payload*10-10,action.payload*10)
        },
        selectProduct:(state,action)=>{
            let user=JSON.parse(localStorage.getItem("LoggedUser"))
            state.selectedProduct={...action.payload,user:user.email}
        }
    }
})
export const {removeFilter,sortProducts,addProductsInPage,selectProduct}=product_slice.actions

