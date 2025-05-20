import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils'

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validate = async(e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const url = "http://127.0.0.1:5000/login";
        const body = {
            userEmail: email,
            userPassword: password,
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                onSubmit();
            } else {
                alert(data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Error submitting email for validation", error);
            alert("Error: " + error.message);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email cannot be empty";
        if (!password.trim()) newErrors.password = "Password cannot be empty";

        return newErrors;
    }

    const onSubmit = () => {
        navigate('/')
    }


    return (<>

        <section className="form">
            <h1 className="text-3xl font-extrabold text-gray-200 mb-6 text-left capitalize">Log in</h1>

            <form className="space-y-3">
                <div>
                    <div className="flex items-start">
                        <label htmlFor="email" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Email</label>
                    </div>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} 
                        maxLength={50} placeholder="Enter your last name" className={cn("block w-full px-4 py-2",
                            "text-gray-200 bg-transparent border border-purple-700/80 rounded-md focus:border-purple-700",
                            "focus:outline-purple-700 focus-ring")} />
                    {error.email && (
                        <p className="text-red-500 text-sm mt-1">{error.email}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="password" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Password</label>
                    </div>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        maxLength={50} placeholder="Enter your password" className={cn("block w-full px-4 py-2",
                            "text-gray-200 bg-transparent border border-purple-700/80 rounded-md focus:border-purple-700",
                            "focus:outline-purple-700 focus-ring")} />
                    {error.password && (
                        <p className="text-red-500 text-sm mt-1">{error.password}</p>
                    )}
                </div>
            </form>


            {/* Submit and Canel Button */}
            <div className="flex items-center justify-end mt-8">
                
                <button type="button" onClick={() => navigate('/')}
                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-200
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>


                <button type="submit" onClick={validate} className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm
                    font-medium text-gray-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all`}>
                    Sign up
                </button>

            </div>
        </section>

    </> )
}

export default LoginForm