import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/ChatGPTRecommendation.css';

const ChatGPTRecommendation: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRecommendations(''); 

    try {
      const response = await axios.post<{ recommendations: string }>(
        'http://localhost:5000/api/gpt/recommend',
        { prompt: query }
      );
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    }
  };

  return (
    <div className="chatgpt-recommendation">
      <h2>Get Course Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="query" className="label">Enter your query:</label>
          <textarea
            id="query"
            className="textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you are looking for..."
          />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">Get Recommendations</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {recommendations && (
        <div className="recommendations-text">
          <pre>{recommendations}</pre>
        </div>
      )}
    </div>
  );
};

export default ChatGPTRecommendation;
