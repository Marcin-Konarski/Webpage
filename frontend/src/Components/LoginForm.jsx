import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/AuthContext';

const LoginForm = ({ redirectToCreateEvent = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [loginMessage, setLoginMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [urlParams] = useSearchParams();
    const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
    const { setIsAuthenticated, login } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (urlParams.get('registered') === 'true') {
            setShowRegistrationMessage(true);
            window.history.replaceState({}, '', '/login');
        }
    }, [urlParams])

    const validate = async (e) => {
        e.preventDefault();
        setLoginMessage({ type: '', text: '' }); // Clear previous messages
        setIsLoading(true);

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        try {
            // Use context login function
            const result = await login({
                userEmail: email,
                userPassword: password,
            });

            if (result.success) {
                setLoginMessage({ type: 'success', text: 'Login successful! Redirecting...' });
                setTimeout(() => {
                    onSubmit();
                }, 1000);
            } else {
                // Handle different types of login errors
                let errorMessage = 'Login failed. Please try again.';
                
                if (result.error) {
                    if (result.error.includes('user not found') || result.error.includes('User not found')) {
                        errorMessage = 'No account found with this email address.';
                    } else if (result.error.includes('password') || result.error.includes('credentials')) {
                        errorMessage = 'Invalid email or password.';
                    } else if (result.error.includes('verified') || result.error.includes('confirm')) {
                        errorMessage = 'Please verify your email address before logging in.';
                    } else {
                        errorMessage = result.error;
                    }
                }
                
                setLoginMessage({ type: 'error', text: errorMessage });
            }
        } catch (error) {
            setLoginMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email cannot be empty";
        if (!password.trim()) newErrors.password = "Password cannot be empty";

        return newErrors;
    }

    const onSubmit = () => {
        if (redirectToCreateEvent) {
            navigate('/create_event')
        } else {
            navigate('/')
        }
    }

    return (<>
        <section className="form">
            <h1 className="text-3xl font-extrabold text-gray-200 mb-6 text-left capitalize">{redirectToCreateEvent ? "Please Log in first" : "Log in"}</h1>

            {showRegistrationMessage && (
                <div className="mb-4 p-3 bg-green-600/20 border border-green-500 rounded-md">
                    <p className="text-green-100 font-bold text-sm">
                        Registration successful! Please check your email to confirm your account before logging in.
                    </p>
                </div>
            )}

            {/* Login Status Messages */}
            {loginMessage.text && (
                <div className={`mb-4 p-3 rounded-md border ${
                    loginMessage.type === 'success' 
                        ? 'bg-green-600/20 border-green-500' 
                        : loginMessage.type === 'error' 
                        ? 'bg-red-600/20 border-red-500'
                        : 'bg-blue-600/20 border-blue-500'
                }`}>
                    <p className={`text-sm font-medium ${
                        loginMessage.type === 'success' 
                            ? 'text-green-100' 
                            : loginMessage.type === 'error' 
                            ? 'text-red-100'
                            : 'text-blue-100'
                    }`}>
                        {loginMessage.text}
                    </p>
                </div>
            )}

            <form className="space-y-3">
                <div>
                    <div className="flex items-start">
                        <label htmlFor="email" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Email</label>
                    </div>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        maxLength={50} placeholder="Enter your email" className="input-field" />
                    {error.email && (
                        <p className="text-left text-red-500 text-sm ml-1">{error.email}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="password" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Password</label>
                    </div>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        maxLength={50} placeholder="Enter your password" className="input-field" />
                    {error.password && (
                        <p className="text-left text-red-500 text-sm ml-1">{error.password}</p>
                    )}
                </div>
            </form>

            <div className="mt-1 text-center">
                <p className="font-bold text-sm text-gray-200 text-left w-full block ml-1"> Don't have an account?{" "}
                    <button onClick={() => navigate("/register")} className="text-indigo-700 hover:underline">
                        Create account
                    </button>
                </p>
            </div>

            {/* Submit and Cancel Button */}
            <div className="flex items-center justify-end mt-8">
                <button type="button" onClick={() => navigate('/')}
                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-200
                    hover:bg-gray-50/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>

                <button 
                    type="submit" 
                    onClick={validate} 
                    disabled={isLoading}
                    className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm
                    font-medium text-gray-200 transition-all ${
                        isLoading 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
                    }`}
                >
                    {isLoading ? 'Logging in...' : 'Log in'}
                </button>
            </div>
        </section>
    </> )
}

export default LoginForm
