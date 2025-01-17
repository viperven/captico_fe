import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CourseDetails from "./pages/CourseDetails";
import Footer from "./components/Footer";
import CreateCourse from "./pages/CreateCourse";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
