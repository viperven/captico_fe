import { Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";

const Navbar = () => {

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">CoursePortal</Link>
      </div>
      <div className="flex-none">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-secondary mx-2">Register</Link>
        <Link to="/create-course" className="btn btn-secondary">Sell</Link>
      </div>
    </div>
  );
};

export default Navbar;
