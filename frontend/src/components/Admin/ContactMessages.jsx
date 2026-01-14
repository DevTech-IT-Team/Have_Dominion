import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';

const ContactMessages = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [statusFilter, currentPage]);

  const fetchContacts = async () => {
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

      const response = await adminService.getContacts(params);
      
      if (response.success) {
        setContacts(response.data.contacts);
        setTotalPages(response.data.pagination.pages);
      } else {
        setError(response.message || 'Failed to fetch contacts');
      }
    } catch (err) {
      setError(err.message || 'Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      setUpdatingStatus(true);
      setStatusError(null);
      
      console.log('Updating contact status:', { contactId, status });
      const result = await adminService.updateContactStatus(contactId, status);
      console.log('Update result:', result);
      console.log('Result structure:', { 
        hasSuccess: !!result?.success, 
        hasData: !!result?.data,
        resultKeys: result ? Object.keys(result) : 'null'
      });
      
      if (result && result.success) {
        const updatedContact = result.data || { ...selectedContact, status };
        console.log('Updated contact:', updatedContact);
        
        // Update the contact in the contacts list immediately
        setContacts(prevContacts => {
          const updated = prevContacts.map(contact => 
            contact._id === contactId || contact._id?.toString() === contactId?.toString()
              ? updatedContact
              : contact
          );
          console.log('Updated contacts list:', updated);
          return updated;
        });
        
        // Update the selected contact if it's the one we just updated
        if (selectedContact && (selectedContact._id === contactId || selectedContact._id?.toString() === contactId?.toString())) {
          console.log('Updating selected contact from', selectedContact.status, 'to', updatedContact.status);
          setSelectedContact(updatedContact);
        }
        
        setStatusError(null);
      } else {
        const errorMsg = result?.message || 'Failed to update status';
        setStatusError(errorMsg);
        console.error('Status update failed:', result);
      }
    } catch (err) {
      const errorMsg = err.message || err.response?.data?.message || err.response?.data?.error?.message || 'Error updating contact status';
      setStatusError(errorMsg);
      console.error('Error updating contact status:', {
        message: err.message,
        response: err.response?.data,
        fullError: err
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    try {
      const result = await adminService.deleteContact(contactId);
      
      if (result.success) {
        fetchContacts();
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact(null);
        }
      } else {
        alert(result.message || 'Failed to delete contact');
      }
    } catch (err) {
      alert('Error deleting contact');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'read':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading contact messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">{error}</div>
        <button 
          onClick={fetchContacts}
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
        <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
        
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
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 space-y-4 max-h-96 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No contact messages found
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedContact(contact)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedContact?._id === contact._id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                <p className="text-sm text-gray-500 mb-2">{contact.service}</p>
                <p className="text-xs text-gray-400">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="bg-white border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedContact.name}</h3>
                  <p className="text-gray-600">{selectedContact.email}</p>
                  <p className="text-sm text-gray-500">{selectedContact.service}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedContact.status}
                    onChange={(e) => updateContactStatus(selectedContact._id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Error Message Display */}
              {statusError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-800 font-medium">{statusError}</p>
                  </div>
                </div>
              )}

              {/* Accept/Reject Action Buttons */}
              <div className="mb-4 flex gap-3">
                {selectedContact.status !== 'accepted' && (
                  <button
                    onClick={() => updateContactStatus(selectedContact._id, 'accepted')}
                    disabled={updatingStatus}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingStatus ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accept Service Request</span>
                      </>
                    )}
                  </button>
                )}
                {selectedContact.status !== 'rejected' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reject this service request?')) {
                        updateContactStatus(selectedContact._id, 'rejected');
                      }
                    }}
                    disabled={updatingStatus}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updatingStatus ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reject Service Request</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Message:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>Received: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                {selectedContact.updatedAt !== selectedContact.createdAt && (
                  <p>Updated: {new Date(selectedContact.updatedAt).toLocaleString()}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-6 text-center text-gray-500">
              Select a contact message to view details
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

export default ContactMessages;
