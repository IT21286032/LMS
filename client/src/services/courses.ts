import axios from 'axios';
import { getToken, getUserId } from './auth';


const API_URL = 'http://localhost:5000/api/courses'; // Base URL for courses

// Fetch all courses
export const getCourses = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};
export const getCoursesByInstructor = async () => {
  const token = getToken();
  const instructorId = getUserId(); // Get the instructor ID from localStorage

  if (!instructorId) {
    throw new Error('User ID not found in localStorage');
  }

  try {
    const response = await axios.get(`${API_URL}/instructor/${instructorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Fetch a single course by ID
export const getCourse = async (id: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Fetch enrolled courses
export const getEnrolledCourses = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/enrolled`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Update a course by ID
export const updateCourse = async (id: string, courseData: FormData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/${id}`, courseData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Delete a course by ID
export const deleteCourse = async (id: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error; // Re-throw error to be handled by the caller
  }
};

// Add a new course
export const addCourse = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
}

export const getEnrolledStudents = async (courseId: string) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`http://localhost:5000/api/enrolled-students/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    throw error;
  }
};

