import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css';
import App from './App';
import AuthState from './context/auth/AuthState';
import PublicationsState from './context/publications/PublicationsState';
import AuthorsState from './context/authors/AuthorsState';
import InteractionsState from './context/interactions/InteractionsState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthState>
      <PublicationsState>
        <AuthorsState>
          <InteractionsState>
            <App />
          </InteractionsState>
        </AuthorsState>
      </PublicationsState>
    </AuthState>
  </React.StrictMode>
);
