

export const generate_userId=()=>{

    const userId="UsrID"
    const value=Math.floor(Math.random()*9999)

    return userId+value.toString()
}


