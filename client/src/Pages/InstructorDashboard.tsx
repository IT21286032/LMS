import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Course } from '../types/Course';
import '../styles/InstructorDashboard.css';

interface DecodedToken {
  user: {
    id: string;
    role: string;
  };
}

const InstructorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to get user ID from token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return decodedToken.user.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Invalid token');
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const instructorId = getUserIdFromToken();
      const response = await axios.get(`http://localhost:5000/api/courses/instructor/${instructorId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      setError('Failed to delete course.');
    }
  };

  return (
    <div className="instructor-dashboard">
      <h2>My Courses</h2>
      <Link to="/add-course" className="btn btn-primary">Add Course</Link>
      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}
      <div className="courses-list">
        {courses.length ? (
          courses.map(course => (
            <div key={course._id} className="course-card">
              {course.displayPicture && (
                <img
                  src={`http://localhost:5000/${course.displayPicture}`}
                  alt={course.title}
                  className="course-image"
                />
              )}
              <h3>
                <Link to={`/enrolled-students/${course._id}`}>{course.title}</Link>
              </h3>
              <p>{course.description}</p>
              <div className="course-actions">
                <Link to={`/edit-course/${course._id}`} className="btn btn-secondary">Edit</Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
