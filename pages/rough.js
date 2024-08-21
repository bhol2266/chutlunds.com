import React from 'react';
import Script from 'next/script';

const MyComponent = () => (
    <>

        <Script
            src="//imasdk.googleapis.com/js/sdkloader/ima3.js"
            onLoad={() => {
                const script = document.createElement("script");
                script.src = "/vastAd2.js";
                document.body.appendChild(script);
            }}
        />


        <div id="mainContainer" className='relative  w-full aspect-video object-contain  group  shadow-2xl'>
            <div id="content">
                <video id="contentElement" className={`w-full h-full cursor-pointer`} onContextMenu={(e) => e.preventDefault()} playsinline muted  width="852" height="480" controls controlsList="nodownload">
                    <source src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4"></source>
                </video>
            </div>
            <div className={`absolute top-0 left-0 `} id="adContainer"></div>

        </div>








        {/* 

        <div id="mainContainer" className={`relative w-full aspect-video object-contain  group  shadow-2xl`}>
            <video className={`w-full h-full cursor-pointer`} id="contentElement" onContextMenu={(e) => e.preventDefault()}    >
                <source src="https://storage.googleapis.com/gvabox/media/samples/stock.mp4" type="video/mp4" />
            </video>
            <div className={`absolute top-0 left-0 `} id="adContainer"></div>
            <button className="hidden" id="playButton">Play</button>


        </div> */}















    </>
);

export default MyComponent;
