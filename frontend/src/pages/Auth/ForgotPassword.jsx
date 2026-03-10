import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import api from '../../api/axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            return handleError('Please enter a valid email address');
        }
        
        setIsLoading(true);
        try {
            const response = await api.post("auth/forgot-password", { email });
            const result = response.data;
            
            if (result.success) {
                setIsSubmitted(true);
                handleSuccess(result.message);
            } else {
                handleError(result.message || 'Failed to send reset link');
            }
        } catch (err) {
            const message = err.response?.data?.error?.message || 
                          err.response?.data?.message || 
                          'Failed to send reset link. Please try again.';
            handleError(message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isSubmitted) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 flex items-center justify-center px-4'>
                <div className='max-w-md w-full bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-electric/20 p-8'>
                    <div className='text-center mb-8'>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-electric" />
                        </div>
                        <h1 className='text-3xl font-bold text-white mb-2'>Check Your Email</h1>
                        <p className='text-gray-400'>
                            If an account exists with <strong className="text-electric">{email}</strong>, we&apos;ve sent a password reset link to that address.
                        </p>
                    </div>
                    
                    <div className="bg-midnight-900/50 border border-electric/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-300">
                            <strong className="text-electric">Didn&apos;t receive the email?</strong><br />
                            Check your spam folder or try again in a few minutes.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link 
                            to="/login"
                            className='w-full bg-electric hover:bg-electric-dark text-obsidian font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2'
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Login</span>
                        </Link>

                        <button 
                            onClick={() => { setIsSubmitted(false); setEmail(''); }}
                            className='w-full text-electric font-semibold hover:text-electric-light transition-colors duration-200'
                        >
                            Try with a different email
                        </button>
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
                    <h1 className='text-3xl font-bold text-white mb-2'>Reset Password</h1>
                    <p className='text-gray-400'>Enter your email address and we&apos;ll send you a link to reset your password.</p>
                </div>
                
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email...'
                                value={email}
                                autoComplete='off'
                                className='w-full px-4 py-3 pr-12 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                                required
                                autoFocus
                            />
                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                                <span>Sending...</span>
                            </>
                        ) : (
                            <span>Send Reset Link</span>
                        )}
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <Link 
                        to="/login"
                        className='text-electric font-semibold hover:text-electric-light transition-colors duration-200 flex items-center justify-center space-x-2'
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword
