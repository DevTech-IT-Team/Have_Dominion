import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { handleError, handleSuccess } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4'>
            <div className='max-w-md w-full bg-white rounded-2xl shadow-xl border border-blue-100 p-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-blue-950 mb-2'>Welcome Back</h1>
                    <p className='text-gray-600'>Sign in to your account</p>
                </div>
                
                <form onSubmit={handleLogin} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-blue-950 mb-2'>
                            Email Address
                        </label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            autoComplete='off'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none transition-all duration-200 text-black'
                            required
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-blue-950 mb-2'>
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
                                className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent outline-none transition-all duration-200 text-black'
                                required
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
                    </div>
                    
                    <button 
                        type='submit' 
                        disabled={isLoading}
                        className='w-full bg-blue-950 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 focus:ring-4 focus:ring-blue-950 focus:ring-opacity-25 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2'
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                            className='text-sm text-blue-950 hover:text-blue-900 transition-colors duration-200'
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                
                <div className='mt-6 text-center'>
                    <span className='text-gray-600'>Don't have an account? </span>
                    <Link 
                        to="/signup" 
                        className='text-blue-950 font-semibold hover:text-blue-900 transition-colors duration-200'
                    >
                        Sign Up
                    </Link>

                    <Link
                     to="/admin/login"
                     className="block font-semibold text-center  text-blue-950 mt-4"
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
