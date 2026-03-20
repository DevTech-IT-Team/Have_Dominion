import React, { useState, useEffect, useCallback } from 'react';
import { adminService } from '../../services/adminService';

const UserDashboard = () => {
  const [tradelines, setTradelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMyTradelines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await adminService.getMyTradelines({
        page: currentPage,
        limit: 10
      });

      if (response.success) {
        setTradelines(response.data.tradelines);
        setTotalPages(response.data.pagination.pages);
      } else {
        setError(response.message || 'Failed to fetch tradelines');
      }
    } catch (err) {
      setError(err.message || 'Error fetching tradelines');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMyTradelines();
  }, [fetchMyTradelines]);

  const getUtilizationColor = (utilization) => {
    if (utilization < 30) return 'bg-green-100 text-green-800';
    if (utilization < 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tradelines</h1>
          <p className="text-gray-600 mt-2">
            View your assigned tradelines. These tradelines have been assigned to you by the admin.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="text-red-800">{error}</div>
            <button
              onClick={fetchMyTradelines}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Tradelines Grid */}
        {tradelines.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tradelines assigned</h3>
            <p className="text-gray-500">You don't have any tradelines assigned to your account yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradelines.map((tradeline) => (
              <div key={tradeline.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold truncate">{tradeline.bankName}</h3>
                    <span className="px-2 py-1 text-xs font-semibold bg-white bg-opacity-20 text-white rounded-full">
                      {tradeline.accountType}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Credit Limit</p>
                      <p className="text-lg font-bold text-gray-900">${tradeline.creditLimit?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Balance</p>
                      <p className="text-lg font-bold text-gray-900">${tradeline.currentBalance?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Utilization</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getUtilizationColor(tradeline.utilization)}`}>
                        {tradeline.utilization?.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Age</p>
                      <p className="text-sm font-medium text-gray-900">{tradeline.accountAge} months</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Payment History</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${tradeline.paymentHistory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{tradeline.paymentHistory}%</span>
                    </div>
                  </div>

                  {tradeline.notes && (
                    <div className="bg-gray-50 rounded-md p-2">
                      <p className="text-xs text-gray-500">Notes</p>
                      <p className="text-sm text-gray-700">{tradeline.notes}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Status: <span className={`font-medium ${
                        tradeline.status === 'Active' ? 'text-green-600' :
                        tradeline.status === 'Inactive' ? 'text-gray-600' :
                        tradeline.status === 'Closed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>{tradeline.status}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
