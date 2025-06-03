import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils'

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validate = async(e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const url = "http://127.0.0.1:5000/register";
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

        if (!name.trim()) newErrors.name = "First name cannot be empty";
        if (!surname.trim()) newErrors.surname = "Last name cannot be empty";
        if (!email.trim()) newErrors.email = "Email cannot be empty";
        if (!password.trim()) newErrors.password = "Password cannot be empty";
        if (!confirmPassword.trim()) newErrors.confirmPassword = "Password cannot be empty";

        if (password != confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    }

    const onSubmit = () => {
        navigate('/')
    }


    return (<>

        <section className="form">
            <h1 className="text-3xl font-extrabold text-gray-200 mb-6 text-left capitalize">Sign Up</h1>

            <form className="space-y-3">
                {/* Name and Surname */}
                <div>
                    <div className="flex items-start">
                        <label htmlFor="name" className="font-bold text-lg text-gray-200 ml-3 min-w-20">First Name</label>
                    </div>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} 
                        maxLength={50} placeholder="Enter your first name" className="input-field" />
                    {error.name && (
                        <p className="text-red-500 text-sm mt-1">{error.name}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="surname" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Last Name</label>
                    </div>
                    <input id="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} 
                        maxLength={50} placeholder="Enter your last name" className="input-field" />
                    {error.surname && (
                        <p className="text-red-500 text-sm mt-1">{error.surname}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="email" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Email</label>
                    </div>
                    <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} 
                        maxLength={50} placeholder="Enter your last name" className="input-field" />
                    {error.email && (
                        <p className="text-red-500 text-sm mt-1">{error.email}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="password" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Password</label>
                    </div>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                        maxLength={50} placeholder="Enter your password" className="input-field" />
                    {error.password && (
                        <p className="text-red-500 text-sm mt-1">{error.password}</p>
                    )}
                </div>

                <div>
                    <div className="flex items-start">
                        <label htmlFor="confirmPassword" className="font-bold text-lg text-gray-200 ml-3 min-w-20">Confirm Password</label>
                    </div>
                    <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                        maxLength={50} placeholder="Confirm your password" className="input-field" />
                    {error.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>
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

export default RegisterForm