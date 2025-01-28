import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import ResearchChat from './components/ResearchChat';
import ExtractChat from './components/ExtractChat';
import DraftChat from './components/DraftChat';
import { LoginPage } from './components/LoginPage';
import KnowledgeCards from './components/Integration';
import { knowledgeData } from './lib/utils';
import OnecleChat from './components/OnecleChat';
import RbiChat from './components/RbiChat';
import Extract from './extract/Extract';
import ChatInterface from './components/ResearchChat';

// Mock password encryption for demo purposes
const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS); 

console.log("Demo PAssword ins main",import.meta.env.DEMO_PASS)

// Main App Component with authentication state
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for authentication status
    const auth = localStorage.getItem('auth');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogin = (password) => {
    if (btoa(password) === ENCRYPTED_PASSWORD) {
      localStorage.setItem('auth', 'true'); // Save auth status
      setIsAuthenticated(true);
    } else {
      alert('Invalid password'); // Simple feedback for demo
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Clear authentication data
    setIsAuthenticated(false);
  };

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Define the Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Login Route */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={<Layout onLogout={handleLogout} />} 
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="ExtractChat"
            element={
              <ProtectedRoute>
                {/* <ExtractChat /> */}
                <Extract/>
              </ProtectedRoute>
            }
          />
          <Route
            path="ResearchChat"
            element={
              <ProtectedRoute>
                {/* <ResearchChat /> */}
                <ChatInterface/>
              </ProtectedRoute>
            }
          />
          <Route
            path="AutoDraftChat"
            element={
              <ProtectedRoute>
                <DraftChat />
              </ProtectedRoute>
            }
          />
           <Route
            path="integrations"
            element={
              <ProtectedRoute>
                <KnowledgeCards data={knowledgeData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="oneclechat"
            element={
              <ProtectedRoute>
                <OnecleChat />
              </ProtectedRoute>
            }
          />
           <Route
            path="integration/rbi-chat"
            element={
              <ProtectedRoute>
                <RbiChat />
              </ProtectedRoute>
            }
          />
          {/* Redirect unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

// Render the App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
