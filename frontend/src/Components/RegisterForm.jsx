import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validate = async(e) => {
        e.preventDefault();

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

    const onSubmit = () => {
        navigate('/')
    }

    return (<>
        
        <section className="max-w-4xl p-6 mx-auto bg-gray-50 rounded-lg shadow-md mt-20">
            <h1 className="text-3xl font-extrabold text-black capitalize ">Sign Up</h1>
                
            {/* Name and Surname */}
            <div>
                <label htmlFor="name" className="font-bold text-lg text-black">First Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} 
                    maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                    border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
                {/* {error.eventTitle && (
                    <p className="text-red-500 text-sm mt-1">{error.eventTitle}</p>
                )} */}
            </div>

            <div>
                <label htmlFor="surname" className="font-bold text-lg text-black">Last Name</label>
                <input id="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} 
                    maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                    border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
            </div>

            <div>
                <label htmlFor="email" className="font-bold text-lg text-black">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                    border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
            </div>

            <div>
                <label htmlFor="password" className="font-bold text-lg text-black">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                    border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="font-bold text-lg text-black">Confirm Password</label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                    maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                    border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
            </div>





            {/* Submit and Canel Button */}
            <div className="flex items-center justify-end mt-8">
                
                <button type="button" onClick={() => navigate('/')}
                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>


                <button type="submit" className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm
                    font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all`}
                    onClick={validate}>
                    Sign up
                </button>

            </div>
        </section>

    </> )
}

export default RegisterForm