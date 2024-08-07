import cheerio from 'cheerio';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Pagination from '../../../../components/Pagination';
import Header from '../../../../components/Pornstar/Header';
import Videos from "../../../../components/Videos";

import { Scrape_Video_Item_Pornstar } from '../../../../config/Scrape_Video_Item';

function Index({ video_collection, pages, pornstarInformation }) {
    const router = useRouter();
    const { code, pornstarname } = router.query;
    const [imageURL, setimage] = useState('');


    // useEffect(() => {
    //     // Assuming pornstarNameList is available
    //     pornstarNameList.filter(pornstar => {
    //         if (pornstarname.toLowerCase() === pornstar.Name.toLowerCase().replace(/ /g, "+")) {
    //             setimage(pornstar.thumbnail);
    //         }
    //     });
    // }, [pornstarname]);

    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={'#232b2b'} />
            </div>
        );
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Head>
                <title>{`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`}</title>
                <meta name="description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
                <meta name="keywords" content="porn, xxx, streaming porn, HD porn, HD adult videos, HD pussy videos, sex movies, chutlunds" />
                <meta property="og:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`} />
                <meta property="og:description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
                <meta name="twitter:title" content={`${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} Porn Videos - Chutlunds`} />
                <meta name="twitter:description" content={`Check out the best porn videos, images, gifs and playlists from pornstar ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}. Browse through the content she uploaded herself on her verified pornstar profile, only on Chutlunds.com. Subscribe to ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))}'s feed and add her as a friend. See ${capitalizeFirstLetter(pornstarname.replace('+', " ").replace("+", " "))} naked in an incredible selection of hardcore FREE sex movies.`} />
                <link rel="canonical" href={`https://chutlunds.com/pornstar/${code}/${pornstarname}`} />
            </Head>

            <Header keyword={pornstarname.replace("+", " ")} pageNumber="1" code={code} />

            <div className=''>
                <div className='flex font-semibold items-center justify-start md:ml-4 my-4'>
                    <img
                        className='object-cover w-44 h-56 rounded'
                        src={imageURL}
                        alt={pornstarname}
                        loading='lazy'
                    />
                    <div className='mx-4 font-inter flex flex-col mb-auto'>
                        <span className={`p-0.5 text-lg ${pornstarInformation.title ? '' : 'hidden'}`}>
                            {pornstarInformation.title?.replace("porn videos", "")}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.views ? '' : 'hidden'}`}>
                            Views: {pornstarInformation.views}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.videos ? '' : 'hidden'}`}>
                            Videos: {pornstarInformation.videos}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.age ? '' : 'hidden'}`}>
                            Age: {pornstarInformation.age}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.from ? '' : 'hidden'}`}>
                            From: {pornstarInformation.from}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.ethnicity ? '' : 'hidden'}`}>
                            Ethnicity: {pornstarInformation.ethnicity}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.hairColor ? '' : 'hidden'}`}>
                            Hair Color: {pornstarInformation.hairColor}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.height ? '' : 'hidden'}`}>
                            Height: {pornstarInformation.height}
                        </span>
                        <span className={`p-0.5 font-light ${pornstarInformation.weight ? '' : 'hidden'}`}>
                            Weight: {pornstarInformation.weight}
                        </span>
                    </div>

                </div>
                <Videos data={video_collection} />
            </div>

            <Pagination data={{ url: `/pornstar/${code}/${pornstarname}`, currentPageNumberURL: "1", pages: pages }} />
        </>
    );
}

export default Index;


export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    code: '24y',
                    pornstarname: 'mercedes+ashley'
                }
            }
        ],
        fallback: true // false or 'blocking'
    };
}





export async function getStaticProps(context) {

    const { code, pornstarname } = context.params;

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

    await scrape(`https://spankbang.party/${code}/pornstar/${pornstarname}/?o=all`)


    return {
        props: {
            video_collection: finalDataArray,
            pages: pages,
            pornstarInformation: pornstarInformation,
        }
    }
}

