import { useRouter } from "next/router";
import Sidebar from '../../../../../components/Sidebar';
import Videos from "../../../../../components/Videos";
import Header from '../../../../../components/Pornstar/Header'
import Head from 'next/head'
import { BeatLoader } from 'react-spinners';
import Link from 'next/link'
import Pagination from '../../../../../components/Pagination';
import { Scrape_Video_Item_Pornstar } from '../../../../../config/Scrape_Video_Item';

import cheerio from 'cheerio';



function Index({ video_collection, pages }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        )
    }

    const { code, pornstarname, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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


            <Header keyword={pornstarname.replace('+', ' ')} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
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


    }


    await scrape(`https://spankbang.party/${code}/pornstar/${pornstarname}/page/${page}/?o=all`)



    return {
        props: {
            video_collection: finalDataArray,
            pages: pages
        }
    }


}

