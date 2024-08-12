import cheerio from 'cheerio';
import { useRouter } from "next/router";
import Head from 'next/head';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../components/Pagination';
import Header from '../../../../components/Pornstar_Channels/Header';
import Videos from "../../../../components/Videos";
import { PlusIcon, LinkIcon } from '@heroicons/react/outline';
import { Scrape_Video_Item } from '@/config/Scrape_Video_Item';
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from 'react';
import Link from 'next/link';



function Index({ video_collection, pages, channel_name, channel_link, collageImages, channel_subscriber, channel_by }) {


    const router = useRouter();
    const { code, channelname } = router.query
    const currentPageNumberURL = '1'

    const { user, setUser, setLoginModalVisible } = UserAuth();
    const [isSubscribed, setisSubscribed] = useState(false)



    function clickSubscribe() {
        if (!user) {
            setLoginModalVisible(true)
        }

    }

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>


            <Head>
                <title>{`${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`}</title>
                <meta name="description" content={`Check out the best porn videos and playlists from channel ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}`} />
                <meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, chutlunds" />
                <meta property="og:title" content={`${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`} />
                <meta property="og:description" content={`Check out the best porn videos and playlists from channel ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}`} />
                <meta name="twitter:title" content={`${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`} />
                <meta name="twitter:description" content={`Check out the best porn videos and playlists from channel ${capitalizeFirstLetter(channel_name.replace('+', " ").replace("+", " "))}`} />
                <link rel="canonical" href={`https://chutlunds.com/channels/${code}/${channelname}`} />

            </Head>





            <div>

                <div className="relative h-[240px] sm:h-[290px] md:h-[260px] lg:h-[290px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[370px]">
                    <div className="grid grid-cols-6 md:grid-cols-9 ">
                        {collageImages.map((thumbnail, index) => (
                            <div
                                key={index}
                                className="relative w-full h-auto"
                            >
                                <img
                                    src={thumbnail}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-auto aspect-video object-contain"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute flex top-[30px] sm:top-[100px] md:top-[50px] lg:top-[40px] xl:top-[50px] 2xl:top-[100px] 3xl:top-[120px]  left-[10px] items-b justify-between w-[calc(100%-20px)]">
                        <div>
                            <img
                                className="object-cover w-36 h-36 lg:w-44 lg:h-44 rounded-[15px] border-[1px] border-gray-200"
                                src={`${process.env.CLOUDFLARE_STORAGE}Chutlunds_channels_images/${channel_name.trim().toLowerCase().replace(/ /g, "_").replace(/\+/g, "_")}.jpg`}
                                alt={channel_name}
                                loading="lazy"
                            />
                            <h2 className="text-lg lg:text-xl 2xl:text-2xl font-poppins text-theme my-1 pl-1">
                                {capitalizeFirstLetter(channel_name.replace(/\+/g, " "))}
                            </h2>
                            <p className="text-xs lg:text-sm 2xl:text-md font-poppins text-gray-700 pl-1">
                                Channel by : {channel_by}
                            </p>
                        </div>

                        <div className="mt-auto flex flex-col space-y-4">
                            <Link href={channel_link} rel="nofollow">
                                <div className="cursor-pointer h-fit flex items-center justify-center space-x-2 border-[1px] border-gray-300 text-semiblack px-3 lg:px-5 p-1.5 rounded-[20px] hover:bg-semiblack hover:text-white group">
                                    <LinkIcon className="h-4 lg:h-5 text-semiblack group-hover:text-white" />
                                    <p className="text-sm lg:text-md 2xl:text-lg font-poppins">
                                        Visit
                                    </p>
                                </div>
                            </Link>

                            <div className="cursor-pointer h-fit flex items-center justify-center space-x-2 shadow-md text-white px-3 lg:px-5 p-1.5 bg-red-500 rounded-[20px]">
                                <PlusIcon className="h-4 lg:h-5 text-white" />
                                <p onClick={clickSubscribe} className="text-sm lg:text-md 2xl:text-lg font-poppins">
                                    Subscribe
                                </p>
                                <p className="text-sm lg:text-md 2xl:text-lg font-poppins">
                                    {channel_subscriber}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>




                <Header keyword={channel_name.replace("+", " ")} pageNumber={currentPageNumberURL} code={code} />
                <Videos data={video_collection} type="premium" />
            </div>


            {/* PAGINATION */}
            <Pagination data={{ url: `/channels/${code}/${channelname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />







        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: 'l3',
                    channelname: 'kink+com'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}





export async function getStaticProps(context) {

    const { code, channelname } = context.params;

    var finalDataArray = []
    var pages = []
    var channel_name = ""
    var channel_subscriber = ""
    var channel_by = ""
    var channel_link = ""
    var collageImages = []

    const scrape = async (url) => {



        const response = await fetch(url)
        const body = await response.text();
        const $ = cheerio.load(body)

        finalDataArray = Scrape_Video_Item($)


        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })
        if (tempArray.length !== 0) {
            pages.push('1')
            pages.push(tempArray[tempArray.length - 2])
        }


        channel_link = $('.cta_container a').attr('href');




        $('.channel-info h1').each((i, el) => {
            channel_name = $(el).text().replace("Channel", "")
        })
        $('span em').each((i, el) => {
            channel_subscriber = $(el).text()
        })

        const secondSpan = $('.i span').eq(1);
        channel_by = secondSpan.find("a").text()



        if (finalDataArray.length > 0) {
            const maxImages = Math.min(finalDataArray.length, 18);

            // Add up to 18 images from finalDataArray to collageImages
            for (let index = 0; index < maxImages; index++) {
                const { thumbnail } = finalDataArray[index];
                collageImages.push(thumbnail);
            }

            // If we have less than 18 images, randomly repeat to fill up to 18
            while (collageImages.length < 18) {
                const randomIndex = Math.floor(Math.random() * finalDataArray.length);
                const { thumbnail } = finalDataArray[randomIndex];
                collageImages.push(thumbnail);
            }
        }

    }

    await scrape(`https://spankbang.party/${code}/channel/${channelname}/?o=long`)

    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            channel_name: channel_name,
            channel_subscriber: channel_subscriber,
            channel_by: channel_by,
            channel_link: channel_link,
            collageImages: collageImages,
            channel_image: channelname
        }
    }
}



