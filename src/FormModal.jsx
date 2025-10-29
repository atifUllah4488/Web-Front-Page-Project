
// FormModal.jsx
import React, { useState } from "react";
import { X, Loader2 } from 'lucide-react'; 

const FormEntry = ({ isOpen, onClose }) => {
    // NEW STATES: Form Input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // NEW STATES: Submission status for the POP-UP form's button
    const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

    // *** FIX: This conditional must be correctly followed by 'return null' ***
    if (!isOpen) return null;

    // FUNCTION: Handles the form submission and saves data to Local Storage
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        if (submitStatus === 'loading') return;

        setSubmitStatus('loading');

        const formData = {
            name,
            email,
            password,
            timestamp: new Date().toISOString(),
        };

        try {
            // Simulate API/network delay (1.5 seconds)
            setTimeout(() => {
                
                // 1. Retrieve and Parse existing data
                const existingData = JSON.parse(localStorage.getItem('formDataList') || '[]');
                
                // 2. Add new form data and save back to local storage
                existingData.push(formData);
                localStorage.setItem('formDataList', JSON.stringify(existingData));
                
                setSubmitStatus('success');

                // Close the modal and reset state after a short delay
                setTimeout(() => {
                    onClose(); // Use the onClose prop to close the modal
                    setName('');
                    setEmail('');
                    setPassword('');
                    setSubmitStatus('idle'); 
                }, 1500);

            }, 1500);
            
        } catch (error) {
            console.error("Local Storage Error:", error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }
    }; // <--- Function closing brace

    // *** FIX: The main component return statement starts here ***
    return ( 
        // Backdrop: Fixed, full screen, dark overlay with high z-index
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
            
            {/* Modal Container */}
            <div className="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 transform transition-all duration-300">
                
                {/* Close Button */}
                <button
                    onClick={onClose} // Use the onClose prop
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
                    aria-label="Close form"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up / Get Access</h2>

                {/* The Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Input Fields */}
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className={`
                            w-full py-3 mt-6 rounded-lg text-white font-semibold transition duration-300
                            ${
                                submitStatus === 'loading'
                                    ? 'bg-gray-500 cursor-not-allowed'
                                : submitStatus === 'success'
                                    ? 'bg-green-600'
                                : submitStatus === 'error'
                                    ? 'bg-red-600'
                                : 'bg-purple-600 hover:bg-purple-700'
                            }
                        `}
                    >
                        {submitStatus === 'loading' ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                            </span>
                        ) : submitStatus === 'success' ? (
                            'Data Saved!'
                        ) : submitStatus === 'error' ? (
                            'Save Failed! Try Again'
                        ) : (
                            'Submit Data to Local Storage'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}; // <--- Component closing brace is crucial here

export default FormEntry;