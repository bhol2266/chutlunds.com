import { useRouter } from "next/router";

import Sidebar from '../../../components/Sidebar';
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../components/Pagination';
import { scrapeVideos } from '../../../config/spangbang';



function Category({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }

    const { homepageVideos, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <Head>
    
                <title>{`${capitalizeFirstLetter(homepageVideos)} Porn Videos | Page -${page}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos! - blowjob, japanese, big ass Porn - SpankBang`} />
                <meta name="keywords" content="blowjob, japanese, big ass, deepthroat, jav, asian" />
                <meta property="og:title" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos`} />
                <meta property="og:description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos! - blowjob, japanese, big ass Porn - SpankBang`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos`} />
                <meta name="twitter:description" content={`${capitalizeFirstLetter(homepageVideos)} Porn Videos! - blowjob, japanese, big ass Porn - SpankBang`} />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href={`https://chutlunds.com/${homepageVideos}/page/${page}`} />


            </Head>
            <Header keyword={homepageVideos} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>


            {/* PAGINATION */}
            <Pagination data={{ url: `/${homepageVideos}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />


        </>
    )
}

export default Category

export async function getStaticPaths() {


    return {

        paths: [
            { params: { homepageVideos: 'trending', page: '1' } },
        ],
        fallback: true // false or 'blocking'
    };
}

export async function getStaticProps(context) {



    const { homepageVideos, page } = context.params;
    var finalDataArray = []
    var pages = []



    if (homepageVideos === 'trending') {

        const obj = await scrapeVideos(`https://spankbang.party/trending_videos/${page}/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else if (homepageVideos === 'upcoming') {
        const obj = await scrapeVideos(`https://spankbang.party/upcoming/${page}/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else if (homepageVideos === 'featured') {
        //this will goto channels page from HomepageTitle component
    }
    else if (homepageVideos === 'popular') {
        const obj = await scrapeVideos(`https://spankbang.party/most_popular/${page}/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else if (homepageVideos === 'random') {
        const obj = await scrapeVideos(`https://spankbang.party/trending_videos/${page}/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }
    else {
        const obj = await scrapeVideos(`https://spankbang.party/new_videos/${page}/`)
        finalDataArray = obj.finalDataArray
        pages = obj.pages

    }




    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}

