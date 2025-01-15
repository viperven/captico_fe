// pages/Register.js
import React, { useState } from "react";
import { registerUser } from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import CookieService from "../services/CookieService";
const cookieName = "token";
const cookieExpairy = 1;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      debugger;
      const data = await registerUser(formData);
      if (data?.isSuccess) {
        CookieService.setCookie(cookieName, data?.token, cookieExpairy);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        alert(`message : ${data?.message}`);
      }
    } catch (err) {
      console.log(err?.message);
      alert(data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
