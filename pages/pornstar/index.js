import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import pornstarNameList from '../../JsonData/pornstarlist/AllpornstarNames.json'
import {
    SearchIcon
} from '@heroicons/react/solid';
import PopunderAds from '../../components/Ads/Popunder';
import pornstarNameList from '../../JsonData/pornstarlist/alldata.json';

function Index({ trendingModels }) {

    //Scroll to top
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };


    const router = useRouter();
    var pornstarlist = require(`../../JsonData/pornstarlist/page1.json`)



    const [data, setdata] = useState(pornstarlist)
    const [page, setpage] = useState(1)

    const [suggestedData, setsuggestedData] = useState([])


    const fetchMoreData = () => {

        setpage(page + 1)
        var json = require(`../../JsonData/pornstarlist/page${page}.json`)
        setdata(data.concat(json));

    }




    const onChangeHandler = (key) => {

        // var ARRAY = []
        // for (let index = 1; index < 109; index++) {
        //     var json = require(`../../JsonData/pornstarlist/page${index}.json`)
        //     json.map(val => {
        //         ARRAY.push({
        //             Name: val.Name,
        //             thumbnail: val.thumbnail,
        //         })
        //     })
        // }
        // console.log(JSON.stringify(ARRAY));


        if (key.length === 0) {
            setsuggestedData([])

        }
        if (key.length > 1) {

            var array = []
            pornstarNameList.filter(name => {
                if (name.Name.toLowerCase().includes(key.trim().toLowerCase())) {
                    array.push(name)
                }
            })
            if (array) {
                if (array.length > 10) {
                    setsuggestedData(array.slice(0, 9))
                }
                else {
                    setsuggestedData(array)
                }
            }
        }

    }




    return (

        <div className="basicMargin mt-2">
            <Head>
                <title>Top Pornstars and Models In Full-Length Free Sex Videos | Chutlunds</title>
                <meta name="description" content="Catch the most popular PORNSTARS and MODELS, right here on the biggest FREE PORN tube. Chutlunds.com has a bevy of luscious babes that are naked for you 24/7!" />

                <meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, chutlunds" />
                <meta property="og:title" content="Top Pornstars and Models In Full-Length Free Sex Videos | Chutlunds" />
                <meta property="og:description" content="Catch the most popular PORNSTARS and MODELS, right here on the biggest FREE PORN tube. Chutlunds.com has a bevy of luscious babes that are naked for you 24/7!" />
                <meta name="twitter:title" content="Top Pornstars and Models In Full-Length Free Sex Videos | Chutlunds" />
                <meta name="twitter:description" content="Catch the most popular PORNSTARS and MODELS, right here on the biggest FREE PORN tube. Chutlunds.com has a bevy of luscious babes that are naked for you 24/7!" />
                <link rel="canonical" href={`https://www.chutlunds.com/pornstar`} />

            </Head>



            {/* <div className=' items-center p-2 my-1 justify-between bg-gray-100 rounded-lg shadow-lg'>
                <h1 className='flex-grow text-lg'>Porn Categories

                </h1>

            </div> */}

            <PopunderAds />




            <div className={` mt-4  transition ease-in-out delay-150 `}>
                <div className='flex my-1  md:w-3/5 md:mx-auto p-2 px-3  border-[1px] border-gray-200 space-x-2 md:space-x-4 xl:px-[50px] rounded-[15px]'  >
                    <SearchIcon className='h-6 w-6 text-gray-400' />
                    <input className='focus:outline-none flex-grow  font-inter rounded-lg ' type='text' onChange={(event) => { onChangeHandler(event.target.value) }} placeholder='Search pornstar...'></input>
                </div>
            </div>



            <div className='mt-1  grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6'>
                {suggestedData.length != 0 && suggestedData.map(pornstar => {
                    const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                    return (

                        <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <div className='  relative hover:scale-105 transform transition duration-150 ' >
                                <img
                                    className={`object-cover w-full rounded-lg  `}
                                    src={pornstar.thumbnail}
                                    alt={pornstar.Name}
                                    loading='lazy'
                                ></img>

                                <h2 className='rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-black bg-opacity-50'>{pornstar.Name}</h2>

                                {/* 
                                    <div className='p-0.5 lg:p-1 md:space-y-1 items-center text-sm md:text-lg absolute bottom-0 bg-transparent bg-black bg-opacity-50 text-white right-0 left-0' >
                                        <h2 className='font-semibold ml-0.5 lg:ml-2  lg:text-[22px]' > {pornstar.Name}</h2>
                                        <div className='flex flex-row items-center justify-start '>
                                            <EyeIcon className='h-5 text-blue-600' />
                                            <h2 className='ml-0.5 text-xs lg:text-[16px]' > {pornstar.views}</h2>
                                        </div>
                                        <div className='flex flex-row items-center justify-start '>
                                            <FilmIcon className='h-5 text-red-600' />
                                            <h2 className='ml-0.5 text-xs lg:text-[16px]' > {pornstar.numberofVideos}</h2>
                                        </div>
                                    </div> */}
                            </div>
                        </Link>
                    )
                })}
            </div>


            <h1 className=' mt-6  ml-1 2xl:my-3 text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium w-fit border-b-[3px] border-[#FFBB00]'>Trending Pornstars</h1>

            <div className='mt-1  grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6'>
                {trendingModels.map(pornstar => {
                    const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                    return (

                        <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                            <div className='  relative hover:scale-105 transform transition duration-150 ' >
                                <img
                                    className={`object-cover w-full rounded-lg  `}
                                    src={pornstar.thumbnail}
                                    alt={pornstar.Name}
                                    loading='lazy'
                                ></img>

                                <h2 className='rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-black bg-opacity-50'>{pornstar.Name}</h2>


                            </div>
                        </Link>
                    )
                })}
            </div>


            <h1 className=' mt-6  ml-1 2xl:my-3 text-left lg:text-left  flex-grow text-2xl lg:text-3xl font-Dmsans text-theme font-poppins font-medium w-fit border-b-[3px] border-[#FFBB00] my-2'>🔥Hottest Pornstars</h1>


            {suggestedData.length == 0 &&
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={data.length !== 6500}

                >
                    <div className={`grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6 `}>
                        {data.map(pornstar => {

                            const posrnstar_Code = pornstar.href.substring(1, pornstar.href.indexOf('/pornstar'))
                            return (
                                <Link key={pornstar.Name} href={`/pornstar/${posrnstar_Code}/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                                    <div className='  relative hover:scale-105 transform transition duration-150 ' >
                                        <img
                                            className={`object-cover w-full rounded-lg  `}
                                            src={pornstar.thumbnail}
                                            alt={pornstar.Name}
                                            loading='lazy'
                                        ></img>

                                        <h2 className='rounded-b-lg absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-black bg-opacity-50'>{pornstar.Name}</h2>
                                    </div>
                                </Link>
                                // items[i].charAt(0).toUpperCase() + items[i].substring(1);
                            )
                        })}


                    </div>

                </InfiniteScroll>
            }



        </div>
    )
}


export default Index


export async function getStaticProps() {


    const res = await fetch(`${process.env.BACKEND_URL}getTrendingPornstars`, {
        method: "POST",
    });
    const data = await res.json();

    return {
        props: {
            trendingModels: data,
        }
    }

}






