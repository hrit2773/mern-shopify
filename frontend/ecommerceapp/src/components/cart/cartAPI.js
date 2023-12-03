export const addToCart= async (productData)=>{
    delete productData.id
    const res=await fetch('/cartProducts',{
        method:'POST',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        body:JSON.stringify(productData)
    })
    return res.json()
}
export const getFromCart= async ()=>{
    let user=JSON.parse(localStorage.getItem("LoggedUser"))
    const res=await fetch(`/cartProducts/${user.email}`)
        
    return res.json()
}
export const deleteCart=async (id)=>{
    const res=await fetch(`/cartProducts/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return res.json()
}
export const increaseCart=async (id)=>{
    const res=await fetch(`/cartProducts/increase/${id}`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return res.json()
}
export const decreaseCart=async (id)=>{
    const res=await fetch(`/cartProducts/decrease/${id}`,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return res.json()
}
export const calculateTotal=async ()=>{
    let user=JSON.parse(localStorage.getItem("LoggedUser"))
    const res=await fetch(`/cartProducts/calculate/${user.email}`)
        
    return res.json()
}
export const deleteAllCart=async ()=>{
    let user=JSON.parse(localStorage.getItem("LoggedUser"))
    const res=await fetch(`/cartProducts/delete/${user.email}`,{
        method:'DELETE',
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    return res.json()
}