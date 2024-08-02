import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/EditCourse.css';

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null); // Replace `any` with a more specific type if available
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [instructor, setInstructor] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        const data = response.data;
        setCourse(data);
        setTitle(data.title);
        setDescription(data.description);
        setInstructor(data.instructor);
        setContent(data.content);
      } catch (err) {
        setError('Failed to fetch course data.');
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('instructor', instructor);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Course updated successfully!');
      navigate('/instructor-dashboard'); // Redirect to instructor dashboard or another page
    } catch (err) {
      setError('Failed to update course. Please try again.');
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="edit-course">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div>
          <label>Instructor:</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div> */}
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label>Current Image:</label>
          {course.displayPicture && (
            <img
              src={`http://localhost:5000/${course.displayPicture}`}
              alt={course.title}
              className="course-image"
            />
          )}
        </div>
        <div>
          <label>New Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditCourse;
