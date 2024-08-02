import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
//import Footer from './components/Layout/Footer';
//import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CourseList from './Pages/CourseList';
import CourseDetail from './Pages/CourseDetail';
import EnrolledCourses from './Pages/EnrolledCourses';
import AddCourse from './Pages/AddCourse';
import EditCourse from './Pages/EditCourse';
import InstructorDashboard from './Pages/InstructorDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ChatGPTRecommendation from './Pages/ChatGPTRecommendation';
import RedirectHome from './components/Auth/RedirectHome';
import EnrolledStudents from './Pages/EnrolledStudents';



import StudentDashboard from './Pages/StudentDashboard';
import './styles/Auth.css';
import './styles/Layout.css';
import './styles/Home.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RedirectHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enrolled-students/:courseId" element={<EnrolledStudents />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
         <Route path="/add-course" element={<AddCourse />} />
         <Route path="/edit-course/:id" element={<EditCourse />} />
         <Route path="/chatgpt-recommendation" element={<ChatGPTRecommendation />} />

          <Route
            path="/instructor-dashboard"
            element={<ProtectedRoute component={InstructorDashboard} roles={['instructor']} />}
          />
          <Route
            path="/student-dashboard"
            element={<ProtectedRoute component={StudentDashboard} roles={['student']} />}
          />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
