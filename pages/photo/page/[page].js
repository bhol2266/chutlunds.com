import {
    ArrowLeftIcon, ArrowRightIcon
} from '@heroicons/react/solid';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';
import { useContext, useEffect } from 'react';
import Outstreams from "../../../components/Ads/Outstream";
import PicsThumbnail from "../../../components/PicsThumbnail";
import videosContext from '../../../context/videos/videosContext';
import Link from 'next/link'
import Head from 'next/head'
import MultiformatAds from '../../../components/Ads/MultiFormatAds';


function Pics({ dload_links }) {

    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;
    const router = useRouter();
    var { page } = router.query

    var nextPageNumber = +page + 1;
    var previousPageNumber = +page - 1;







    const displaypics = dload_links.map(picData => {

        return (
            <PicsThumbnail key={picData.thumbnailUrl} data={picData} />

        )
    })

    return (
        <div className=" ">

            <Head>
                <title>Indian Nude Photos | Desi Scandals</title>
                <meta name="description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


                <meta property="og:title" content="Indian Nude Photos | Desi Scandals" />
                <meta property="og:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta property="og:url" content={`https://www.desikahaniya.in/photo/${page}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Indian Nude Photos | Desi Scandals" />
                <meta name="twitter:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>

            <MultiformatAds />
            <MultiformatAds />



            <div className="grid grid-cols-2 p-1 sm:grid-cols-1 gap-x-1  md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-4 ">

                {displaypics}
            </div>

            <div className="flex items-center justify-center w-fit mx-auto p-1  space-x-3 mt-4 mb-4 ">
                <Link href={`/photo/page/${previousPageNumber}`}>
                    <ArrowLeftIcon className={`${page == 1 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />
                </Link>

                <Link href={`/photo/page/${nextPageNumber}`}>
                    <ArrowRightIcon className={`${page == 60 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />
                </Link>
            </div>


            <Outstreams />
            <MultiformatAds />
            <MultiformatAds />


        </div>
    )
}

export default Pics


export async function getStaticPaths() {
    var arrayPaths = []
    for (let index = 1; index <= 50; index++) {
        arrayPaths.push({ params: { page: index.toString() } })
    }
    return {

        paths: arrayPaths,
        fallback: false // false or 'blocking'
    };
}

export async function getStaticProps(context) {

    const { page } = context.params;


    var dataObject = []
    const scrape = async (url) => {

        var thumbnailArray = []
        var TitleArray = []
        var DateArray = []
        var errorIndex = []
        var FullalbumLink = []

        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)



        $('.entry-thumbnail img').each((i, el) => {

            const links = $(el).attr("data-lazy-srcset")
            try {
                let urls = extractUrls(links);
                thumbnailArray.push(urls[0].trim())
            } catch (error) {
                errorIndex.push(i)
            }

        })


        $('.entry-title a').each((i, el) => {

            TitleArray.push($(el).text().trim());
        })

        $('.entry-date').each((i, el) => {

            DateArray.push($(el).text().trim())

        })
        $('.entry-thumbnail').each((i, el) => {

            FullalbumLink.push($(el).attr('href'))

        })



        if (errorIndex.length > 0) {
            for (let index = 0; index < errorIndex.length; index++) {

                delete TitleArray[errorIndex[index]]
                delete DateArray[errorIndex[index]]
                delete FullalbumLink[errorIndex[index]]

            }
        }


        TitleArray = TitleArray.filter(function (element) {
            return element !== undefined;
        });
        DateArray = DateArray.filter(function (element) {
            return element !== undefined;
        });
        FullalbumLink = FullalbumLink.filter(function (element) {
            return element !== undefined;
        });


        for (let index = 0; index < thumbnailArray.length; index++) {
            dataObject.push({
                thumbnailUrl: thumbnailArray[index],
                title: TitleArray[index],
                dataAdded: DateArray[index],
                nextLink: FullalbumLink[index],
            })
        }



    }


    await scrape(`https://hotdesipics.co/main/page/${page}/`)
    // console.log(`https://hotdesipics.co/main/page/${page}/`);


    return {
        props: {
            dload_links: dataObject,
        }
    }
}

