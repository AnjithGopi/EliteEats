import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import "./Registration.css"

function Registration() {
    const navigate=useNavigate()


    const [email,setEmail]=useState("")
    const [userName,setUsername]=useState("")
    const [mobile,setMobile]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPass,setConfirm]=useState("")



    const handleSubmit=(e)=>{

      e.preventDefault()

      console.log("Registration begins")
         
      if(password===confirmPass){

        console.log("Passwords match")

        axios.post(`${API_BASE_URL}/user/signup`,{

            email:email,
            name:userName,
            mobile:mobile,
            password:password
        })
        .then((response)=>{
          
            alert(response.data.message)
            navigate("/otp")
            

        })
        .catch((error)=>{
            console.log("Registration failed")
            console.log(error)
        })
      }


    }



  return <>

         {/* <form onSubmit={handleSubmit}>


            <input type="email" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
            <input type="text" value={userName} placeholder="Name" onChange={(e)=>setUsername(e.target.value)} required />
            <input type="Number" value={mobile} placeholder="Mobile Number" onChange={(e)=>setMobile(e.target.value)} required/>
            <input type="password" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
            <input type="confirmPassword" value={confirmPass} placeholder="Confirm Password" onChange={(e)=>setConfirm(e.target.value)} required />

            <button type="submit">Signup</button>



         </form> */}
          <div className="registration-container">
            
      <form onSubmit={handleSubmit} className="registration-form">
      <h2>Signup</h2>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="text"
          value={userName}
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="number"
          value={mobile}
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="password"
          value={confirmPass}
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="submit-button">Signup</button>

        <a href="/userlogin" className="login-navigate">
              Already a user? login
            </a>
      </form>
    </div>
         </>;
}

export default Registration;
