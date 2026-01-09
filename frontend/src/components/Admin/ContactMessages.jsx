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
      const result = await adminService.updateContactStatus(contactId, status);
      
      if (result.success) {
        fetchContacts();
        if (selectedContact && selectedContact._id === contactId) {
          setSelectedContact(result.data);
        }
      } else {
        alert(result.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating contact status');
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
                  </select>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
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
