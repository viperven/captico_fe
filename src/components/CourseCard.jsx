import { Link } from "react-router-dom";
import courseImg from "../assets/course.jpg"

const CourseCard = ({ course }) => {
  return (
    <div className="card w-full lg:w-80 bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      {/* Static Image */}
      <figure>
        <img
          src={courseImg} 
          alt="Course Thumbnail"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-primary">
          {course.title}
        </h2>
        <p className="text-sm text-gray-600">
          {course.description.length > 100
            ? `${course.description.slice(0, 100)}...`
            : course.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-accent">${course.price}</p>
          <Link
            to={`/courses/${course._id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            View Details
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Created by: {course.createdBy.name}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
