import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Function to check authentication status
    const checkAuthStatus = async () => {
        try {
            console.log('Checking auth status...'); // Debug log
            const url = 'http://127.0.0.1:5000/auth/check';
            const response = await axios.get(url, { withCredentials: true });
            console.log('Auth check response:', response.data); // Debug log
            
            const authenticated = response.data.authenticated;
            setIsAuthenticated(authenticated);
            
            // If authenticated, get user data
            if (authenticated) {
                try {
                    const userResponse = await axios.get('http://127.0.0.1:5000/@me', { withCredentials: true });
                    setUser(userResponse.data);
                    console.log('User data:', userResponse.data); // Debug log
                } catch (userError) {
                    console.error('Failed to fetch user data:', userError);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error); // Debug log
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Check auth status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        try {
            const url = 'http://127.0.0.1:5000/login';
            const response = await axios.post(url, credentials, { withCredentials: true });

            setIsAuthenticated(true);

            // Always fetch user info after login
            const userResponse = await axios.get('http://127.0.0.1:5000/@me', { withCredentials: true });
            setUser(userResponse.data);

            setLoading(false);
            return { success: true, data: userResponse.data };
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
            return { 
                success: false, 
                error: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const logout = async () => {
        try {
            console.log('Attempting logout...'); // Debug log
            const url = 'http://127.0.0.1:5000/logout';
            const response = await axios.post(url, {}, { withCredentials: true });
            console.log('Logout response:', response.data); // Debug log
            
            // Update state immediately
            setIsAuthenticated(false);
            setUser(null);
            
            // Optional: Verify logout by checking auth status
            setTimeout(() => {
                checkAuthStatus();
            }, 100);
            
            return { success: true };
        } catch (error) {
            console.error('Logout failed:', error); // Debug log
            
            // Even if logout request fails, clear local state
            setIsAuthenticated(false);
            setUser(null);
            
            return { 
                success: false, 
                error: error.response?.data?.message || 'Logout failed' 
            };
        }
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        setIsAuthenticated,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};