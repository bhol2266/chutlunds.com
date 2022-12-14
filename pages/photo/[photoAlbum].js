import cheerio from 'cheerio';
import Head from 'next/head';
import { useRouter } from 'next/router';
import fetchdata from 'node-fetch';
import React, { useState } from 'react';
import PicsThumbnail from '../../components/PicsThumbnail';
import { BeatLoader } from 'react-spinners';
import Outstreams from '../../components/Ads/Outstream';
import PopunderAds_2 from '../../components/Ads/Popunder_2';
import InterstitialAds from '../../components/Ads/InterstitialAds';
import MultiformatAds from '../../components/Ads/MultiFormatAds';


function Album({ dload_links, relatedAlbums }) {


    const [showBigImage, setshowBigImage] = useState(false)
    const [BigImageURL, setBigImageURL] = useState('')

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'auto' }); };





    const { photoAlbum } = router.query;

    var title;
    if (photoAlbum) {
        try {

            title = photoAlbum.trim().replaceAll("-", " ")
        } catch (error) {

        }
    }

    const relatedPics = relatedAlbums.map(picData => {

        return (
            <PicsThumbnail key={picData.thumbnailUrl} data={picData} />

        )
    })


    const displaypics = dload_links.map((picData, index) => {

        return (
            <>

                <div key={picData} className={` mb-2 animate-fade flex   flex-col justify-center  cursor-pointer  shadow-md  border-2 rounded-lg overflow-hidden	 md:hover:scale-105 transform transition duration-150 bg-white`}>
                    <a target="_self" href={picData}>
                        <img
                            loading="lazy"
                            alt={"loading"}
                            src={picData}
                            height={1080}
                            width={1920}
                        ></img>
                    </a>
                </div>




            </>
        )
    })


    return (

        <div className=" ">
            <Head>
                <title>{photoAlbum.replace(/-/g, " ")}- Chutlunds</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta name="description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


                <meta property="og:title" content={photoAlbum.replace(/-/g, " ")} />
                <meta property="og:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta property="og:url" content={`https://www.desikahaniya.in/photo/${photoAlbum}`} />
                <meta property="og:site_name" content="Free Hindi Sex Stories" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={photoAlbum.replace(/-/g, " ")} />
                <meta name="twitter:description"
                    content="Yaha par aap enjoy kar sakte ho Indian girls ki nude aur sex photos alag alag category mein. Hot Girl ke nude selfies ya phir chudai ka xxx photos wives ka." />
                <meta name="twitter:label1" content="पोस्ट" />
                <meta name="twitter:data1" content="85" />
            </Head>

            <MultiformatAds />
            <MultiformatAds />

            <div className='flex flex-col'>


                <h1 className={` font-semibold text-md sm:text-lg md:text-2xl text-center p-1 mx-4 font-inter`}>{title}</h1>

                <div className={`${!showBigImage ? "" : "hidden"} grid grid-cols-2  gap-2 md:gap-3 lg:gap-4  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}>

                    {displaypics}

                </div>
                <div onClick={() => { setshowBigImage(false) }} className={`${showBigImage ? "" : "hidden"}`}>
                    <img
                        className={`object-contain h-4/5 mx-auto`}
                        loading="lazy"
                        alt={"loading"}
                        src={BigImageURL}
                    ></img>
                </div>


                <div className={`${!showBigImage ? "" : "hidden"}`}>
                    <h2 className='m-1 text-xl shadow-lg bg-red-500 text-white font-poppins text-center mt-6 rounded'>Related Photos</h2>
                    <div className={` grid grid-cols-2 p-1 sm:grid-cols-1 gap-x-1  md:grid-cols-3 lg:grid-cols-4 space-x-2 space-y-4`}>
                        {relatedPics}
                    </div>
                </div>

            </div>


            <Outstreams />
            <InterstitialAds />
            <MultiformatAds />
            <MultiformatAds />


        </div>
    )
}


export default Album

export async function getStaticPaths() {

    var pathsArray = []
    for (let index = 1; index <= 5; index++) {

        var pics = require(`../../JsonData/pics/page${index}.json`)
        pics.map(pic => {
            pathsArray.push({ params: { photoAlbum: pic.substring(pic.indexOf(".co/") + 4, pic.length - 1) } }
            )
        })

    }
    return {
        paths: pathsArray,
        fallback: true // false or 'blocking'
    };
}










export async function getStaticProps(context) {

    const { photoAlbum } = context.params;
    var dataArray = []

    var dataObject = []




    async function scrape() {

        const response = await fetchdata(`https://hotdesipics.co/${photoAlbum}`)
        const body = await response.text();

        const $ = cheerio.load(body)
        scrape2(body)


        $('.entry-content img').each(async (i, el) => {
            const links = $(el).attr("data-lazy-src")
            dataArray.push(links);

        })
    }



    const scrape2 = async (body) => {

        var thumbnailArray = []
        var TitleArray = []
        var DateArray = []
        var errorIndex = []
        var FullalbumLink = []

        const $ = cheerio.load(body)

        $('.entry-thumbnail img').each((i, el) => {

            const links = $(el).attr("data-lazy-src")
            thumbnailArray.push(links)

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

    await scrape()

    return {
        props: {
            dload_links: dataArray,
            relatedAlbums: dataObject
        }
    }
}


