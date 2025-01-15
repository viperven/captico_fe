import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById, buyCourseById } from "../services/ApiService";
import courseImg from "../assets/course.jpg";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null); // Course data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch course details
  const fetchCourse = async () => {
    try {
      const response = await fetchCourseById(id);
      if (response?.isSuccess) {
        setCourse(response?.apiData);
      } else {
        alert("Failed to load course details. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching course details:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle course purchase
  const handleBuyCourse = async () => {
    try {
      const response = await buyCourseById(id, course?.price); // Placeholder API call
      if (response?.isSuccess) {
        alert("Course purchased successfully!");
      } else {
        alert(`Purchase failed :${response?.message} Please try again .`);
      }
    } catch (error) {
      console.error("Error purchasing course:", error.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  // Render loading state
  if (loading) {
    return <p className="text-center mt-6">Loading course details...</p>;
  }

  // Render course details
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Course Image */}
        <img
          src={courseImg}
          alt={course?.title}
          className="rounded-lg shadow-lg"
        />

        {/* Course Information */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{course?.title}</h1>
          <p className="text-gray-600 mb-6">{course?.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Created by:{" "}
            <span className="font-medium">{course?.createdBy?.name}</span>
          </p>
          <p className="text-lg font-semibold mb-6">
            Price: <span className="text-green-500">${course?.price}</span>
          </p>

          {/* Buy Now Button */}
          <button className="btn btn-primary" onClick={handleBuyCourse}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
