// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Auth.css';
import './styles/Layout.css';
import './styles/Home.css';
import './styles/Courses.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement!);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
