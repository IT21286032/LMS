import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { User } from '../types/User'; 
import '../styles/EnrolledStudents.css'; 

const EnrolledStudents: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [students, setStudents] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>(`http://localhost:5000/api/enrolled-students/${courseId}`);
        setStudents(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch enrolled students.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledStudents();
  }, [courseId]);

  return (
    <div className="enrolled-students">
      <h2>Enrolled Students</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      {students.length ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              {/* Add more headers if needed */}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.username}</td>
                <td>{student.email}</td>
                {/* Add more student details if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students enrolled.</p>
      )}
    </div>
  );
};

export default EnrolledStudents;
