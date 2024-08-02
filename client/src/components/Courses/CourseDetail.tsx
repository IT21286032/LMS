import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/CourseDetail.css';

interface Course {
  _id: string;
  title: string;
  description: string;
  displayPicture?: string;
  instructor: string;
  content?: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Replace with the actual user ID, possibly from authentication context or state
  const userId = 'USER_ID'; // Replace with actual user ID from authentication context or state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(response.data);

        // Check if the student is already enrolled
        const enrolledCoursesResponse = await axios.get(`http://localhost:5000/api/enrolled-courses/${userId}`);
        const enrolledCourses = enrolledCoursesResponse.data;
        setIsEnrolled(enrolledCourses.some((course: Course) => course._id === id));
      } catch (err) {
        setError('Failed to fetch course details.');
      }
    };

    if (id) fetchCourse();
  }, [id, userId]);

  const handleEnroll = async () => {
    try {
      await axios.post('http://localhost:5000/api/enroll', { userId, courseId: id });
      setIsEnrolled(true);
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
      <h2>{course.title } By {course.instructor}</h2>

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
      {!isEnrolled ? (
        <button onClick={handleEnroll} className="btn btn-primary">Enroll</button>
      ) : (
        <p>You are already enrolled in this course.</p>
      )}
    </div>
  );
};

export default CourseDetail;
