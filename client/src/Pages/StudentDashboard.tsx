import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import '../styles/StudentDashboard.css';

interface Course {
  _id: string;
  title: string;
  description: string;
  displayPicture?: string;
  instructor: string;
  content?: string;
  enrolledStudents?: string[];
}

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>All Courses</h2>
      <div className="courses-list">
        {courses.map(course => (
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
        ))}
      </div>
      <div className="dashboard-buttons">
        <Link to="/enrolled-courses" className="btn btn-primary">
          View Enrolled Courses
        </Link>
        <Link to="/chatgpt-recommendation" className="btn btn-primary">
          Get Recommendation
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
