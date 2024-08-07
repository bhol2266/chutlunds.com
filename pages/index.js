import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from "cookies-next";
import ReactCountryFlag from "react-country-flag";

import BannerAds from '../components/Ads/BannerAds';
import Outstreams from '../components/Ads/Outstream';
import Sidebar from '../components/Sidebar';
import Videos from '../components/Videos';
import Pornstar_slider from '../components/pornstar_slider';
import Channels_slider from '../components/channels_slider';
import Category_slider from '../components/category_slider';

import { getLanguge } from '../config/getLanguge';
import { setViewTypeCookie } from '../config/utils';
import { updateCountry } from '../config/firebase/lib';

import videosContext from '../context/videos/videosContext';

export default function Home({ video_collection, trendingChannels, tags, trendingCategories, trendingPornstars }) {
  const { currentLocation, setcurrentLocation, viewType, setViewType } = useContext(videosContext);
  const [clientViewType, setClientViewType] = useState(null);
  const [countryVideos, setcountryVideos] = useState([]);
  const [countryLanguage, setcountryLanguage] = useState('');
  const [lang, setLang] = useState('');

  const router = useRouter();

  async function fetchVideos(data) {
    setLang(getLanguge(data.countryName));
    setcountryLanguage(lang);

    let url = `https://spankbang.party/s/${lang.toLowerCase().trim()}/?o=trending`;

    const rawResponse = await fetch('/api/spangbang/getvideos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const content = await rawResponse.json();
    setcountryVideos(shuffle(content.finalDataArray));
  }

  async function fetchLocation() {
    const location_localstorage = localStorage.getItem("location");
    if (location_localstorage !== null) {
      const parsedLocation = JSON.parse(location_localstorage);
      setcurrentLocation(parsedLocation);
      countryUpdated_DB(parsedLocation.countryName);
      await fetchVideos(parsedLocation);
    } else {
      try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        const data = await response.json();
        setcurrentLocation(data);
        await fetchVideos(data);
        await countryUpdated_DB(data.countryName);
        localStorage.setItem("location", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function countryUpdated_DB(country) {
    const countryUpdated_DB = getCookie('countryUpdated_DB');
    const email = getCookie('email');
    const accountType = getCookie('account');
    if (typeof countryUpdated_DB !== 'undefined' && typeof email !== 'undefined' && accountType !== 'credential') {
      if (countryUpdated_DB) {
        return;
      }
      await updateCountry(email.trim(), country);
    }
  }

  useEffect(() => {
    let videoRoute = getCookie("videoRoute");
    if (typeof videoRoute !== 'undefined') {
      deleteCookie('videoRoute');
      router.push(videoRoute);
    }
    fetchLocation();
  }, []);

  useEffect(() => {
    setClientViewType(viewType);
  }, [viewType]);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const toggleViewType = () => {
    const newViewType = viewType === 'grid' ? 'horizontal' : 'grid';
    setViewTypeCookie(newViewType);
    setViewType(newViewType);
  };

  return (
    <div className=" ">
      <Head>
        <title>Chutlunds: Free Porn Videos and 4K Sex Movies</title>
        <meta name="description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
        <meta property="og:title" content="Chutlunds: Free Porn Videos and 4K Sex Movies" />
        <meta property="og:description" content="Chutlunds is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Chutlunds!" />
        <link rel="canonical" href={`https://chutlunds.com/`} />

      </Head>

      <div className='flex justify-between items-center my-4 md:hidden'>
        <span className='text-[20px]  font-semibold  font-inter'>Trending Channels</span>
        <img
          className='h-[20px] w-[20px] cursor-pointer sm:hidden'
          src={clientViewType === 'horizontal' ? './grid.png' : './horizontal.png'}
          onClick={toggleViewType}
          alt="Toggle View"
        />
      </div>
      <Channels_slider trendingChannels={trendingChannels} />

      <div className="w-full overflow-x-auto whitespace-nowrap py-2  scrollbar-hide md:hidden select-none">
        {tags.map((tag, index) => (
          <a key={tag.tag} href={`/search/${tag.tag.trim()}`} className="bg-[#DDE0E9] text-semiblack px-3 py-1.5 rounded-lg m-1 inline-block text-sm font-medium">
            {tag.tag}
          </a>
        ))}
      </div>

      <main className="flex-row flex  mt-1 md:mt-3 md:space-x-3 space-x-2">
        <Sidebar />
        <div className='w-full overflow-hidden'>
          <BannerAds />
          <Outstreams />
          <h1 className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">Trending Free Porn Videos</h1>
          <Videos data={video_collection[0].finalDataArray} />
          <a href={`/trending`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Trending Videos" />
          </a>

          {countryVideos.length !== 0 && (
            <>
              <div className="flex items-center space-x-2 items-center">
                <span className="lg:text-2xl text-lg font-semibold text-gray-800 pb-2 font-inter mt-3">
                  {`Popular Porn Videos in ${currentLocation.countryCode}`}
                </span>
                <ReactCountryFlag
                  svg
                  countryCode={currentLocation.countryCode}
                  style={{
                    fontSize: '25px',
                    lineHeight: '25px',
                  }}
                  aria-label={currentLocation.countryCode}
                />
              </div>
              <Videos data={shuffle(countryVideos).slice(0, 12)} />
              <a href={`/search/${lang.toLowerCase().trim()}`}>
                <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-6 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Popular Porn Videos" />
              </a>
            </>
          )}

          <span className='text-[20px] md:hidden font-semibold m-y4 font-inter'>Trending Pornstars</span>
          <Pornstar_slider trendingPornstars={trendingPornstars} />

          <span className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">Upcoming</span>
          <Videos data={video_collection[1].finalDataArray} />
          <a href={`/upcoming`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Upcoming Videos" />
          </a>

          <span className='text-[20px] md:hidden font-semibold my-4 font-inter'>Trending Categories</span>
          <Category_slider trendingCategories={trendingCategories.slice(1)} />

          <span className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">Featured</span>
          <Videos data={video_collection[2].finalDataArray} />
          <a href={`/channels`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Featured Videos" />
          </a>

          <span className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">Popular</span>
          <Videos data={video_collection[3].finalDataArray} />
          <a href={`/popular`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Popular Videos" />
          </a>

          <span className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">New Videos</span>
          <Videos data={video_collection[4].finalDataArray} />
          <a href={`/new_videos`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More New Videos" />
          </a>

          <span className="lg:text-2xl text-lg font-semibold text-gray-800  pb-2 font-inter">Random</span>
          <Videos data={video_collection[5].finalDataArray} />
          <a href={`/random`}>
            <img src='/more_video.png' className='mx-auto h-10 md:h-[44px] 2xl:h-[54px] mb-2 cursor-pointer hover:scale-105 transition-transform duration-300' alt="More Random Videos" />
          </a>
        </div>
      </main>

      <footer>
        <a className='' href="https://www.fuckvideo.live/">.</a>
        <a className='' href="https://www.chutlunds.com/">.</a>
        <a className='' href="https://www.desikahaniya.in/">.</a>
      </footer>
    </div>
  );
}

export async function getStaticProps({ req, res }) {
  const parcelData = { href: "https://spankbang.party/" };

  const API_URL = `${process.env.BACKEND_URL}getHomePageVideos`;

  const rawResponse = await fetch(API_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(parcelData),
  });
  const ress = await rawResponse.json();

  return {
    props: {
      video_collection: ress.result.finalDataArray_Array,
      trendingChannels: ress.result.trendingChannels,
      tags: ress.result.tags,
      trendingCategories: ress.result.trendingCategories,
      trendingPornstars: ress.result.trendingPornstars,
    },
  };
}
