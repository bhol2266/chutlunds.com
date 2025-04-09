import { useContext, useState, useEffect } from 'react';
import videosContext from '../context/videos/videosContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getCookie, setCookie } from 'cookies-next';
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router';

export default function ContactForm({ selectedPlan }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: getCookie('email') || '', // Initialize email field with cookie if available
    });

    const router = useRouter();

    const { paymentModalVisible, setpaymentModalVisible } = useContext(videosContext);
    const { setLoginModalVisible } = UserAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value, data) => {
        const countryCodeLength = data.dialCode.length;
        const numberWithoutCode = value.slice(countryCodeLength);

        if (numberWithoutCode.length <= 10) {
            setFormData((prev) => ({ ...prev, phone: value }));
        }
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

        router.push(`https://uk-developers-beta.vercel.app/membership?planAmount=${selectedPlan.amount}&planDuration=${selectedPlan.duration}&planCode=${selectedPlan.planCode}&email=${formData.email}&name=${formData.name}&phonenumber=${formData.phone}&source=${"Chutlunds"}`);
        // router.push(`http://localhost:3001/membership?planAmount=${selectedPlan.amount}&planDuration=${selectedPlan.duration}&planCode=${selectedPlan.planCode}&email=${formData.email}&name=${formData.name}&phonenumber=${formData.phone}&source=${"Chutlunds"}`);
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

                    {/* Mobile Input with Country Code */}
                    <div>
                        <label className="block text-gray-700 font-medium font-inter mb-1">Mobile Number</label>
                        <PhoneInput
                            country={'us'}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputClass="!w-full !h-11 !text-base font-inter"
                            buttonClass="!border-gray-300"
                            inputStyle={{
                                width: '100%',
                                borderRadius: '0.5rem',
                                paddingLeft: '48px',
                            }}
                            containerStyle={{
                                width: '100%',
                            }}
                            inputProps={{
                                required: true,
                                name: 'phone',
                                autoFocus: false,
                            }}
                        />
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
