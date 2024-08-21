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


        <div id="mainContainer" className="relative w-full aspect-video object-contain group shadow-2xl">
            <video className="w-full h-full cursor-pointer" id="contentElement" controls>
                <source src={"https://vdownload-50.sb-cd.com/1/5/15197789-720p.mp4?secure=7V25hWxfw1HXtgPyYGBPUw,1724305104&m=50&d=1&_tid=15197789"} type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full" id="adContainer"></div>
            <button className="hidden" id="playButton">Play</button>
        </div>

    </>
);

export default MyComponent;
