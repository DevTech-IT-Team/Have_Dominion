import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import api from '../../api/axios';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Check if token is present
    useEffect(() => {
        if (!token) {
            handleError('Invalid or missing reset token');
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { password, confirmPassword } = formData;

        if (!password || password.length < 6 || password.length > 100) {
            return handleError('Password must be between 6 and 100 characters');
        }
        
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }

        if (!token) {
            return handleError('Reset token is missing. Please request a new password reset link.');
        }
        
        setIsLoading(true);
        try {
            const response = await api.post("auth/reset-password", { 
                token, 
                password 
            });
            const result = response.data;
            
            if (result.success) {
                setIsSuccess(true);
                handleSuccess(result.message);
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login', { 
                        state: { message: 'Password reset successful. Please log in with your new password.' }
                    });
                }, 3000);
            } else {
                handleError(result.message || 'Failed to reset password');
            }
        } catch (err) {
            const message = err.response?.data?.error?.message || 
                          err.response?.data?.message || 
                          'Failed to reset password. The link may have expired or is invalid.';
            handleError(message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4'>
                <div className='max-w-md w-full bg-white rounded-2xl shadow-xl border border-blue-100 p-8'>
                    <div className='text-center mb-8'>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h1 className='text-3xl font-bold text-blue-950 mb-2'>Password Reset Successful</h1>
                        <p className='text-gray-600'>
                            Your password has been reset successfully. You will be redirected to the login page shortly.
                        </p>
                    </div>
                    
                    <Link 
                        to="/login"
                        className='w-full bg-blue-950 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-200 flex items-center justify-center space-x-2'
                    >
                        <span>Go to Login</span>
                    </Link>
                </div>
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4'>
            <div className='max-w-md w-full bg-white rounded-2xl shadow-xl border border-blue-100 p-8'>
                <div className='text-center mb-8'>
                    <div className="flex justify-center mb-4">
                        <Lock className="h-12 w-12 text-blue-950" />
                    </div>
                    <h1 className='text-3xl font-bold text-blue-950 mb-2'>Set New Password</h1>
                    <p className='text-gray-600'>Enter your new password below.</p>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-blue-950 mb-2'>
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter new password...'
                                value={formData.password}
                                autoComplete='new-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none transition-all duration-200 text-black'
                                required
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>Must be at least 6 characters</p>
                    </div>
                    
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-blue-950 mb-2'>
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm new password...'
                                value={formData.confirmPassword}
                                autoComplete='new-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none transition-all duration-200 text-black'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type='submit' 
                        disabled={isLoading || !token}
                        className='w-full bg-blue-950 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 focus:ring-4 focus:ring-blue-950 focus:ring-opacity-25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Resetting...</span>
                            </>
                        ) : (
                            <span>Reset Password</span>
                        )}
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <span className='text-gray-600'>Remember your password? </span>
                    <Link 
                        to="/login" 
                        className='text-blue-950 font-semibold hover:text-blue-900 transition-colors duration-200'
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ResetPassword
