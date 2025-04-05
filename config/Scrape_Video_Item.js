


export function Scrape_Video_Item($2) {

    // this is only used for search page and video page

    const finalDataArray = [];
 

    if (finalDataArray.length == 0) {
        $2(".main_results .video-item").each((i, el) => {
            const thumbnail = $2(el).find("picture img").attr("data-src");
            const title = $2(el).find("picture img").attr("alt");
            const duration = $2(el).find(".l").text();
            const views = $2(el).find('span[data-testid="views"]').find('span').last().text().trim();
            const likePercentage = $2(el).find('span[data-testid="rates"]').find('span').last().text().trim();
            const channelName = $2(el).find('a[data-testid="title"] span').text().trim();
            const channelHref = $2(el).find('a[data-testid="title"]').attr('href') || '';
            const videoBadge = $2(el).find(".video-badge.h").text().trim();
            const previewVideo = $2(el).find("picture img").attr("data-preview");
            const href = `https://spankbang.com${$2(el).find("a").attr("href")}`;

            var refrenceLinkType = ''
            if (channelHref.includes("/channel/")) refrenceLinkType = "channel"
            if (channelHref.includes("/s/")) refrenceLinkType = "search"
            if (channelHref.includes("/creator/")) refrenceLinkType = "creator"
            if (channelHref.includes("/pornstar/")) refrenceLinkType = "pornstar"


            if (href !== void 0 && previewVideo !== void 0 && !thumbnail.includes("//assets.sb-cd.com")) {
                finalDataArray.push({
                    thumbnail,
                    title,
                    duration,
                    views,
                    likePercentage,
                    channelName,
                    channelHref,
                    refrenceLinkType,

            
                    videoBadge,
                    previewVideo,
                    href
                });
            }
        });
    }
    if (finalDataArray.length == 0) {
        $2(".video-item").each((i, el) => {
            const thumbnail = $2(el).find("picture img").attr("data-src");
            const title = $2(el).find("picture img").attr("alt");
            const duration = $2(el).find(".l").text();
            const views = $2(el).find('span[data-testid="views"]').find('span').last().text().trim();
            const likePercentage = $2(el).find('span[data-testid="rates"]').find('span').last().text().trim();
            const channelName = $2(el).find('a[data-testid="title"] span').text().trim();
            const channelHref = $2(el).find('a[data-testid="title"]').attr('href') || '';
            const videoBadge = $2(el).find(".video-badge.h").text().trim();
            const previewVideo = $2(el).find("picture img").attr("data-preview");
            const href = `https://spankbang.com${$2(el).find("a").attr("href")}`;

            var refrenceLinkType = ''
            if (channelHref.includes("/channel/")) refrenceLinkType = "channel"
            if (channelHref.includes("/s/")) refrenceLinkType = "search"
            if (channelHref.includes("/creator/")) refrenceLinkType = "creator"
            if (channelHref.includes("/pornstar/")) refrenceLinkType = "pornstar"


            if (href !== void 0 && previewVideo !== void 0 && !thumbnail.includes("//assets.sb-cd.com")) {
                finalDataArray.push({
                    thumbnail,
                    title,
                    duration,
                    views,
                    likePercentage,
                    channelName,
                    channelHref,
                    refrenceLinkType,
                    videoBadge,
                    previewVideo,
                    href
                });
            }
        });
    }

  

    return finalDataArray;
}








//this because, for pornstar page the above code will not works because the classes names are changed in pornstar page

export function Scrape_Video_Item_Pornstar($) {


    const finalDataArray = [];

    const cleanText = (text) => text ? text.trim().replace(/\s+/g, ' ') : '';


    $('.flex.flex-col > a').each((index, element) => {
        const thumbnail = $(element).find('img').attr('data-src');
        const title = cleanText($(element).attr('title'));

        // Extract and clean the duration, views, likePercentage, uploadedTime, and videoBadge from sibling elements
        const siblingDiv = $(element).siblings('.flex.flex-col');

        // Extract text data and clean it
        const data = cleanText(siblingDiv.find('div.text-body-sm.text-tertiary').find('div').eq(0).text()); //'600 100% 9 months'
        // Using split with a regular expression
        const [views, likePercentage, uploadedTime] = data.split(/(\d+%)/).filter(Boolean).map(s => s.trim());


        // Extract video badge
        const videoBadge = cleanText($(element).find('div.absolute.left-2.top-2').text());

        // Extract preview video source and href
        const previewVideo = $(element).find('video source').attr('data-src');
        var href = $(element).attr('href');
        if (!href.includes("https://spankbang.com")) href = "https://spankbang.com" + href

        if (title && previewVideo != undefined) {
            finalDataArray.push({
                thumbnail: thumbnail,
                title: title,
                duration: cleanText($(element).find('div.absolute.right-2.top-2').text()),
                views: views,
                likePercentage: likePercentage,
                uploadedTime: uploadedTime,
                videoBadge: videoBadge,
                previewVideo: previewVideo,
                href: href
            });
        }
    });

    return finalDataArray;
}


