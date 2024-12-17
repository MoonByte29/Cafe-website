import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomerMenu } from './pages/CustomerMenu';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/layout/Header';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useMenuStore } from './store/menuStore';

export const App: React.FC = () => {
  const initializeStore = useMenuStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Add the Hero section here */}
        <Routes>
          <Route path="/" element={<CustomerMenu />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
