import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import api from '../../api/axios';

function ChangePassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            return handleError('All fields are required');
        }

        if (formData.newPassword.length < 6) {
            return handleError('New password must be at least 6 characters long');
        }

        if (formData.newPassword !== formData.confirmPassword) {
            return handleError('New password and confirm password do not match');
        }

        if (formData.currentPassword === formData.newPassword) {
            return handleError('New password must be different from current password');
        }
        
        setIsLoading(true);
        try {
            const response = await api.post("users/change-password", { 
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            const result = response.data;
            
            if (result.success) {
                setIsSuccess(true);
                handleSuccess(result.message);
            } else {
                handleError(result.message || 'Failed to change password');
            }
        } catch (err) {
            const message = err.response?.data?.error?.message || 
                          err.response?.data?.message || 
                          'Failed to change password. Please try again.';
            handleError(message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 flex items-center justify-center px-4'>
                <div className='max-w-md w-full bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-electric/20 p-8'>
                    <div className='text-center mb-8'>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <h1 className='text-3xl font-bold text-white mb-2'>Password Changed!</h1>
                        <p className='text-gray-400'>
                            Your password has been successfully updated.
                        </p>
                    </div>
                    
                    <div className="bg-midnight-900/50 border border-green-500/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-300">
                            <strong className="text-green-400">Success!</strong><br />
                            You can now use your new password to log in.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link 
                            to="/dashboard"
                            className='w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2'
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 flex items-center justify-center px-4'>
            <div className='max-w-md w-full bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-electric/20 p-8'>
                <div className='text-center mb-8'>
                    <div className="flex justify-center mb-4">
                        <Lock className="h-12 w-12 text-electric" />
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2'>Change Password</h1>
                    <p className='text-gray-400'>Enter your current password and choose a new one.</p>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Current Password */}
                    <div>
                        <label htmlFor='currentPassword' className='block text-sm font-medium text-gray-300 mb-2'>
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showCurrentPassword ? 'text' : 'password'}
                                name='currentPassword'
                                placeholder='Enter current password...'
                                value={formData.currentPassword}
                                autoComplete='current-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric focus:outline-none"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor='newPassword' className='block text-sm font-medium text-gray-300 mb-2'>
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showNewPassword ? 'text' : 'password'}
                                name='newPassword'
                                placeholder='Enter new password...'
                                value={formData.newPassword}
                                autoComplete='new-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric focus:outline-none"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300 mb-2'>
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type={showConfirmPassword ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm new password...'
                                value={formData.confirmPassword}
                                autoComplete='new-password'
                                className='w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-electric focus:outline-none"
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
                        disabled={isLoading}
                        className='w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Changing...</span>
                            </>
                        ) : (
                            <span>Change Password</span>
                        )}
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <Link 
                        to="/dashboard"
                        className='text-electric font-semibold hover:text-electric-light transition-colors duration-200 flex items-center justify-center space-x-2'
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Dashboard</span>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ChangePassword
