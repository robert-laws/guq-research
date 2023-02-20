import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css';
import App from './App';
import PublicationsState from './context/publications/PublicationsState';
import AuthorsState from './context/authors/AuthorsState';
import InteractionsState from './context/interactions/InteractionsState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PublicationsState>
      <AuthorsState>
        <InteractionsState>
          <App />
        </InteractionsState>
      </AuthorsState>
    </PublicationsState>
  </React.StrictMode>
);
