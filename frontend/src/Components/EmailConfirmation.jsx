import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Background from '@/Components/Background';
import NavBar from '@/Components/NavBar';
import API_BASE from '@/lib/Constants'


const EmailConfirmation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    // const API_BASE = "https://api-venuo.mk0x.com";

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch(`${API_BASE}/confirm/${token}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage('Email confirmed successfully! You can now log in.');
                    setTimeout(() => navigate('/login'), 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Email confirmation failed.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An error occurred while confirming your email.');
            }
        };

        if (token) {
            confirmEmail();
        }
    }, [token, navigate]);

    return (
        <div className="relative w-full min-h-screen">
            <Background />
            <NavBar />
            
            <div className="w-full flex items-center justify-center mt-8 min-h-[calc(100vh-80px)]">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        {status === 'loading' && (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                <h2 className="text-2xl font-bold text-white mb-2">Confirming Email...</h2>
                                <p className="text-gray-200">Please wait while we confirm your email address.</p>
                            </>
                        )}
                        
                        {status === 'success' && (
                            <>
                                <div className="text-green-500 text-5xl mb-4">✓</div>
                                <h2 className="text-2xl font-bold text-white mb-2">Email Confirmed!</h2>
                                <p className="text-gray-200 mb-4">{message}</p>
                                <p className="text-sm text-gray-300">Redirecting to login...</p>
                            </>
                        )}
                        
                        {status === 'error' && (
                            <>
                                <div className="text-red-500 text-5xl mb-4">✗</div>
                                <h2 className="text-2xl font-bold text-white mb-2">Confirmation Failed</h2>
                                <p className="text-gray-200 mb-4">{message}</p>
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;

