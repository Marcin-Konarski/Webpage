import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/AuthContext';

const LoginForm = ({ redirectToCreateEvent = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { setIsAuthenticated, login } = useAuthContext();

    const validate = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // Use context login function
        const result = await login({
            userEmail: email,
            userPassword: password,
        });

        if (result.success) {
            onSubmit();
            window.location.reload();
        } else {
            console.log(result.error);
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

            <form className="space-y-3">
                <div>
                    <div className="flex items-start">
                        <label htmlFor="email" className="font-bold text-lg text-gray-200 text-left w-full block ml-1">Email</label>
                    </div>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} 
                        maxLength={50} placeholder="Enter your last name" className="input-field" />
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

            {/* Submit and Canel Button */}
            <div className="flex items-center justify-end mt-8">
                
                <button type="button" onClick={() => navigate('/')}
                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-200
                    hover:bg-gray-50/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>


                <button type="submit" onClick={validate} className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm
                    font-medium text-gray-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all`}>
                    Log in
                </button>

            </div>

        </section>
    </> )
}

export default LoginForm