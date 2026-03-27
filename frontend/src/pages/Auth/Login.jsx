import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axios';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMembershipModal, setShowMembershipModal] = useState(true);
    const [membershipData, setMembershipData] = useState({
        email: '',
        type: ''
    });
    const [isSubmittingMembership, setIsSubmittingMembership] = useState(false);
    const [membershipSubmitted, setMembershipSubmitted] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Clear form on component mount to prevent stuck values
    useEffect(() => {
        setLoginInfo({
            email: '',
            password: ''
        });
        setShowPassword(false);
        setIsLoading(false);
    }, []);

    const handleMembershipChange = (e) => {
        const { name, value } = e.target;
        setMembershipData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMembershipSubmit = async (e) => {
        e.preventDefault();
        
        if (!membershipData.email || !membershipData.type) {
            return handleError('Please enter your email and select a membership type');
        }
        
        if (!membershipData.email.includes('@') || !membershipData.email.includes('.')) {
            return handleError('Please enter a valid email address');
        }

        // If Admin selected, redirect directly to admin login
        if (membershipData.type === 'Admin') {
            navigate('/admin/login');
            return;
        }

        setIsSubmittingMembership(true);
        try {
            const response = await api.post('/contact', {
                name: 'Prospective Member',
                email: membershipData.email,
                service: 'Membership Request',
                message: `User selected: ${membershipData.type} Membership before login`,
            });

            const result = response.data;
            
            if (result.success) {
                setMembershipSubmitted(true);
                handleSuccess('Membership preference recorded!');
                // Auto-close modal after 1.5 seconds and show login form
                setTimeout(() => {
                    setShowMembershipModal(false);
                    // Pre-fill the login email with the membership email
                    setLoginInfo(prev => ({ ...prev, email: membershipData.email }));
                }, 1500);
            } else {
                handleError(result.message || 'Failed to submit membership preference');
            }
        } catch (err) {
            handleError(err.message || 'Error submitting membership preference. Please try again.');
        } finally {
            setIsSubmittingMembership(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        setIsLoading(true);
        try {
            const result = await login(email, password, 'user');
            if (result.success) {
                handleSuccess('Login successful!');
                // Keep loading until redirect happens (handled by AuthContext)
            } else {
                setIsLoading(false);
                handleError(result.error || 'Login failed');
            }
        } catch (err) {
            setIsLoading(false);
            handleError(err.message || 'Login failed');
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 flex items-center justify-center px-4'>
            {/* Membership Selection Modal */}
            {showMembershipModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-obsidian/90 backdrop-blur-sm'>
                    <div className='max-w-md w-full bg-midnight-800 rounded-2xl shadow-2xl border border-electric/30 p-8 transform transition-all'>
                        {!membershipSubmitted ? (
                            <>
                                <div className='text-center mb-8'>
                                    <h2 className='text-2xl font-bold text-white mb-2'>Choose Your Membership</h2>
                                    <p className='text-gray-400 text-sm'>Select your preferred membership type to continue</p>
                                </div>

                                <form onSubmit={handleMembershipSubmit} className='space-y-6'>
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor='membershipEmail' className='block text-sm font-medium text-gray-300 mb-2'>
                                            Email Address
                                        </label>
                                        <input
                                            type='email'
                                            name='email'
                                            id='membershipEmail'
                                            placeholder='Enter your email...'
                                            value={membershipData.email}
                                            onChange={handleMembershipChange}
                                            className='w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                            required
                                        />
                                    </div>

                                    {/* Membership Type Selection */}
                                    <div className='space-y-3'>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                                            Membership Type
                                        </label>
                                        
                                        {/* Free Option */}
                                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                            membershipData.type === 'Free' 
                                                ? 'border-electric bg-electric/10' 
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}>
                                            <input
                                                type='radio'
                                                name='type'
                                                value='Free'
                                                checked={membershipData.type === 'Free'}
                                                onChange={handleMembershipChange}
                                                className='sr-only'
                                            />
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='font-semibold text-white'>Free Membership</span>
                                                    <span className='text-green-400 font-bold'>$0</span>
                                                </div>
                                                <p className='text-gray-400 text-sm mt-1'>Basic access to features</p>
                                            </div>
                                            <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                membershipData.type === 'Free' ? 'border-electric' : 'border-gray-500'
                                            }`}>
                                                {membershipData.type === 'Free' && (
                                                    <div className='w-2.5 h-2.5 rounded-full bg-electric'></div>
                                                )}
                                            </div>
                                        </label>

                                        {/* Paid Option */}
                                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                            membershipData.type === 'Paid' 
                                                ? 'border-electric bg-electric/10' 
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}>
                                            <input
                                                type='radio'
                                                name='type'
                                                value='Paid'
                                                checked={membershipData.type === 'Paid'}
                                                onChange={handleMembershipChange}
                                                className='sr-only'
                                            />
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='font-semibold text-white'>Paid Membership</span>
                                                    <span className='text-electric font-bold'>Premium</span>
                                                </div>
                                                <p className='text-gray-400 text-sm mt-1'>Full access to all features</p>
                                            </div>
                                            <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                membershipData.type === 'Paid' ? 'border-electric' : 'border-gray-500'
                                            }`}>
                                                {membershipData.type === 'Paid' && (
                                                    <div className='w-2.5 h-2.5 rounded-full bg-electric'></div>
                                                )}
                                            </div>
                                        </label>

                                        {/* Admin Login Option */}
                                        <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                            membershipData.type === 'Admin' 
                                                ? 'border-red-500 bg-red-500/10' 
                                                : 'border-gray-600 hover:border-gray-500'
                                        }`}>
                                            <input
                                                type='radio'
                                                name='type'
                                                value='Admin'
                                                checked={membershipData.type === 'Admin'}
                                                onChange={handleMembershipChange}
                                                className='sr-only'
                                            />
                                            <div className='flex-1'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='font-semibold text-white'>Admin Login</span>
                                                    <span className='text-red-400 font-bold'>Staff</span>
                                                </div>
                                                <p className='text-gray-400 text-sm mt-1'>Administrative dashboard access</p>
                                            </div>
                                            <div className={`ml-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                membershipData.type === 'Admin' ? 'border-red-500' : 'border-gray-500'
                                            }`}>
                                                {membershipData.type === 'Admin' && (
                                                    <div className='w-2.5 h-2.5 rounded-full bg-red-500'></div>
                                                )}
                                            </div>
                                        </label>
                                    </div>

                                    <button
                                        type='submit'
                                        disabled={isSubmittingMembership}
                                        className='w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2'
                                    >
                                        {isSubmittingMembership ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <span>Continue to Sign In</span>
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className='text-center py-8'>
                                <div className='flex justify-center mb-4'>
                                    <CheckCircle className="h-16 w-16 text-green-500" />
                                </div>
                                <h3 className='text-xl font-bold text-white mb-2'>Thank You!</h3>
                                <p className='text-gray-400'>Your membership preference has been recorded.</p>
                                <p className='text-gray-500 text-sm mt-2'>Redirecting to login...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className='max-w-md w-full bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-electric/20 p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
                    <p className='text-gray-400'>Sign in to your account</p>
                </div>
                
                <form onSubmit={handleLogin} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                            Email Address
                        </label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            autoComplete='off'
                            className='w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                                autoComplete='new-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className='w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>

                    <div className="flex justify-between items-center">
                        <Link 
                            to="/forgot-password" 
                            className='text-sm text-electric hover:text-electric-light transition-colors duration-200'
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                
                <div className='mt-6 text-center'>
                    <span className='text-gray-400'>Don&apos;t have an account? </span>
                    <Link 
                        to="/signup" 
                        className='text-electric font-semibold hover:text-electric-light transition-colors duration-200'
                    >
                        Sign Up
                    </Link>

                    <Link
                     to="/admin/login"
                     className="block font-semibold text-center text-electric hover:text-electric-light mt-4"
                    >
                       Login as Admin
                    </Link>

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
