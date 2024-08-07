import { useState, useEffect } from 'react';
import Flag from 'react-world-flags';

export default function Banner_for_chutlund2() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const currentDomain = window.location.hostname;
    if (currentDomain === 'chutlunds2.com') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gray-800 m-2 text-white p-4 flex justify-between items-center ">
      <span className='flex-1 text-left md:text-center text-sm md:text-md'>
        If this website is blocked in your country (
        <Flag code="CN" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        <Flag code="RU" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        <Flag code="TR" style={{ width: '20px', height: '14px' }} className="inline-block mx-1" />
        ) go to our alternate website   
        <a href="https://chutlunds2.com" className="underline text-yellow-500 font-inter">Chutlunds2.com</a>
      </span>

      <button onClick={() => setIsVisible(false)} className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
