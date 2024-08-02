import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

    if (userRole === 'student') {
      navigate('/student-dashboard');
    } else if (userRole === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/login'); // Redirect to login if role is unknown or not logged in
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHome;
