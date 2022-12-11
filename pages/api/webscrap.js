// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from 'cheerio';
import fetchdata from 'node-fetch';


export default async function handler(req, res) {
  const { body } = req
  const videoid = body.videoid;
  const video_name = body.video_name;


  console.log("working");

  var video_link = ""
  var relatedVideos = []
  var video_details = {}

  const scrape = async (url) => {



    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)


    //Video_details
    var liked = ""
    var disliked = ""
    var thumbnail = ""


    $('#ics-lk').each((i, el) => {
      const data = $(el).text();
      liked = data

    })
    $('#ics-dlk').each((i, el) => {
      const data = $(el).text();
      disliked = data

    })
    $('#video-player').each((i, el) => {
      const data = $(el).attr('poster');
      thumbnail = data

    })

    video_details = {
      title: "video_name",
      liked: liked,
      disliked: disliked,
      thumbnail: thumbnail,
    }


    //Related Videos 

    var TitleArray = []
    var liked = []
    var disliked = []
    var durationArray = []
    var hrefArray = []
    var thumbnail = []


    $('#video-player source').each((i, el) => {
      const data = $(el).attr('src');
      video_link = data

    })

    $('.info a').each((i, el) => {
      const data = $(el).text().trim();
      TitleArray.push(data)


    })
    $('.info a').each((i, el) => {

      const data = $(el).attr('href')
      hrefArray.push(`https://justindianporn.me${data}`)

    })


    $('.image a img').each((i, el) => {

      const data = $(el).attr('data-src')
      thumbnail.push(data)


    })

    $('.length').each((i, el) => {

      const data = $(el).text().trim();
      durationArray.push(data)

    })
    $('.likes.good').each((i, el) => {

      const data = $(el).text().trim();
      liked.push(data)

    })
    $('.dislikes.bad').each((i, el) => {

      const data = $(el).text().trim();
      disliked.push(data)

    })

    for (let Page = 0; Page < TitleArray.length; Page++) {
      relatedVideos.push({
        TitleArray: TitleArray[Page],
        liked: liked[Page],
        disliked: disliked[Page],
        durationArray: durationArray[Page],
        hrefArray: hrefArray[Page],
        thumbnail: thumbnail[Page],
      })
    }
    res.status(200).json({
      video_details: video_details,
      video_link: video_link,
      relatedVideos: relatedVideos,
    })



  }


  await scrape(`https://justindianporn.me/video/${videoid}/${video_name.replace(/ /g, "-").toLowerCase()}html`)



}
