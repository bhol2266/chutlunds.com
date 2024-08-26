import Script from "next/script";

function PopunderAds() {

    let currentHost;
    if (typeof window !== "undefined") {
        currentHost = window.location.host;
    }

    return (
        <div className="flex items-center justify-center">

            <Script
                type="text/javascript"
                src="//cdn.tsyndicate.com/sdk/v1/p.js"
                data-ts-spot="637f41ccc95a46769276024b3fe07174"
                data-ts-extid="{extid}"
                data-ts-session-duration="300"
                data-ts-count="5"
                data-ts-mode="selective"
                data-ts-ignore-filter="block_popunder"
                async
                defer
            />

            {/* exolickPopunder */}


            {/* <Script id="ad-config" type="application/javascript" strategy="beforeInteractive">
                {`
                       var ad_idzone = "5391286";
                       var ad_popup_fallback = false;
                       var ad_popup_force = false;
                       var ad_chrome_enabled = true;
                       var ad_new_tab = false;
                       var ad_frequency_period = 1;
                       var ad_frequency_count = 3;
                       var ad_trigger_method = 3;
                       var ad_trigger_delay = 0;
                       var ad_capping_enabled = true;
               `}
            </Script>
            <Script src="https://a.pemsrv.com/popunder1000.js" strategy="beforeInteractive" /> */}




            {/* exolickPopunder with bypass adblock*/}
{/* 
            <Script
                src="/PopunderCode.js"
                strategy="beforeInteractive"
            /> */}


        </div >
    )
}

export default PopunderAds;
