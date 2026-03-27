import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

const TradelineFormsAdmin = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchTradelineForms();
  }, [statusFilter, currentPage]);

  const fetchTradelineForms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 10,
      };
      
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await adminService.getTradelineForms(params);
      
      if (response.success) {
        setForms(response.data.forms);
        setTotalPages(response.data.pagination.pages);
      } else {
        setError(response.message || 'Failed to fetch tradeline forms');
      }
    } catch (err) {
      setError(err.message || 'Error fetching tradeline forms');
    } finally {
      setLoading(false);
    }
  };

  const updateFormStatus = async (formId, status) => {
    try {
      setUpdatingStatus(true);
      setStatusError(null);
      
      console.log('Updating form status:', { formId, status, adminNotes });
      const result = await adminService.updateTradelineFormStatus(formId, status, adminNotes);
      
      if (result && result.success) {
        const updatedForm = result.data?.form || { ...selectedForm, status, adminNotes };
        
        // Update the form in the list
        setForms(prevForms => {
          const updated = prevForms.map(form => 
            form._id === formId || form._id?.toString() === formId?.toString()
              ? updatedForm
              : form
          );
          return updated;
        });
        
        // Update selected form if it's the one we just updated
        if (selectedForm && (selectedForm._id === formId || selectedForm._id?.toString() === formId?.toString())) {
          setSelectedForm(updatedForm);
        }
        
        setAdminNotes('');
        setStatusError(null);
      } else {
        const errorMsg = result?.message || 'Failed to update status';
        setStatusError(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || 'Error updating form status';
      setStatusError(errorMsg);
      console.error('Error updating form status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const deleteForm = async (formId) => {
    if (!window.confirm('Are you sure you want to delete this tradeline form submission?')) {
      return;
    }

    try {
      const result = await adminService.deleteTradelineForm(formId);
      
      if (result.success) {
        fetchTradelineForms();
        if (selectedForm && selectedForm._id === formId) {
          setSelectedForm(null);
        }
      } else {
        alert(result.message || 'Failed to delete form');
      }
    } catch (err) {
      alert('Error deleting form');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const maskSSN = (ssn) => {
    if (!ssn) return '****';
    return `****${ssn}`;
  };

  const getTransactionTypeDisplay = (type) => {
    switch (type) {
      case 'buy':
        return { label: 'Buy Tradeline', subtext: 'Get added as authorized user' };
      case 'sell':
        return { label: 'Sell Tradeline', subtext: 'Add someone to your credit card' };
      default:
        return { label: type, subtext: '' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading tradeline forms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">{error}</div>
        <button 
          onClick={fetchTradelineForms}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tradeline Applications</h2>
          <p className="text-gray-500 text-sm mt-1">Review and manage tradeline purchase applications</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forms List */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
          {forms.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg border">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>No tradeline applications found</p>
            </div>
          ) : (
            forms.map((form) => (
              <div
                key={form._id}
                onClick={() => {
                  setSelectedForm(form);
                  setAdminNotes(form.adminNotes || '');
                }}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedForm?._id === form._id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{form.firstName} {form.lastName}</h3>
                    <p className="text-sm text-gray-600">{form.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(form.status)}`}>
                    {form.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700 font-medium">{form.tradelineName}</p>
                  <p className="text-sm text-gray-500">${form.price}</p>
                  <p className="text-xs text-gray-400">{getTransactionTypeDisplay(form.transactionType).label}</p>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {formatDate(form.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Form Details */}
        <div className="lg:col-span-2">
          {selectedForm ? (
            <div className="bg-white border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedForm.firstName} {selectedForm.lastName}
                    </h3>
                    <p className="text-indigo-200">{selectedForm.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedForm.status}
                      onChange={(e) => updateFormStatus(selectedForm._id, e.target.value)}
                      disabled={updatingStatus}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => deleteForm(selectedForm._id)}
                      className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Error Message */}
                {statusError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-800 font-medium">{statusError}</p>
                    </div>
                  </div>
                )}

                {/* Tradeline Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Tradeline Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Tradeline</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.tradelineName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-medium text-gray-900">${selectedForm.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Credit Limit</p>
                      <p className="text-sm font-medium text-gray-900">${parseInt(selectedForm.creditLimit).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.age}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.firstName} {selectedForm.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(selectedForm.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">SSN (Last 4)</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{maskSSN(selectedForm.ssnLast4)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transaction Type</p>
                      <p className="text-sm font-medium text-gray-900">{getTransactionTypeDisplay(selectedForm.transactionType).label}</p>
                      <p className="text-xs text-gray-500 italic">{getTransactionTypeDisplay(selectedForm.transactionType).subtext}</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-500">Street Address</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.streetAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">City</p>
                      <p className="text-sm font-medium text-gray-900">{selectedForm.city}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">State</p>
                        <p className="text-sm font-medium text-gray-900">{selectedForm.state}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">ZIP Code</p>
                        <p className="text-sm font-medium text-gray-900">{selectedForm.zipCode}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Admin Notes</h4>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  />
                  <button
                    onClick={() => updateFormStatus(selectedForm._id, selectedForm.status)}
                    disabled={updatingStatus}
                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm"
                  >
                    {updatingStatus ? 'Saving...' : 'Save Notes'}
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedForm.status !== 'approved' && (
                      <button
                        onClick={() => updateFormStatus(selectedForm._id, 'approved')}
                        disabled={updatingStatus}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center space-x-2 text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Approve Application</span>
                      </button>
                    )}
                    {selectedForm.status !== 'rejected' && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to reject this application?')) {
                            updateFormStatus(selectedForm._id, 'rejected');
                          }
                        }}
                        disabled={updatingStatus}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center space-x-2 text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reject Application</span>
                      </button>
                    )}
                    <a
                      href={`mailto:${selectedForm.email}?subject=Re: Your Tradeline Application (${selectedForm.tradelineName})`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Applicant</span>
                    </a>
                  </div>
                </div>

                {/* Submission Info */}
                <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
                  <p>Submitted: {formatDate(selectedForm.createdAt)}</p>
                  {selectedForm.updatedAt !== selectedForm.createdAt && (
                    <p>Last Updated: {formatDate(selectedForm.updatedAt)}</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Select an application to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
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
  );
};

export default TradelineFormsAdmin;
