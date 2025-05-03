import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Registration begins");

    if (password === confirmPass) {
      console.log("Passwords match");

      axios
        .post(`${API_BASE_URL}/rider/signup`, {
          email: email,
          name: userName,
          mobile: mobile,
          password: password,
          
        })
        .then((response) => {
          console.log(response);

          alert("Registration success");
          navigate("/rider/otp");
        })
        .catch((error) => {
          console.log("Registration failed");
          console.log(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          value={userName}
          placeholder="Name"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="Number"
          value={mobile}
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="confirmPassword"
          value={confirmPass}
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
