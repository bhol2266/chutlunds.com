import cheerio from 'cheerio';
import fetchdata from 'node-fetch';





export default async function handler(req, res) {


    const url = req.body;

    let finalDataArray = []
    let pages = []


    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []


    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)





    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


    })

    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


    })
    $('.video-list.video-rotate.video-list-with-ads .video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item .stats').each((i, el) => {

        const text = $(el).text()
        const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
        const views = text.substring(0, text.indexOf("%") - 4)

        likedPercentArray.push(likePercentage.trim())
        viewsArray.push(views.trim())
    })


    $('.video-list.video-rotate.video-list-with-ads .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
    })



    $('.video-list.video-rotate.video-list-with-ads .video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
            hrefArray.push(`https://spankbang.com${data}`)
        }


    })
    $('.pagination ul li').each((i, el) => {


        const data = $(el).text()
        pages.push(data)


    })






    for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

            finalDataArray.push({
                thumbnailArray: thumbnailArray[index],
                TitleArray: TitleArray[index],
                durationArray: durationArray[index],
                likedPercentArray: likedPercentArray[index],
                viewsArray: viewsArray[index],
                previewVideoArray: previewVideoArray[index],
                hrefArray: hrefArray[index],

            })
        }
    }

    return res.status(200).send({ sucess: true, data: { finalDataArray: finalDataArray, pages: pages }, message: 'Sucessfull!' })


}

