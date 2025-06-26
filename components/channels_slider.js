import Link from 'next/link';

function Channels_slider({ trendingChannels, trendingDataType }) {


    function extractChannelData(path) {
        const match = path.match(/^\/([^/]+)\/channel\/([^/]+)\//);
        if (match) {
            const code = match[1];
            const channelName = match[2];
            return { code, channelName };
        }
        return null;
    }


    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden my-4 '>
            {trendingChannels.map(channelObj => {

                const result = extractChannelData(channelObj.href); // Extract code and channel name from the href  from "/nd/channel/dogfart+network/"

                return (
                    <Link href={`/channels/${result.code}/${result.channelName}`} key={channelObj.imageUrl}>
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img
                                    className='shadow-md rounded-full object-cover aspect-square'
                                    src={channelObj.imageUrl}
                                    loading="lazy"
                                    alt={channelObj.channelName}
                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>
                                {channelObj.channelName.toUpperCase()}
                            </h2>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}

export default Channels_slider;