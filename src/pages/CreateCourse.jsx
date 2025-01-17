import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/ApiService";
import { AuthService } from "../services/AuthService";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!AuthService?.isAuthenticatedUser()) {
        alert("please login ! first to create course ")
      }
      const response = await createCourse(formData);
      if (response?.isSuccess) {
        alert("Course created successfully!");
        navigate("/"); // Redirect to the home page or courses page
      } else {
        alert("Failed to create course. Please try again.");
      }
    } catch (error) {
      console.error("Error creating course:", error.message);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Course</h1>
      <form
        className="bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter course title"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
            placeholder="Enter course description"
          ></textarea>
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter course price"
            min="0"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
