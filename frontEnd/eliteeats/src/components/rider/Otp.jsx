import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/api";
import { useState } from "react";
import "./Otp.css"

function Otp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/rider/verify_otp`, {
        otp: otp,
      })
      .then((response) => {
        console.log(response);
        alert("Registration success");
        navigate("/rider/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div>
    //   <h2>Enter your otp</h2>

    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="Number"
    //       value={otp}
    //       placeholder="enter Otp"
    //       onChange={(e) => setOtp(e.target.value)}
    //       required
    //     />
    //     <button>Verify</button>
    //   </form>
    // </div>
    <div className="otp-container">
    <h2 className="otp-title">Enter your OTP</h2>
    <form onSubmit={handleSubmit} className="otp-form">
      <input
        type="number"
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
        required
        className="otp-input"
      />
      <button type="submit" className="otp-button">Verify</button>
    </form>
  </div>
  );
}

export default Otp;
