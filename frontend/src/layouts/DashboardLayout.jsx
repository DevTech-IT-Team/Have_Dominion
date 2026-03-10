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
    <div className="min-h-screen bg-basedark">
      {/* Main Content */}
      <div className="flex flex-col">
        {/* Top Header - Hidden for admin dashboard */}
        {!hideHeader && (
          <header className="bg-navy-800/80 backdrop-blur-md shadow-lg border-b border-gold-500/20">
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-lg font-semibold text-gold-400">
                  {getPageTitle()}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  isAdmin 
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' 
                    : 'bg-navy-700/50 text-gold-300 border border-navy-600'
                }`}>
                  {isAdmin ? 'Admin' : 'User'}
                </span>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="bg-gradient-to-r from-navy-700 to-navy-900 text-white px-4 py-2 rounded-lg hover:from-navy-600 hover:to-navy-800 text-sm font-medium transition-all duration-300 border border-gold-500/30 hover:border-gold-500/50 shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-basedark">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
