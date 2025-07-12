import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils'
import API_BASE from '@/lib/Constants'


const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [registerMessage, setRegisterMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // const API_BASE = "https://api-venuo.mk0x.com"
    // const API_BASE = "http://localhost:5000";

    const validate = async(e) => {
        e.preventDefault();
        setRegisterMessage({ type: '', text: '' }); // Clear previous messages
        setIsLoading(true);

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            setIsLoading(false);
            return;
        }

        const url = `${API_BASE}/register`;
        const body = {
            userName: name,
            userSurname: surname,
            userEmail: email,
            userPassword: password,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        };
        
        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                setRegisterMessage({ 
                    type: 'success', 
                    text: 'Account created successfully! Redirecting to login...' 
                });
                setTimeout(() => {
                    onSubmit();
                }, 2000);
            } else {
                // Handle different types of registration errors
                let errorMessage = 'Registration failed. Please try again.';
                
                if (data.message) {
                    if (data.message.includes('email already exists') || data.message.includes('already registered')) {
                        errorMessage = 'An account with this email already exists.';
                    } else if (data.message.includes('password')) {
                        errorMessage = 'Password does not meet requirements.';
                    } else if (data.message.includes('email') && data.message.includes('invalid')) {
                        errorMessage = 'Please enter a valid email address.';
                    } else {
                        errorMessage = data.message;
                    }
                }
                
                setRegisterMessage({ type: 'error', text: errorMessage });
            }
        } catch (error) {
            console.error("Error submitting registration", error);
            setRegisterMessage({ 
                type: 'error', 
                text: 'Network error. Please check your connection and try again.' 
            });
        } finally {
            setIsLoading(false);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "First name cannot be empty";
        if (!surname.trim()) newErrors.surname = "Last name cannot be empty";
        if (!email.trim()) newErrors.email = "Email cannot be empty";
        if (!password.trim()) newErrors.password = "Password cannot be empty";
        if (!confirmPassword.trim()) newErrors.confirmPassword = "Password cannot be empty";

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() && !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password strength validation
        if (password.trim() && password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    }

    const onSubmit = () => {
        navigate('/login?registered=true')
    }

    return (<>
        <section className="form">
            <h1 className="text-3xl font-extrabold text-gray-200 mb-6 text-left capitalize">Sign Up</h1>

            {/* Registration Status Messages */}
            {registerMessage.text && (
                <div className={`mb-4 p-3 rounded-md border ${
                    registerMessage.type === 'success' 
                        ? 'bg-green-600/20 border-green-500' 
                        : registerMessage.type === 'error' 
                        ? 'bg-red-600/20 border-red-500'
                        : 'bg-blue-600/20 border-blue-500'
                }`}>
                    <p className={`text-sm font-medium ${
                        registerMessage.type === 'success' 
                            ? 'text-green-100' 
                            : registerMessage.type === 'error' 
                            ? 'text-red-100'
                            : 'text-blue-100'
                    }`}>
                        {registerMessage.text}
                    </p>
                </div>
            )}

            <form className="space-y-3">
                {/* Name and Surname */}
                <div>
                    <div className="flex items-start">
                        <label htmlFor="name" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">First Name</label>
                    </div>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                        maxLength={50} placeholder="Enter your first name" className="input-field" />
                    {error.name && (
                        <p className="text-left text-red-500 text-sm mt-1">{error.name}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="surname" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Last Name</label>
                    </div>
                    <input id="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)}
                        maxLength={50} placeholder="Enter your last name" className="input-field" />
                    {error.surname && (
                        <p className="text-left text-red-500 text-sm mt-1">{error.surname}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="email" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Email</label>
                    </div>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                        maxLength={50} placeholder="Enter your email" className="input-field" />
                    {error.email && (
                        <p className="text-left text-red-500 text-sm mt-1">{error.email}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="password" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Password</label>
                    </div>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        maxLength={50} placeholder="Enter your password" className="input-field" />
                    {error.password && (
                        <p className="text-left text-red-500 text-sm mt-1">{error.password}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="confirmPassword" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Confirm Password</label>
                    </div>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        maxLength={50} placeholder="Confirm your password" className="input-field" />
                    {error.confirmPassword && (
                        <p className="text-left text-red-500 text-sm mt-1">{error.confirmPassword}</p>
                    )}
                </div>
            </form>

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
                    {isLoading ? 'Creating Account...' : 'Sign up'}
                </button>
            </div>
        </section>
    </> )
}

export default RegisterForm
