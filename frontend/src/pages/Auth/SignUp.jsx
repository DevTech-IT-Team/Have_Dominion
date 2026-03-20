import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import api from '../../api/axios';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        
        // Frontend validation
        if (!name || name.length < 2) {
            return handleError('Name is required')
        }
        if (!email || !email.includes('@') || !email.includes('.')) {
            return handleError('Valid email is required')
        }
        if (!password || password.length < 6) {
            return handleError('Password must be at least 6 characters')
        }
        
        const payload = {
            name,
            email,
            password
        };
        
        setIsLoading(true);
        try {
            const response = await api.post("auth/user/signup", payload);
            const result = response.data;
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/login')
                }, 1000)
            } else if (error) {
                setIsLoading(false);
                const details = error?.details?.[0]?.message || error;
                handleError(details);
            } else if (!success) {
                setIsLoading(false);
                handleError(message || 'Signup failed');
            }
        } catch (err) {
            setIsLoading(false);
            handleError(err);
        }
    }
    return (
        <div className='min-h-screen bg-gradient-to-br from-obsidian to-midnight-900 flex items-center justify-center px-4 py-8'>
            <div className='max-w-md w-full bg-midnight-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-electric/20 p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
                    <p className='text-gray-400'>Join us today and get started</p>
                </div>
                
                <form onSubmit={handleSignup} className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-300 mb-2'>
                            Full Name
                        </label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            placeholder='John Doe'
                            value={signupInfo.name}
                            className='w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-electric focus:border-transparent outline-none transition-all duration-200 bg-midnight-900/50 text-white placeholder-gray-500'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                            Email Address
                        </label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='john@example.com'
                            value={signupInfo.email}
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
                                placeholder='Create a strong password...'
                                value={signupInfo.password}
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
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>
                
                <div className='mt-6 text-center'>
                    <span className='text-gray-400'>Already have an account? </span>
                    <Link 
                        to="/login" 
                        className='text-electric font-semibold hover:text-electric-light transition-colors duration-200'
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signup
