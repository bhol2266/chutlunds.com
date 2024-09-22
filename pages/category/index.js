import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import jsonData from "../../JsonData/categoryImages/data.json";

import Head from 'next/head';
import PopunderAds from '../../components/Ads/Popunder';



function Index() {

    const router = useRouter();

    useEffect(() => {
        let index = 0

        async function downloadImage(url, name) {
            await fetch(url, {
                method: "GET",
                headers: {}
            })
                .then(response => {
                    response.arrayBuffer().then(function (buffer) {
                        const url = window.URL.createObjectURL(new Blob([buffer]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", name); //or any other extension
                        document.body.appendChild(link);
                        link.click();


                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }


        // const myInterval = setInterval(() => {
        //     console.log(index);
        //     downloadImage(jsonData[index].url, jsonData[index].name)
        //     if (index === jsonData.length - 1) {
        //         clearInterval(myInterval);
        //     }
        //     index = index + 1
        // }, 1000);

    }, []);




    return (

        <div className="basicMargin">
            <Head>
                <title>Chutlunds Categories: Find Your Favorite Free Hardcore Porn Videos</title>
                <meta name="description" content="  Collections of free Japanese videos, Hentai porn videos, Russian porn videos, Chinese, Asian sex videos, Korean porn video and lot more" />


                <meta name="keywords" content="blowjob, japanese, big ass, deepthroat, jav, asian" />
                <meta property="og:title" content="Chutlunds Categories: Find Your Favorite Free Hardcore Porn Videos" />
                <meta property="og:description" content="  Collections of free Japanese videos, Hentai porn videos, Russian porn videos, Chinese, Asian sex videos, Korean porn video and lot more" />
                <meta name="twitter:title" content="Chutlunds Categories: Find Your Favorite Free Hardcore Porn Videos" />
                <meta name="twitter:description" content=" Collections of free Japanese videos, Hentai porn videos, Russian porn videos, Chinese, Asian sex videos, Korean porn video and lot more" />
                <link rel="canonical" href={`https://www.chutlunds.com/category`} />




            </Head>


            <div className='flex items-center py-2 my-1 justify-between  rounded-lg'>
                <span className='text-center lg:text-left  flex-grow text-3xl font-Dmsans'>Top Porn Categories</span>
            </div>
            <h1 className="text-center lg:text-left text-sm md:text-lg  pb-2 my-1 font-inter">
                Explore a Variety of Free Videos: Japanese, Hentai, Russian, Chinese, Asian, Korean Porn, and More
            </h1>


            <PopunderAds />

            <div className={`grid grid-cols-3 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-4 lg:grid-cols-5`}>
                {jsonData.map(category => {
                    return (
                        <Link key={category.name} href={`/category/${category.name.toLowerCase().trim().substring(0, category.name.indexOf('.png'))}`}>
                            <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                <img
                                    className='object-cover w-full'
                                    alt={category.name}
                                    src={`${process.env.CLOUDFLARE_STORAGE}category_images/${category.name}`}
                                    loading="lazy"
                                ></img>
                                <h2 className='font-inter rounded-b absolute text-sm sm:text-lg px-1 bottom-0 w-full text-center z-10 text-white bg-black bg-opacity-50'>
                                    {category.name.charAt(0).toUpperCase() + category.name.substring(0, category.name.indexOf('.png')).substring(1)}
                                </h2>
                            </div>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>

        </div>
    )
}


export default Index


