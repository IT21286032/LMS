import React from 'react';
import ChatGPTRecommendation from '../components/ChatGPT/ChatGPTRecommendation';
import '../styles/ChatGPTRecommendation.css';

const ChatGPTRecommendationPage: React.FC = () => {
  return (
    <div className="chatgpt-recommendation-page">
      <header className="page-header">
        <h1>Find the Perfect Course for You</h1>
        <p>Looking for a course that suits your interests? Use the tool below to get personalized course recommendations based on your preferences.</p>
      </header>
      <main>
        <ChatGPTRecommendation />
      </main>
    </div>
  );
};

export default ChatGPTRecommendationPage;
