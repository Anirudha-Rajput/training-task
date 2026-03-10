import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Signup() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await api.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration successful! Please check your email to verify your account.");

    } catch (error) {
     if(error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (

    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form 
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-80"
      >

        <h2 className="text-xl font-semibold mb-4 text-center">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
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

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;