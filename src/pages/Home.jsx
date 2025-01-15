import { useState, useEffect } from "react";
import { fetchCourses } from "../services/ApiService";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";

const Home = () => {
  const [courses, setCourses] = useState([]); // Courses data
  const [search, setSearch] = useState(""); // Search input value
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(false); // Loading state

  //debounce
  // useEffect(() => {
  //   const timeRef = setTimeout(() => {
  //     fetchCourses(search)
  //       .then((res) => setCourses(res?.apiData))
  //       .catch((err) => console.error(err));
  //   }, 900);

  //   // Cleanup function
  //   return () => clearTimeout(timeRef);
  // }, [search]);

  const loadCourses = async (page = 1, query = "") => {
    try {
      setLoading(true);
      const res = await fetchCourses(query, page);
      console.log(res);

      const apiData = res?.apiData;
      const pagination = res?.pagination;

      setCourses(apiData || []);
      setCurrentPage(pagination?.currentPage || 1);
      setTotalPages(pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      loadCourses(1, search);
    }, 900);

    return () => clearTimeout(timer);
  }, [search]);

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      loadCourses(currentPage + 1, search);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      loadCourses(currentPage - 1, search);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Search and Course List */}
      <div id="courses" className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search courses"
            className="input input-bordered w-full"
            onChange={(e) => setSearch(e.target.value)} // Update search state
          />
        </div>

        {/* Courses Grid or Loading/Empty State */}
        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center">No courses found!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-outline mx-2"
            disabled={currentPage === 1} // Disable on the first page
            onClick={handlePrevious} // Previous button handler
          >
            Previous
          </button>
          <button
            className="btn btn-outline mx-2"
            disabled={currentPage === totalPages} // Disable on the last page
            onClick={handleNext} // Next button handler
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
