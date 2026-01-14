import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.role === 'admin';
  const currentPath = location.pathname;

  // Get page title based on current path
  const getPageTitle = () => {
    if (currentPath === '/admin/dashboard' || currentPath === '/dashboard') {
      return 'Dashboard';
    }
    if (currentPath === '/dashboard/services') {
      return 'My Services';
    }
    if (currentPath === '/dashboard/tradelines') {
      return 'Tradelines';
    }
    if (currentPath === '/admin/users') {
      return 'Users';
    }
    return 'Dashboard';
  };

  // Hide header for admin dashboard
  const hideHeader = currentPath === '/admin/dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Top Header - Hidden for admin dashboard */}
        {!hideHeader && (
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {getPageTitle()}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isAdmin 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isAdmin ? 'Admin' : 'User'}
                </span>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
