import { useState } from "react";
import { API_BASE_URL,ADMIN_LOGIN_ENDPOINT } from "../../constants/api";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./Login.css"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   axios.post(`${API_BASE_URL}${ADMIN_LOGIN_ENDPOINT}`,{
    email:email,
    password:password

   }).then((response)=>{
    console.log(response.data)

    navigate("/dashboard")

   }).catch((error)=>{
    console.log(error)
   })
    


  };

  return (
    // <>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       id="email"
    //       value={email}
    //       placeholder="Enter your email"
    //       onChange={handleEmail}
    //       required
    //     />
    //     <input
    //       type="password"
    //       id="password"
    //       value={password}
    //       placeholder="Enter your password"
    //       onChange={handlePassword}
    //       required
    //     />

    //     <button type="submit">login</button>
    //   </form>
    // </>
    
    <div className="login-container">
     
    <form onSubmit={handleSubmit} className="login-form">
    <h2>Admin Login</h2>
      <input
        type="email"
        id="email"
        value={email}
        placeholder="Enter your email"
        onChange={handleEmail}
        required
        className="login-input"
      />
      <input
        type="password"
        id="password"
        value={password}
        placeholder="Enter your password"
        onChange={handlePassword}
        required
        className="login-input"
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  </div>
  );
}

export default Login;
