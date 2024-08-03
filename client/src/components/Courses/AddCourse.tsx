import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../services/courses';

const AddCourse: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [displayPicture, setDisplayPicture] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    if (displayPicture) formData.append('displayPicture', displayPicture);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      await addCourse(formData);
      setSuccess('Course added successfully!');
      setError('');
      
      const role = localStorage.getItem('role'); 
      if (role === 'instructor') {
        navigate('/instructor-dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/'); 
      }
    } catch (err) {
      setError('Failed to add course. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="add-course">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="displayPicture">Image:</label>
          <input
            type="file"
            id="displayPicture"
            onChange={(e) => setDisplayPicture(e.target.files?.[0] || null)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
