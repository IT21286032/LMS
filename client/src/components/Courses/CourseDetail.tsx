import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import '../../styles/CourseDetail.css';

interface Course {
  _id: string;
  title: string;
  description: string;
  displayPicture?: string;
  instructor: string;
  content?: string;
}

interface DecodedToken {
  user: {
    id: string;
    role: string;
  };
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const token = localStorage.getItem('token');
  let userId = '';

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      userId = decodedToken.user.id;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to fetch course details.');
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await axios.post('http://localhost:5000/api/enroll', { userId, courseId: id });
      setSuccess('Successfully enrolled in the course!');
    } catch (err) {
      setError('Failed to enroll in the course.');
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-detail">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <h2>{course.title} </h2>

      {course.displayPicture && (
        <img
          src={`http://localhost:5000/${course.displayPicture}`}
          alt={course.title}
          className="course-image"
        />
      )}
      <p>{course.description}</p>
      {course.content && (
        <div className="course-content">
          <h3>Course Content</h3>
          <p>{course.content}</p>
        </div>
      )}
      <button onClick={handleEnroll} className="btn btn-primary">Enroll</button>
    </div>
  );
};

export default CourseDetail;
