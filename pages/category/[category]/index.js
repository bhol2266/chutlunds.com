// import cheerio from 'cheerio';
import { useRouter } from "next/router";
// import fetchdata from 'node-fetch';
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import RecommendedAds from '../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Pagination from "../../../components/Pagination";
import { scrapeVideos } from "../../../config/spangbang";



function Category({ video_collection, pages }) {


  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={'red'} />
      </div>
    )
  }

  const { category } = router.query
  const currentPageNumberURL = '1'

  return (
    <>

      <Head>
        <title>{category} sex videos - Free download | Chutlunds</title>
        <meta name="description" content={`${category} sex videos, ${category} porn videos, desi mms, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection.`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <Header keyword={category} pageNumber={currentPageNumberURL} />
      <div className="flex">
        <Sidebar />
        <Videos data={video_collection} />

      </div>



      {/* PAGINATION */}
      <Pagination data={{ url: `/category/${category}`, currentPageNumberURL: currentPageNumberURL, pages: pages, }} />

      <RecommendedAds />
    </>
  )
}

export default Category

export async function getStaticPaths() {


  return {
    paths: [{ params: { category: 'vr' } }],
    fallback: true // false or 'blocking'
  };
}



export async function getStaticProps(context) {



  const { category } = context.params;
  // var data = require(`../../../JsonData/category/${category}.json`)
  // var finalDataArray = data.data
  // var pages = data.pages

  var finalDataArray = []
  var pages = []



  console.log(`https://spankbang.com/s/${category}/?o=all`)
  const obj = await scrapeVideos(`https://spankbang.com/s/${category}/?o=all`)
  finalDataArray = obj.finalDataArray
  pages = obj.pages



  return {
    props: {
      video_collection: finalDataArray,
      pages: pages
    }
  }


}