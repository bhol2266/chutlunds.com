import React, { useContext, useEffect, useState } from 'react';
import ModalMembership from '../components/ModalMembership';
import videosContext from '../context/videos/videosContext';
import { useRouter } from 'next/router';
import ContactForm from '../components/ContactForm';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase'; // ✅ Realtime DB

const features = [
    {
        img: "/membership/noads.png",
        heading: "SURF AD FREE",
        sub_heading: "No distractions ever! Hide all ads & popups"
    },
    {
        img: "/membership/4k.png",
        heading: "HIGH DEF VIDEOS",
        sub_heading: "Enjoy ultra HD videos in 4K formats"
    },
    {
        img: "/membership/download.png",
        heading: "HD Downloads up to 4K!",
        sub_heading: "Unlimited HD Downloads of all your favorite full length high-res movies."
    },
    {
        img: "/membership/exclu.png",
        heading: "EXCLUSIVE CONTENT",
        sub_heading: "Access premium, full movies and never before seen content"
    },
    {
        img: "/membership/videos.png",
        heading: "+650 NEW VIDEOS / DAY",
        sub_heading: "Hundreds of new videos added every day / 617k complete videos"
    }
];

const Membership = () => {
    const [featuresSelected, setfeaturesSelected] = useState(features);
    const [width, setwidth] = useState(0);
    const [plans, setPlans] = useState([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [iframeLoading, setIframeLoading] = useState(true);

    const router = useRouter();
    const { paymentModalVisible, selectedPlan, setSelectedPlan } = useContext(videosContext);

    useEffect(() => {
        const plansRef = ref(rtdb, 'plans');
        const unsubscribe = onValue(plansRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedPlans = Object.values(data);
                const sortedPlans = fetchedPlans.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
                setPlans(sortedPlans);
                setSelectedPlan(sortedPlans[0]);
            }
            setLoadingPlans(false);
        });

        const handleResize = () => {
            const w = window.innerWidth;
            setwidth(w);
            setfeaturesSelected(w > 1000 ? features : features.slice(0, 4));
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePlanChange = (plan) => {
        setSelectedPlan(plan);
    };

    const getAccessNowOnClick = () => {
        if (typeof window !== 'undefined') {
            const domain = window.location.origin;
            const url = `https://www.ukdevelopers.org/membership_dark?planAmount=${selectedPlan.amount}&planDuration=${selectedPlan.duration}&planCode=${selectedPlan.planCode}&source=${domain}`;
            setIframeUrl(url);
            setIframeLoading(true);
        }
    };

    const activateMembership = () => {
        router.push('/activateMembership');
    };

    return (
        <div className='relative h-screen'>
            <span className='absolute top-0 text-white text-[30px] m-5 hidden'>{width}</span>
            <img src="/membership/membership_bg.png" className="-z-20 absolute top-0 left-0 object-cover w-screen h-full brightness-75" alt="membership_bg" />

            <div className=''>
                <div className='flex items-center justify-center pt-2 lg:pt-5'>
                    <p className='text-center font-Dancing font-bold text-white text-[50px] lg:text-[80px] cursor-pointer lg:text-left select-none'>Chutlunds</p>
                    <img src="/vip-pass.png" alt="vip-pass" className='h-[70px] lg:h-[120px] animate-shine' />
                </div>

                <div className='block mx-auto w-4/5 md:w-3/5 lg:w-[500px] 2xl:w-[600px]'>
                    {loadingPlans ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        plans.map((plan, index) => (
                            <div key={index} className="flex items-center justify-between mb-2 py-3 px-4 lg:px-8 lg:py-4 bg-white bg-opacity-80 rounded-md cursor-pointer select-none" onClick={() => handlePlanChange(plan)}>
                                <div className='flex items-center'>
                                    <input
                                        type="radio"
                                        id={`plan-${index}`}
                                        name="plan"
                                        value={index}
                                        checked={selectedPlan?.duration === plan.duration}
                                        onChange={() => handlePlanChange(plan)}
                                        className="form-radio h-5 w-5 lg:h-6 lg:w-6 mr-2 lg:mr-3 text-theme border-theme focus:ring-theme"
                                    />
                                    <label htmlFor={`plan-${index}`} className="font-poppins text-md lg:text-lg">{plan.duration}</label>
                                    <span className={`font-arial font-semibold text-xs lg:text-sm ml-2 bg-red-500 text-white rounded-md px-1 py-0.5 ${!plan.offer ? "hidden" : ""}`}>{plan.offer}</span>
                                </div>
                                <div>
                                    <span className="font-bold font-inter text-md lg:text-lg">{plan.price}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-white text-[8px] lg:text-[10px] font-poppins text-center bg-black bg-opacity-50 px-2 py-0.5 w-fit mx-auto block rounded">
                    This site is protected by reCAPTCHA and the Google <a className='underline' href="https://policies.google.com/privacy">Privacy Policy</a> and <a className='underline' href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>

                <button onClick={getAccessNowOnClick} className='bg-theme text-white lg:px-8 lg:py-4 px-6 py-3 rounded-2xl font-poppins text-[14px] lg:text-[20px] mx-auto block hover:scale-105 transition-all mt-4 lg:mt-6'>
                    Get Access now!
                </button>

                <button
                    onClick={activateMembership}
                    className="text-white px-6 lg:px-8 rounded-2xl font-poppins text-sm lg:text-lg mx-auto block hover:scale-105 transition-transform duration-200 ease-in-out mt-4 lg:mt-6 bg-theme py-2"
                >
                    Already a member?{" "}
                    <span className="underline underline-offset-4 transition-all">activate now</span>
                </button>

                <div className='-z-20 absolute bottom-0 lg:fixed p-4 lg:p-6 gap-4 lg:gap-6 left-0 grid grid-cols-2 lg:grid-cols-5 bg-black bg-opacity-70 w-full'>
                    {featuresSelected.map(obj => (
                        <div key={obj.img}>
                            <img src={obj.img} alt="feature" className='w-[70px] lg:w-[80px] 2xl:w-[90px] mx-auto mb-6 lg:mb-10' />
                            <p className='text-white font-semibold font-inter tracking-wider block mx-auto text-center my-1 text-[14px] lg:text-[20px]'>{obj.heading}</p>
                            <p className='text-gray-300 font-thin font-poppins block mx-auto text-center lg:w-3/4 text-[11px] lg:text-[15px]'>{obj.sub_heading}</p>
                        </div>
                    ))}
                </div>

                <div className={`bg-black bg-opacity-40 fixed inset-0 z-20 ${paymentModalVisible ? "" : "hidden"}`} />
                <ContactForm selectedPlan={selectedPlan} />
            </div>

            {iframeUrl && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <button
                            className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded z-50"
                            onClick={() => setIframeUrl(null)}
                        >
                            Close
                        </button>

                        {iframeLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40">
                                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <iframe
                            src={iframeUrl}
                            className="w-full h-full border-0"
                            allowFullScreen
                            title="Membership Payment"
                            onLoad={() => setIframeLoading(false)}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Membership;
