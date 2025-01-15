import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiService";
import CookieService from "../services/CookieService";
const cookieName = "token";
const cookieExpairy = 1;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    setError("");
    try {
      const response = await loginUser(formData);
      if (response?.isSuccess) {
        CookieService.setCookie(cookieName, response?.token, cookieExpairy);
        navigate("/");
      } else {
        alert("Invalid credentials " + data?.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-md bg-base-100">
        <div className="card-body">
          <h2 className="card-title text-center">Login</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="link link-primary">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
