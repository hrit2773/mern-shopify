export const addUser= async (userData)=>{
    let res= await fetch('/users',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json; charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
    return res.json()
}

export const loginUser=async (user)=>{
    let res=await fetch('/users',{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    return res.json()
}
export const validateUser=async ()=>{
    let token=localStorage.getItem("userToken")
    let res=await fetch('/users/validate',{
        method: 'GET',
        headers: {
            'Content-Type':'application/json; charset=utf-8',
            'Authorization':token 
        }
    })
    return res.json()
}
export const forgotPassword=async (user)=>{
    let res= await fetch('/forgot-password',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json; charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    return res.json()
}
export const resetPassword=async (data)=>{
    let res= await fetch('/reset-password',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    return res.json()
}