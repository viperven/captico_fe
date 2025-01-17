import React, { useEffect } from "react";
import { useAuth } from "../services/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";


const Navbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService?.isAuthenticatedUser()) {
      login();
    }
    else {
      logout();
    }
  }, [])

  return (
    <nav className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <a className="text-lg font-bold">Course Portal</a>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <>
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
            <button className="btn btn-accent ml-2" onClick={()=>navigate("/create-course")}>Sell</button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary mr-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-primary" onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
