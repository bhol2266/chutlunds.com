import { useRouter } from "next/router";
import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import Pagination from '../../../../components/Pagination';
import { scrapeVideos } from '../../../../config/spangbang';


function Category({ video_collection, pages }) {

    const router = useRouter();
    const { searchkey, page } = router.query
    const currentPageNumberURL = page


    return (
        <>
            <Head>
                <title>{`'${searchkey.toUpperCase().replace('+', " ").replace("+", " ")}' Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description"
                    content={`Watch ${searchkey.toUpperCase().replace('+', " ").replace("+", " ")} HD sex video`} />
            </Head>

            <Header keyword={searchkey.replace("+", " ")} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={video_collection} />

            </div>

            <Pagination data={{ url: `/search/${searchkey.toLowerCase().trim()}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

            <RecommendedAds />
        </>
    )
}

export default Category




export async function getServerSideProps(context) {

    const { searchkey, page } = context.query;
    var finalDataArray = []
    var pages = []


    const obj = await scrapeVideos(`https://spankbang.com/s/${searchkey.toLowerCase().trim()}/${page}/?o=all`)
    finalDataArray = obj.finalDataArray
    pages = obj.pages
    console.log(`https://spankbang.com/s/${searchkey.toLowerCase().trim()}/${page}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}