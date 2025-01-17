import axios from "axios";
import { AuthService } from "../services/AuthService";
const API_BASE_URL = "http://localhost:3000/"; // Update with your backend URL

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  return responseData;
};

// Login User
export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const responseData = await res.json();
  return responseData;
};

// Fetch all courses with search
export const fetchCourses = async (query = "", page = 1) => {
  const res = await fetch(
    `${API_BASE_URL}course/getallcourse?search=${query}&page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const responseData = await res.json();
  return responseData;
};

// Fetch course by ID
export const fetchCourseById = async (id) => {
  const res = await fetch(`${API_BASE_URL}course/getCourseByid/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const responseData = await res.json();
  return responseData;
};

// by course by ID
export const buyCourseById = async (id, price) => {
  const bodyData = {
    courseId: id,
    priceAtPurchase: price,
  };
  const res = await fetch(`${API_BASE_URL}course/purchaseCourse`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: AuthService.getApiAuthorizationConfig(),
    },
    body: JSON.stringify(bodyData),
    credentials: "include",
  });
  const responseData = await res.json();
  return responseData;
};


// create course by 
export const createCourse = async (formData) => {
  const res = await fetch(`${API_BASE_URL}course/createCourse`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: AuthService.getApiAuthorizationConfig(),
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const responseData = await res.json();
  return responseData;
};
