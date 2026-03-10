import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/login",{
        email,
        password
      });
     console.log(res.data.token)
      localStorage.setItem("token",res.data.token);

      navigate("/profile");

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form 
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80"
      >

        <h2 className="text-xl font-semibold mb-4 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account? 
          <Link to="/Signup" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;