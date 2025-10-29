import React, { useState, useEffect } from "react";
// Import necessary components/hooks from router
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'; 
// Import Icons
import { Menu, X, Lock, Code, Cable, Mail, Phone, MapPin, Loader2 } from 'lucide-react'; 



// --- 1. ContactFormModal Component (UPDATED FOR localStorage) ---

const ContactFormModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const [submitStatus, setSubmitStatus] = useState('');
    
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (submitStatus === 'loading') return;

        setSubmitStatus('loading');

        const contactData = {
            name,
            email,
            message,
            timestamp: Date.now() // Using client-side timestamp
        };
        
        try {
            // --- localStorage Logic ---
            // 1. Get existing submissions from local storage or start with an empty array
            const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions_local') || '[]');
            
            // 2. Add the new submission
            existingSubmissions.push(contactData);
            
            // 3. Save the updated array back to local storage
            localStorage.setItem('contact_submissions_local', JSON.stringify(existingSubmissions));

            console.log("Contact form successfully stored in localStorage:", contactData);

            setSubmitStatus('success');
            setTimeout(() => {
                setName('');
                setEmail('');
                setMessage('');
                setSubmitStatus('');
                onClose(); 
            }, 1500);

        } catch (error) {
            console.error("Local storage operation failed:", error);
            setSubmitStatus("error");
            setTimeout(() => {
                setSubmitStatus('');
            }, 3000);
        }
    };

    const contactInfo = [
        { icon: Phone, title: "Phone Number", value: "+92 13 3344556", href: "tel:+92133344556" },
        { icon: Mail, title: "Email Address", value: "Atif@gmail.com", href: "mailto:Atif@gmail.com" },
        { icon: MapPin, title: "Our Location", value: "Peshawar (Pakistan)", href: "https://maps.app.goo.gl/YourLocation" }
    ];

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 scale-100">
                <div className="lg:grid lg:grid-cols-2">
                    
                    <div className="p-8 lg:p-12">
                         <div className="flex justify-between items-center mb-4">
                            <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
                                Send us a Message
                            </h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="mt-2 mb-8 text-lg text-gray-600">
                            Fill out the form below. Data will be saved locally in your browser.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    value={name} 
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    value={email} 
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={submitStatus === 'loading'}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition duration-300 ${
                                        submitStatus === 'loading'
                                            ? 'bg-slate-400 cursor-not-allowed'
                                            : submitStatus === 'error'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : submitStatus === 'success'
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                                >
                                    
                                    {submitStatus === 'loading' ? (
                                        <span className="flex items-center justify-center">
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                                        </span>
                                    ) : submitStatus === 'success' ? (
                                        'Message Saved Locally!'
                                    ) : submitStatus === 'error' ? (
                                        'Submission Failed! Try Again'
                                    ) : (
                                        'Submit Contact Request'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-indigo-700 p-8 lg:p-12 text-white flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-6 border-b border-indigo-500 pb-2">
                            Direct Contact Information
                        </h3>
                        <p className="text-indigo-200 mb-8">
                            We're here to help you **Learn Computer Skills Here**! Reach out via phone or email for a faster response.
                        </p>
                        
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 pt-1 text-indigo-300">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                        <a 
                                            href={item.href} 
                                            className="text-indigo-100 hover:text-white transition duration-300 underline-offset-4 hover:underline"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- 2. ContactPage Component (UNCHANGED LOGIC) ---
const ContactPage = () => {
    const navigate = useNavigate();
    const contactInfo = [
        { icon: Phone, title: "Phone Number", value: "+92 13 9699907", href: "tel:+92133344556" },
        { icon: Mail, title: "Email Address", value: "atif440088@gmail.com", href: "mailto:Atif@gmail.com" },
        { icon: MapPin, title: "Our Location", value: "Peshawar (Pakistan)", href: "https://maps.app.goo.gl/YourLocation" }
    ];
    
    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-10 text-center">
                <h1 className="text-4xl font-extrabold text-indigo-800 mb-6">Get In Touch</h1>
                <p className="text-lg text-gray-700 mb-10">
                    Feel free to reach out to us directly using the information below.
                </p>
                 <div className="space-y-8 p-6 bg-blue-50 rounded-lg">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="flex items-start justify-center space-x-4">
                            <div className="flex-shrink-0 pt-1 text-indigo-600">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                                <a 
                                    href={item.href} 
                                    className="text-indigo-600 hover:text-indigo-800 transition duration-300 underline-offset-4 hover:underline"
                                >
                                    {item.value}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <button 
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 rounded-xl text-white mt-8 shadow-lg bg-red-500 hover:bg-red-600 transition duration-300"
                    >
                        Go back
                    </button>
            </div>
        </div>
    );
}

// 3. Other Placeholder Components (UNCHANGED LOGIC)
const AboutMe = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full shadow-lg bg-blue-100 p-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div>
                    <img 
                        src="https://placehold.co/180x180/4f46e5/ffffff?text=Atif" 
                        alt="Profile" 
                        className="w-28 h-28 md:w-48 md:h-48 mx-auto my-5 rounded-full object-cover shadow-xl"
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl mt-3 font-bold md:text-5xl text-indigo-800">
                        Hello Everyone... <span role="img" aria-label="waving hand">👋</span>
                    </h1>
                    <h3 className="text-xl md:text-3xl mt-5 text-slate-950 font-bold">I'm Atif</h3>

                    <p className="mt-4 text-gray-700 md:text-lg tracking-wide">
                        "Your future starts here. We're not just an educational institute; we are a career launchpad. With industry-expert faculty and a curriculum focused on in-demand skills, we transform motivated students into job-ready professionals, guaranteed to excel in a competitive market."
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="px-8 py-3 rounded-xl text-white mt-8 shadow-lg bg-red-500 hover:bg-red-600 transition duration-300"
                    >
                        Go back
                    </button>
                </div>
            </div>
            <p className="p-4 mt-8 text-center text-xl font-bold bg-slate-950 text-white rounded-b-xl">
                Computer Related Courses Are Available Here.
            </p>
        </div>
    );
};

const HomeContent = ({ setIsFormOpen }) => (
    <>
        <section id="hero"> 
            <div className="py-24 bg-gradient-to-r from-pink-200 to-blue-200 text-start shadow-xl min-h-[50vh]">
                <div className="max-w-2xl mx-auto px-5">
                    <div className=" text-5xl font-extrabold pb-5">
                        <h1>Welcome To My <div className="mt-3">Website.</div></h1>
                    </div>
                    <div className="">
                        <p className="text-xl pb-5 text-gray-700 tracking-tight">Unlock your potential with our suggestions and roadmap.</p>

                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-red-500 py-3 mt-10 px-8 font-bold shadow-xl rounded-xl text-white hover:bg-red-600 transition"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section id="features" className="py-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center shadow-inner mb-10 pb-10 bg-slate-200 rounded-xl mx-4">
                    <div className="text-3xl font-bold p-10 tracking-tigh text-gray-800">
                        Core Features
                    </div>
                    <div className="grid grid-cols-1 mx-5 md:grid-cols-3 px-10 gap-10">
                        {[
                            { icon: Lock, title: "Cyber Security", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloremque, unde recusandae." },
                            { icon: Code, title: "Web Development", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloremque, unde recusandae." },
                            { icon: Cable, title: "Networking", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloremque, unde recusandae." }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white pb-7 shadow-xl rounded-xl transform duration-500 hover:scale-[1.02] hover:shadow-2xl transition"
                            >
                                <div className="text-indigo-600 py-5">
                                    <feature.icon className="w-10 h-10 mx-auto" />
                                </div>
                                <div className="justify-center px-3">
                                    <h2 className="text-xl font-semibold pb-5">{feature.title}</h2>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </>
);

const Navlinks = ({ to, children, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="
            text-gray-700
            tracking-tight
            border-b-2
            border-transparent 
            hover:text-purple-600  
            hover:border-purple-600 
            pb-1
            transition 
            duration-400
            font-bold"
        >
            {children}
        </Link>
    );
};

// --- Main App Component (CLEANED UP) ---

export default function App() {
    const [isMenuOpen, SetisMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">

                {/* -------------------- 1. HEADER -------------------- */}
                <header className="sticky top-0 shadow-xl z-40">
                    <div className="w-full bg-white">
                        <nav className="px-5 md:px-10 flex justify-between items-center py-5 max-w-7xl mx-auto">
                            <div className="text-2xl text-neutral-950 font-semibold">
                                <Link to="/" className="text-indigo-600 cursor-pointer">
                                    Project<span className="text-3xl">X</span>
                                </Link>
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <Navlinks to="/" >Home</Navlinks>
                                <Navlinks to="/about">About</Navlinks>
                                <Navlinks to="/contact">Contact</Navlinks>
                            </div>
                            <button
                                onClick={() => SetisMenuOpen(!isMenuOpen)}
                                className="md:hidden transition duration-500 p-2 rounded-lg hover:bg-gray-100"
                                aria-label="toggle Menu"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </nav>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden bg-gray-100 pt-2 flex flex-col px-5 pb-5 space-y-2 hover:cursor-pointer shadow-md">
                            <Navlinks to="/" onClick={() => SetisMenuOpen(false)}>Home</Navlinks>
                            <Navlinks to="/about" onClick={() => SetisMenuOpen(false)}>About</Navlinks>
                            <Navlinks to="/contact" onClick={() => SetisMenuOpen(false)}>Contact Us</Navlinks>
                        </div>
                    )}
                </header>

                {/* -------------------- 2. ROUTING CONTAINER -------------------- */}
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomeContent setIsFormOpen={setIsFormOpen} />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/contact" element={<ContactPage />} /> 
                        <Route path="*" element={
                            <div className="p-20 text-center h-screen bg-red-100 text-red-800">
                                <h1 className="text-5xl font-bold mb-4">404</h1>
                                <p className="text-xl">Page not found.</p>
                            </div>
                        } />
                    </Routes>
                </main>

                {/* -------------------- 3. FOOTER -------------------- */}
                <footer className="mt-auto">
                    <div className="bg-gray-900 text-white p-6">
                        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-sm space-y-3 md:space-y-0">
                            <p>&copy; 2025 ProjectX Land. All rights reserved.</p>
                            <div className="flex space-x-4 text-gray-400">
                                <Link to="#" className="hover:text-white transition">Privacy Policy</Link> <span>|</span>
                                <Link to="#" className="hover:text-white transition">Terms of Use</Link>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* RENDER THE CONTACT FORM MODAL HERE */}
                {/* Removed (db && userId) check and db/userId props */}
                <ContactFormModal
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                />
            </div>
        </BrowserRouter>
    );
}
