'use client'
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true); // Set loading to true while sending email

        try {
            // Call the API endpoint for handling password reset
            const response = await axios.post("/api/forgetpassword", { email });

            if (response.data.status) { // Check if the API response status is true
                setMessage(response.data.message); // Show success message from API
            } else {
                setError(response.data.message || "Something went wrong. Please try again."); // Show error message from API
            }
        } catch (err) {
            setError("Error sending password reset link. Please check the email and try again.");
            console.error("Forgot Password Error:", err);
        } finally {
            setLoading(false); // Stop loading after the request is complete
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
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                
                <p className="text-center mt-4 text-sm text-gray-600">
                    Remembered your password? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
