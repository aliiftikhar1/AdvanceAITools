'use client'
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            // Example API endpoint for handling password reset
            const response = await axios.post("https://yourapi.com/api/forgot-password", { email });
            
            if (response.data.status === "success") {
                setMessage("Password reset link has been sent to your email.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Error sending password reset link. Please check the email and try again.");
            console.error("Forgot Password Error:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Forgot Password
                </h2>
                
                {/* Success or Error Message */}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Forgot Password Form */}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Send Reset Link
                    </button>
                </form>
                
                <p className="text-center mt-4 text-sm text-gray-600">
                    Remembered your password? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
