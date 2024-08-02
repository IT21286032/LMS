import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/EnrolledCourses.css';

interface Course {
  _id: string;
  title: string;
  description: string;
  displayPicture?: string;
  instructor: string;
  content?: string;
}

const EnrolledCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');
  const userId = 'USER_ID'; // Replace with actual user ID retrieval logic

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/enrolled-courses/${userId}`);
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch enrolled courses.');
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  return (
    <div className="enrolled-courses">
      {error && <div className="error">{error}</div>}
      <h2>Enrolled Courses</h2>
      <div className="courses-list">
        {courses.length > 0 ? (
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
                <Link to={`/courses/${course._id}`} className="course-title-link">
                  {course.title}
                </Link>
              </h3>
              <p>{course.description}</p>
            </div>
          ))
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
