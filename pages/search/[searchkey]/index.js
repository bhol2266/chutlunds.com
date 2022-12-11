import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import RecommendedAds from '../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import Pagination from '../../../components/Pagination';
import { useEffect } from 'react';
import { getCookie, setCookie } from "cookies-next";
import { scrapeVideos } from '../../../config/spangbang';


function Category({ video_collection, pages }) {

  const router = useRouter();
  const { searchkey } = router.query
  const currentPageNumberURL = '1'

  async function updateKeywords_DB() {
    if (video_collection.length !== 0 && typeof getCookie('email') !== 'undefined') {

      const parcelData = { searchKey: searchkey.trim(), email: getCookie('email') }
      const rawResponse = await fetch(`${process.env.FRONTEND_URL}api/login/updatekeywords`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(parcelData),
      });

      const res = await rawResponse.json();
      console.log(res);
      if (res.sucess) {
        var json_str = JSON.stringify(res.data.keywords);
        setCookie('keywords', json_str, { maxAge: 900000 });
      }

    } else {
      const keywordsCookie = getCookie('keywords')
      if (typeof keywordsCookie !== 'undefined') {
        const parsedArray = JSON.parse(keywordsCookie)
        let newArray = []
        newArray.push(searchkey)
        parsedArray.forEach(key => {
          if (key !== searchkey) {
            newArray.push(key)
          }
        })
        setCookie('keywords', JSON.stringify(newArray), { maxAge: 900000 });

      } else {
        if (video_collection.length !== 0) {
          var json_str = JSON.stringify([searchkey]);
          setCookie('keywords', json_str, { maxAge: 900000 });
        }
      }
    }
  }

  useEffect(() => {
    updateKeywords_DB();
  }, []);


  return (
    <>


      <Head>
        <title>{`'${searchkey.toUpperCase().replace('+', " ").replace("+", " ")}' Porn Videos - Chutlunds`}</title>
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

  const { searchkey } = context.query;
  var finalDataArray = []
  var pages = []


  const obj = await scrapeVideos(`https://spankbang.com/s/${searchkey.toLowerCase().trim()}/?o=all`)
  finalDataArray = obj.finalDataArray
  pages = obj.pages
  console.log(`https://spankbang.com/s/${searchkey.toLowerCase().trim()}/?o=all`)


  return {
    props: {
      video_collection: finalDataArray,
      pages: pages
    }
  }


}