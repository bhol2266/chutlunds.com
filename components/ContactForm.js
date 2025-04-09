import { useContext, useState, useEffect } from 'react';
import videosContext from '../context/videos/videosContext';
import { getCookie, setCookie } from 'cookies-next';
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-number-input'; // Import react-phone-number-input

import 'react-phone-number-input/style.css'; // Don't forget to import the CSS

export default function ContactForm({ selectedPlan }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: getCookie('email') || '', // Initialize email field with cookie if available
        countryCode: '+1', // Default to US country code
    });

    const router = useRouter();

    const { paymentModalVisible, setpaymentModalVisible } = useContext(videosContext);
    const { setLoginModalVisible } = UserAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value) => {
        setFormData((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const rawPhone = formData.phone.replace(/\D/g, ''); // remove all non-numeric characters
        const mobileWithoutCode = rawPhone.slice(-10); // get last 10 digits

        if (!formData.name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!formData.phone || mobileWithoutCode.length !== 10) {
            alert("Please enter a valid mobile number.");
            return;
        }

        if (!formData.email.trim()) {
            alert("Please enter your email.");
            return;
        }

        // Save email to cookies if not already saved
        if (!getCookie("email")) {
            setCookie('email', formData.email);
        }

        console.log(formData, selectedPlan);
        // Proceed with actual form submission logic

        router.push(`https://uk-developers-beta.vercel.app/membership?planAmount=${selectedPlan.amount}&planDuration=${selectedPlan.duration}&planCode=${selectedPlan.planCode}&email=${formData.email}&name=${formData.name}&phonenumber=${formData.countryCode}${formData.phone}&source=${"Chutlunds"}`);
        // router.push(`http://localhost:3001/membership?planAmount=${selectedPlan.amount}&planDuration=${selectedPlan.duration}&planCode=${selectedPlan.planCode}&email=${formData.email}&name=${formData.name}&phonenumber=${formData.countryCode}${formData.phone}&source=${"Chutlunds"}`);
    };

    return (
        <div className={`select-none fixed flex justify-center items-center inset-0 z-30 ${paymentModalVisible ? '' : 'invisible'}`}>
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10 w-[90%] sm:w-auto">
                <h2 className="text-2xl mb-6 text-center font-inter">Fill details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-700 font-medium mb-1 font-inter">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 font-inter">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full font-inter border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Mobile Input with Country Code Picker */}
                    <div>
                        <label className="block text-gray-700 font-medium font-inter mb-1">Mobile Number</label>
                        <div className="flex">
                            {/* Country Code Picker using PhoneInput */}
                            <PhoneInput
                                international
                                defaultCountry={formData.countryCode.slice(1)} // Use country code without '+'
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                className="w-[50%] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-theme text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Goto Payment Page
                    </button>

                    {/* Cancel */}
                    <span
                        onClick={() => setpaymentModalVisible(false)}
                        className="text-md font-inter text-semiblack underline my-1 cursor-pointer text-center block"
                    >
                        Cancel
                    </span>
                </form>
            </div>
        </div>
    );
}
