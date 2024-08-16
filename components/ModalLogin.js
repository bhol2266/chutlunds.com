import { setCookie } from "cookies-next";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import videosContext from '../context/videos/videosContext';
import { UserAuth } from "../context/AuthContext";
import { SignUpForm } from "./LoginStuffs/SignUpForm";
import { LoginForm } from "./LoginStuffs/LoginForm";
import { IoIosCloseCircleOutline } from "react-icons/io";
export const LoginModal = () => {
    const router = useRouter();
    const { user, LoginModalVisible, setLoginModalVisible, SignUpFormVisible,
        setSignUpFormVisible,
        LoginFormVisible,
        setLoginFormVisible } = UserAuth();
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
            >



            </div>
            {/* Modal content */}
i


            {SignUpFormVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 `}>
                    <SignUpForm />
                </div>
            }

            {LoginFormVisible &&
                <div className={`rounded-lg absolute flex justify-center items-center inset-0 `}>
                    <LoginForm />
                </div>
            }



        </div>
    );
};
