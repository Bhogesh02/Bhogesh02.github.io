import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShareCardPage from './components/ShareCardPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname || '/';
root.render(
  <React.StrictMode>
    {/* If visiting /card (or /card/) render the standalone share page so link previews and direct visits show the card */}
    {path === '/card' || path === '/card/' ? <ShareCardPage/> : <App/>}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
