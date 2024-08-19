import InterstitialAds from '@/components/Ads/InterstitialAds';
import React from 'react';
import Link from 'next/link';

import Script from 'next/script';
import { LoginForm } from '../components/LoginStuffs/LoginForm';
import { SignUpForm } from '../components/LoginStuffs/SignUpForm';
import { SignUpFormOTP } from '../components/LoginStuffs/SignUpFormOTP';

const MyComponent = () => (
    <>

        <InterstitialAds />
    </>
);

export default MyComponent;
