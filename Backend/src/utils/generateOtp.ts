

 const createOtp=()=>{

        let otp=Math.floor(Math.random()*10000).toString()
        return otp
    }



    export default createOtp