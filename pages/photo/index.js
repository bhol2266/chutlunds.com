import {
    ArrowLeftIcon, ArrowRightIcon
} from '@heroicons/react/solid';
import cheerio from 'cheerio';
import extractUrls from "extract-urls";
import { useRouter } from "next/router";
import fetchdata from 'node-fetch';
import { useContext, useEffect } from 'react';
import BannerAds from "../../components/Ads/BannerAds";
import Outstreams from "../../components/Ads/Outstream";
import PicsThumbnail from "../../components/PicsThumbnail";
import videosContext from '../../context/videos/videosContext';
import Link from 'next/link'
import Head from 'next/head'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from '../../firebase'; //Initialize firebase
import InterstitialAds from '../../components/Ads/InterstitialAds';
import PopunderAds_2 from '../../components/Ads/Popunder_2';
import MultiformatAds from '../../components/Ads/MultiFormatAds';

function Pics({ dload_links }) {

    const context = useContext(videosContext);
    const { setdisclaimerShow, } = context;
    const router = useRouter();

    var pageNum = 1

    var nextPageNumber = pageNum + 1;
    var previousPageNumber = pageNum - 1;

    useEffect(() => {

        const oneday_inMilliseconds = 86400000
        const db = getDatabase();
        const dateFromFirebaseDB = ref(db, 'date');
        onValue(dateFromFirebaseDB, (snapshot) => {
            const data = snapshot.val();

            const d = new Date();
            const currentDateMilliseconds = d.getTime()

            if (currentDateMilliseconds < data.date + (oneday_inMilliseconds * 2)) {
                return
            }

            set(ref(db, 'date'), {
                date: currentDateMilliseconds,

            });

            console.log("Deployment Initialized!");
            //For deployment
            fetch('https://api.vercel.com/v1/integrations/deploy/prj_vjP7HMSDpIVLO9XjbcUZUAIYx2qe/w5Adah2dTf')

        });

    }, []);





    const displaypics = dload_links.map(picData => {

        return (
            <PicsThumbnail key={picData.thumbnailUrl} data={picData} />

        )
    })

    return (
        <div className=" ">

            <Head>
                <title>Indian Nude Photos | Desi Scandals - Chutlunds</title>
                <meta name="description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka, Only on Chutlunds." />


            </Head>

            <MultiformatAds />
            <MultiformatAds />


            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6">

                {displaypics}
            </div>

            <MultiformatAds />
            <MultiformatAds />

            <div className="flex items-center justify-center w-fit mx-auto p-1  space-x-3 mt-4 mb-4 ">
                <Link href={`/photo/page/${previousPageNumber}`}>
                    <ArrowLeftIcon className={`${pageNum == 1 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />
                </Link>

                <Link href={`/photo/page/${nextPageNumber}`}>
                    <ArrowRightIcon className={`${pageNum == 60 ? "hidden" : ""}  sm:w-16 w-12 cursor-pointer hover:bg-red-700 bg-red-500 rounded-lg  text-white`} />

                </Link>
            </div>


            <Outstreams />


        </div>
    )
}

export default Pics



export async function getStaticProps(context) {

    var dataObject = []
    const pageNum = '1'


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

    await scrape(`https://hotdesipics.co/main/page/${pageNum}/`)


    return {
        props: {
            dload_links: dataObject,
        }
    }
}

