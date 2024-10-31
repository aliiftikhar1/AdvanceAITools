'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const params = useParams();

    useEffect(() => {
        // Extract and decode the email from the URL
        const emailFromUrl = params.id ? decodeURIComponent(params.id) : ""; // 'id' is the dynamic segment in the URL
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [params.id]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            // Create form data
            const formData = new FormData();
            formData.append("email", email);
            formData.append("newPassword", newPassword);

            // Send form data to the API endpoint
            const response = await axios.post("https://aitools.pkstockhelper.info/api/saveforgetpassword.php", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.status === "success") {
                setMessage("Password has been reset successfully.");
            } else {
                setError(response.data.message || "Failed to reset password. Please try again.");
            }
        } catch (err) {
            setError("Error resetting password. Please try again.");
            console.error("Reset Password Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Reset Password
                </h2>
                
                <p className='font-semibold text-gray-800 text-center mb-6 text-lg'>{email}</p>
                {/* Success or Error Message */}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Reset Password Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
