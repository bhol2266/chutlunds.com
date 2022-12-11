import { useRouter } from "next/router";
import Sidebar from '../../../../../components/Sidebar';
import Videos from "../../../../../components/Videos";
import Header from '../../../../../components/Pornstar/Header'
import RecommendedAds from '../../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import Pagination from '../../../../../components/Pagination';
import { scrapeVideos } from '../../../../../config/spangbang';
import InterstitialAds from "../../../../../components/Ads/InterstitialAds";




function Index({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'red'} />
            </div>
        )
    }

    const { code, pornstarname, page } = router.query
    const currentPageNumberURL = page


    return (
        <>

            <Head>
                <title>{`${pornstarname.toUpperCase().replace('+', " ").replace("+", " ")} Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description"
                    content={`Watch ${pornstarname.toUpperCase().replace('+', " ").replace("+", " ")} HD sex video`} />
            </Head>

            <InterstitialAds />

            <Header keyword={pornstarname.replace('+', ' ')} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

            <Pagination data={{ url: `/pornstar/${code}/${pornstarname}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />



            <RecommendedAds />
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

    const obj = await scrapeVideos(`https://spankbang.com/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    pages[0] = page;

    console.log(`https://spankbang.com/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}