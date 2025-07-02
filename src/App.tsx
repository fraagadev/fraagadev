import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import StarField from './components/StarField';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Oracle from './pages/Oracle';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <div className="min-h-screen bg-galaxy relative overflow-hidden">
            <StarField />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route 
                path="/oracle" 
                element={
                  <ProtectedRoute requiresSubscription>
                    <Oracle />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gallery" 
                element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(139, 71, 247, 0.9)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </div>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;