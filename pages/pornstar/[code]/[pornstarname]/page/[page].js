import cheerio from 'cheerio';
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../../components/Pagination';
import Header from '../../../../../components/Pornstar_Channels/Header';
import Videos from "../../../../../components/Videos";
import { Scrape_Video_Item_Pornstar } from '../../../../../config/Scrape_Video_Item';
import pornstarNameList from "../../../../../JsonData/pornstarlist/alldata.json";
import { PlusIcon } from '@heroicons/react/outline';



function Index({ video_collection, pages, pornstarInformation, collageImages }) {


    const router = useRouter();
    const { code, pornstarname, page } = router.query
    const currentPageNumberURL = page
    const [imageURL, setimage] = useState('');


    useEffect(() => {
        // Assuming pornstarNameList is available
        pornstarNameList.filter(pornstar => {
            if (pornstarname.toLowerCase() === pornstar.Name.toLowerCase().replace(/ /g, "+")) {
                setimage(pornstar.thumbnail);
            }
        });
    }, [pornstarname]);


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

    function clickSubscribe() {
        if (!user) {
            setLoginModalVisible(true)
        }
    }

    return (
        <>

            <Head>
                <title>{`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />


                <meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, chutlunds" />
                <meta property="og:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`} />
                <meta property="og:description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
                <meta name="twitter:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`} />
                <meta name="twitter:description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
                <link rel="canonical" href={`https://chutlunds.com/pornstar/${code}/${pornstarname}/page/${page}`} />





            </Head>


            <div>

                <div className="relative h-[240px] sm:h-[310px] md:h-[260px] lg:h-[290px] xl:h-[300px] 2xl:h-[350px] 3xl:h-[370px]">
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

                    <div className=" absolute flex top-[30px] sm:top-[100px] md:top-[50px] lg:top-[40px] xl:top-[50px] 2xl:top-[100px] 3xl:top-[120px] left-[10px]  w-[calc(100%-20px)]">
                        <div className=''>
                            <img
                                className="object-cover w-36 h-36 lg:w-44 lg:h-44 rounded-[15px] border-[1px] border-gray-200"
                                src={imageURL}
                                alt={pornstarname}
                                loading="lazy"
                            />
                            <h2 className="text-lg lg:text-xl 2xl:text-2xl font-poppins text-theme my-1 pl-1">
                                {capitalizeFirstLetter(pornstarname.replace(/\+/g, " "))}
                            </h2>

                            <div className="w-36 lg:w-44 mt-auto cursor-pointer h-fit flex items-center justify-center space-x-2 shadow-md text-white  p-1.5 bg-red-500 rounded-[20px]">
                                <PlusIcon className="h-4 lg:h-5 text-white" />
                                <p onClick={clickSubscribe} className="text-xs lg:text-sm   font-poppins">
                                    {pornstarInformation.subscribe}
                                </p>
                            </div>
                        </div>


                        <div className="font-inter flex-1 flex flex-wrap  mt-auto mb-6 ml-2 sm:ml-4 sm:mb-[40px] md:mb-0 text-xs md:text-sm md:space-x-4  space-x-1">
                            <span className={`p-0.5 font-light ${pornstarInformation.views ? '' : 'hidden'}`}>
                                Views: <span className="font-semibold">{pornstarInformation.views}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.videos ? '' : 'hidden'}`}>
                                Videos: <span className="font-semibold">{pornstarInformation.videos}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.age ? '' : 'hidden'}`}>
                                Age: <span className="font-semibold">{pornstarInformation.age}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.from ? '' : 'hidden'}`}>
                                From: <span className="font-semibold">{pornstarInformation.from}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.ethnicity ? '' : 'hidden'}`}>
                                Ethnicity: <span className="font-semibold">{pornstarInformation.ethnicity}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.hairColor ? '' : 'hidden'}`}>
                                Hair Color: <span className="font-semibold">{pornstarInformation.hairColor}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.height ? '' : 'hidden'}`}>
                                Height: <span className="font-semibold">{pornstarInformation.height}</span>
                            </span>
                            <span className={`p-0.5 font-light ${pornstarInformation.weight ? '' : 'hidden'}`}>
                                Weight: <span className="font-semibold">{pornstarInformation.weight}</span>
                            </span>
                        </div>


                    </div>

                </div>




                <Header keyword={pornstarname.replace("+", " ")} pageNumber={currentPageNumberURL} code={code} />
                <Videos data={video_collection} />
            </div>

            <Pagination data={{ url: `/pornstar/${code}/${pornstarname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />



        </>
    )
}

export default Index


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: '24y',
                    pornstarname: 'mercedes+ashley',
                    page: '1'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}



export async function getStaticProps(context) {



    const { code, pornstarname, page } = context.params;

    var finalDataArray = []
    var pages = []

    var pornstarInformation = {
        title: '',
        subscribe: '',
        views: '',
        videos: '',
        age: '',
        from: '',
        ethnicity: '',
        hairColor: '',
        height: '',
        weight: ''
    };
    var collageImages = []


    const scrape = async (url) => {



        const response = await fetch(url)
        const body = await response.text();
        const $ = cheerio.load(body)

        finalDataArray = Scrape_Video_Item_Pornstar($)



        let tempArray = []
        $('.pagination ul li').each((i, el) => {
            const data = $(el).text()
            tempArray.push(data)

        })
        if (tempArray.length !== 0) {
            pages.push('1')
            pages.push(tempArray[tempArray.length - 2])
        }


        // Extract pornstarInformation
        pornstarInformation.title = $('h1').text().trim().replace(/\n/g, ' ').replace("Similar pornstarsSimilar pornstars", "").trim();

        pornstarInformation.subscribe = $('button').text().trim().replace(/\n/g, ' ').replace("Send messageResend verification link", "").trim();
        const spans = $('div.relative.pr-6 div').find('span');

        // Create an object to store the pornstarInformation


        // Iterate over spans and assign values
        spans.each((i, el) => {
            const text = $(el).text().trim();
            if (text.startsWith('Views:')) {
                pornstarInformation.views = text.replace('Views: ', '');
            } else if (text.startsWith('Videos:')) {
                pornstarInformation.videos = text.replace('Videos: ', '');
            } else if (text.startsWith('Age:')) {
                pornstarInformation.age = text.replace('Age: ', '');
            } else if (text.startsWith('From:')) {
                pornstarInformation.from = text.replace('From: ', '');
            } else if (text.startsWith('Ethnicity:')) {
                pornstarInformation.ethnicity = text.replace('Ethnicity: ', '');
            } else if (text.startsWith('Hair color:')) {
                pornstarInformation.hairColor = text.replace('Hair color: ', '');
            } else if (text.startsWith('Height:')) {
                pornstarInformation.height = text.replace('Height: ', '');
            } else if (text.startsWith('Weight:')) {
                pornstarInformation.weight = text.replace('Weight: ', '');
            }
        });

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


    await scrape(`https://spankbang.party/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)



    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            pornstarInformation: pornstarInformation,
            collageImages: collageImages,
        }
    }


}

