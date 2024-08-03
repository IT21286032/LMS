import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role'); 

    if (userRole === 'student') {
      navigate('/student-dashboard');
    } else if (userRole === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/login'); 
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHome;
