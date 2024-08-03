import '../../styles/CourseList.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { getCourses } from '../../services/courses';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  content?: string; 
  displayPicture?: string; 
  enrolledStudents?: string[];
}

const CourseList: React.FC = () => {
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
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="course-grid">
        {courses.map((course) => (
          <Link to={`/courses/${course._id}`} key={course._id} className="course-card-link">
            <div className="course-card">
              {course.displayPicture && (
                <img
                  src={course.displayPicture}
                  alt={`${course.title} display`}
                  className="course-image"
                />
              )}
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p className="instructor"><strong>Instructor:</strong> {course.instructor}</p>
                <button className="enroll-button">Enroll</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
