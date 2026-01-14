import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, User, Settings, LogOut, CreditCard, BookOpen, ChevronDown, ChevronUp, Eye, EyeOff, Mail, DollarSign, Shield, FileText, Users
} from 'lucide-react';
import api from '../../api/axios';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showTradelines, setShowTradelines] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [tradelines, setTradelines] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [loadingTradelines, setLoadingTradelines] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [tradelinesError, setTradelinesError] = useState(null);
  const [servicesError, setServicesError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // Redirect admins away from user dashboard
    if (user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showTradelines && tradelines.length === 0 && !loadingTradelines) {
      fetchTradelines();
    }
  }, [showTradelines]);

  useEffect(() => {
    if (showServices && userServices.length === 0 && !loadingServices) {
      fetchUserServices();
    }
  }, [showServices]);

  const fetchUserServices = async () => {
    try {
      setLoadingServices(true);
      setServicesError(null);
      
      // Available services that users can opt into
      const allAvailableServices = [
        { name: 'Private Membership', icon: Users },
        { name: 'Financial Coaching', icon: DollarSign },
        { name: 'Credit Tradelines', icon: CreditCard },
        { name: 'Document Management', icon: FileText },
        { name: 'Security Services', icon: Shield }
      ];

      // Get service requests from localStorage
      const serviceRequests = JSON.parse(localStorage.getItem(`serviceRequests_${user.email}`) || '[]');
      const activeServices = JSON.parse(localStorage.getItem(`activeServices_${user.email}`) || '[]');

      // Categorize services
      const categorizedServices = allAvailableServices.map(service => {
        const request = serviceRequests.find(r => r.service === service.name);
        const active = activeServices.find(a => a.service === service.name);
        
        if (active) {
          return {
            ...service,
            status: 'active',
            enrolledDate: active.date,
            category: 'active'
          };
        } else if (request) {
          return {
            ...service,
            status: request.status || 'pending',
            requestDate: request.date,
            category: 'requested'
          };
        } else {
          return {
            ...service,
            status: 'available',
            category: 'available'
          };
        }
      });

      // Organize by category
      const organizedServices = {
        active: categorizedServices.filter(s => s.category === 'active'),
        requested: categorizedServices.filter(s => s.category === 'requested'),
        available: categorizedServices.filter(s => s.category === 'available')
      };

      // Combine all services for display (active first, then requested, then available)
      const servicesToShow = [
        ...organizedServices.active,
        ...organizedServices.requested,
        ...organizedServices.available
      ];

      setUserServices(servicesToShow);
    } catch (err) {
      setServicesError('Failed to load services');
    } finally {
      setLoadingServices(false);
    }
  };

  const handleOptIn = (serviceName) => {
    // Save service request to localStorage
    const serviceRequests = JSON.parse(localStorage.getItem(`serviceRequests_${user.email}`) || '[]');
    const newRequest = {
      service: serviceName,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    // Check if already requested
    if (!serviceRequests.find(r => r.service === serviceName)) {
      serviceRequests.push(newRequest);
      localStorage.setItem(`serviceRequests_${user.email}`, JSON.stringify(serviceRequests));
    }
    
    // Navigate to contact page with pre-filled service
    navigate('/contact', { state: { service: serviceName } });
  };

  const fetchTradelines = async () => {
    try {
      setLoadingTradelines(true);
      setTradelinesError(null);
      
      const response = await api.get('/tradeline/user/all');
      
      if (response.data.success) {
        setTradelines(response.data.data || []);
      } else {
        setTradelinesError(response.data.message || 'Failed to fetch tradelines');
      }
    } catch (err) {
      setTradelinesError(err.response?.data?.message || err.message || 'Error fetching tradelines');
    } finally {
      setLoadingTradelines(false);
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization > 80) return 'text-red-600 bg-red-50';
    if (utilization > 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      case 'Delinquent':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.role === 'admin') {
    return null;
  }

  const getServiceIcon = (serviceName) => {
    if (serviceName.includes('Membership')) return Users;
    if (serviceName.includes('Financial') || serviceName.includes('Coaching')) return DollarSign;
    if (serviceName.includes('Tradeline')) return CreditCard;
    if (serviceName.includes('Document')) return FileText;
    if (serviceName.includes('Security')) return Shield;
    return BookOpen;
  };

  const getServiceStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'responded':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'available':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'responded':
        return 'Responded';
      case 'read':
        return 'Under Review';
      case 'pending':
        return 'Requested';
      case 'available':
        return 'Available';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name || 'User'}!
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* My Services Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <button
            onClick={() => setShowServices(!showServices)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h2 className="text-sm font-semibold text-gray-900">My Services</h2>
              {userServices.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {userServices.length}
                </span>
              )}
            </div>
            {showServices ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {showServices && (
            <div className="border-t border-gray-200 p-4">
              {loadingServices ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-gray-600">Loading services...</div>
                </div>
              ) : servicesError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-sm text-red-800">{servicesError}</div>
                  <button 
                    onClick={fetchUserServices}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Retry
                  </button>
                </div>
              ) : userServices.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-4">No services available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Active Services */}
                  {userServices.filter(s => s.category === 'active').length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Active Services</h3>
                      <div className="space-y-2">
                        {userServices.filter(s => s.category === 'active').map((service, index) => {
                          const ServiceIcon = service.icon || getServiceIcon(service.name);
                          return (
                            <div 
                              key={`active-${index}`}
                              className="border border-green-200 bg-green-50 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <ServiceIcon className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                                    {service.enrolledDate && (
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        Enrolled: {new Date(service.enrolledDate).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatusColor(service.status)}`}>
                                  {getServiceStatusText(service.status)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Requested Services */}
                  {userServices.filter(s => s.category === 'requested').length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Requested Services</h3>
                      <div className="space-y-2">
                        {userServices.filter(s => s.category === 'requested').map((service, index) => {
                          const ServiceIcon = service.icon || getServiceIcon(service.name);
                          return (
                            <div 
                              key={`requested-${index}`}
                              className="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:border-amber-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                    <ServiceIcon className="h-5 w-5 text-amber-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                                    {service.requestDate && (
                                      <p className="text-xs text-gray-500 mt-0.5">
                                        Requested: {new Date(service.requestDate).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatusColor(service.status)}`}>
                                  {getServiceStatusText(service.status)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Available Services */}
                  {userServices.filter(s => s.category === 'available').length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Available Services</h3>
                      <div className="space-y-2">
                        {userServices.filter(s => s.category === 'available').map((service, index) => {
                          const ServiceIcon = service.icon || getServiceIcon(service.name);
                          return (
                            <div 
                              key={`available-${index}`}
                              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <ServiceIcon className="h-5 w-5 text-indigo-600" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getServiceStatusColor(service.status)}`}>
                                  {getServiceStatusText(service.status)}
                                </span>
                              </div>
                              <button
                                onClick={() => handleOptIn(service.name)}
                                className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                              >
                                Request Service →
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tradelines Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <button
            onClick={() => setShowTradelines(!showTradelines)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <h2 className="text-sm font-semibold text-gray-900">My Tradelines</h2>
              {tradelines.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {tradelines.length}
                </span>
              )}
            </div>
            {showTradelines ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {showTradelines && (
            <div className="border-t border-gray-200 p-4">
              {loadingTradelines ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-gray-600">Loading tradelines...</div>
                </div>
              ) : tradelinesError ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-sm text-red-800">{tradelinesError}</div>
                  <button 
                    onClick={fetchTradelines}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Retry
                  </button>
                </div>
              ) : tradelines.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">No tradelines available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tradelines.map((tradeline) => (
                    <div 
                      key={tradeline.id || tradeline._id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{tradeline.bankName}</h3>
                            <p className="text-xs text-gray-500 font-mono mt-0.5">{tradeline.accountNumber}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tradeline.status)}`}>
                          {tradeline.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Credit Limit</p>
                          <p className="text-sm font-semibold text-gray-900">${tradeline.creditLimit?.toLocaleString() || '0'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Balance</p>
                          <p className="text-sm font-medium text-gray-900">${tradeline.currentBalance?.toLocaleString() || '0'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Utilization</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getUtilizationColor(tradeline.utilization || 0)}`}>
                            {(tradeline.utilization || 0).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Payment History</p>
                          <p className="text-sm font-medium text-gray-900">{tradeline.paymentHistory || 0}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
