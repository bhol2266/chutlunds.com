import { setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import videosContext from '../context/videos/videosContext';
import { UserAuth } from "../context/AuthContext";

export const LoginModal = () => {
    const router = useRouter();
    const { user, LoginModalVisible, setLoginModalVisible, logOut } = UserAuth();
    const { OTPemail, setOTPemail, loggedIn, setloggedIn } = useContext(videosContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [Country, setCountry] = useState('');

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('https://api.db-ip.com/v2/free/self');
                const data = await response.json();
                setCountry(data.countryName);
                setCookie('country', data.countryName, { maxAge: 900000 });
            } catch (error) {
                const response = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0');
                const data = await response.json();
                setCountry(data.country_name);
                setCookie('country', data.country_name, { maxAge: 900000 });
            }
        };

        getLocation();
    }, []);

    const SignInButton = async () => {
        let authUrl = "";
        const scope = 'profile email';
        const currentHost = window.location.host;

        if (currentHost === "localhost:3000") {
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback&scope=${scope}`;
        } else if (currentHost === "chutlunds.com") {
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://www.chutlunds.com/api/auth/chutlunds/callback&scope=${scope}`;
        } else if (currentHost === "chutlunds2.com") {
            authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://www.chutlunds2.com/api/auth/chutlunds2/callback&scope=${scope}`;
        }

        window.location.href = authUrl;
    };

    return (
        <div className={`fixed inset-0 z-30 ${LoginModalVisible ? "" : "hidden"}`}>
            {/* Background overlay */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${LoginModalVisible ? "opacity-50" : "opacity-0"}`}
                onClick={() => setLoginModalVisible(false)}
            ></div>
            {/* Modal content */}
            <div className={`rounded-lg absolute flex justify-center items-center inset-0 ${LoginModalVisible ? "" : "hidden"}`}>
                <div className="bg-white rounded-lg  w-full mx-4 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[450px] sm:mx-auto relative">
                    {/* Close Button */}

                    <img src="/membership/membership_bg.png" className="-z-10 absolute top-0 left-0 object-cover w-screen h-full brightness-75 " alt="" />

                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        onClick={() => setLoginModalVisible(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <h2 className="mt-[20px] text-[#323232] text-[18px] font-manrope mb-2 mx-auto text-center">
                        SIGN UP / SIGN IN
                    </h2>

                    <div className="w-full mt-[56px] mb-8 mx-auto flex flex-col items-start space-y-6 px-6">
                        <div onClick={() => SignInButton('google')} className="hover:bg-slate-200 w-full rounded-xl flex items-center justify-center space-x-4 cursor-pointer py-1.5 px-6 border-[1px] border-slate-300">
                            <img src='/login/google.png' className='lg:h-[38px] object-contain h-[28px] w-[28px] cursor-pointer ml-1' alt="Google" />
                            <h2 className='font-semibold font-inter text-[#323232] text-[11px] lg:text-[14px]'>Continue with Google</h2>
                        </div>

                        <div onClick={() => SignInButton('google')} className="hover:bg-slate-200 w-full flex items-center justify-center space-x-4 cursor-pointer py-1.5 px-6 rounded-xl border-[1px] border-slate-300">
                            <img src='/login/facebook.png' className='lg:h-[40px] object-contain h-[28px] w-[28px] cursor-pointer ml-1' alt="Facebook" />
                            <h2 className='font-semibold font-inter text-[#323232] text-[11px] lg:text-[14px]'>Continue with Facebook</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
