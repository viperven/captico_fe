import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCourseById } from "../services/ApiService.js";
import CookieService from "../services/CookieService";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseById(id)
      .then((res) => setCourse(res.data.apiData))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p>{course.description}</p>
      <p className="text-sm">Created by: {course.createdBy}</p>
      <p>{course.price}</p>
      <p className="text-sm">Created by: {course.price}</p>
    </div>
  );
};

export default CourseDetails;
