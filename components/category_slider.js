import Link from 'next/link'
import data from "../JsonData/categoryList.json"

const StaticCategories = [
    {
        "categoryName":"Amateur",
        "imageUrl": "/static/desktop/Images/categories/ids/1.jpg",
        "link": "/s/amateur/"
    },
    {
        "categoryName":"Asian",
        "imageUrl": "/static/desktop/Images/categories/ids/3.jpg",
        "link": "/s/asian/"
    },
    {
        "categoryName":"Creampie",
        "imageUrl": "/static/desktop/Images/categories/ids/51.jpg",
        "link": "/s/vr/"
    },
    {
        "categoryName":"Blowjob",
        "imageUrl": "/static/desktop/Images/categories/ids/4.jpg",
        "link": "/s/babe/"
    }
    ,
    {
        "categoryName":"Indian",
        "imageUrl": "/static/desktop/Images/categories/ids/25.jpg",
        "link": "/s/massage/"
    }
    ,
    {
        "categoryName":"Groupsex",
        "imageUrl": "/static/desktop/Images/categories/ids/25.jpg",
        "link": "/s/massage/"
    }
]


function Category_slider() {


    return (
        <div className='flex items-start space-x-1 text-color overflow-x-scroll scrollbar-hide md:hidden mb-6'>

            {data.map(obj => {

                return (
                    <Link href={`/category/${obj.categoryName.toLowerCase()}`} key={obj.categoryName} >
                        <div className='flex flex-col justify-center items-center mx-1'>
                            <div className='w-[90px]'>
                                <img className='shadow-md rounded-full object-cover aspect-square'
                                    alt={obj.categoryName.toLowerCase()}
                                    src={obj.imageUrl}

                                />
                            </div>
                            <h2 className='text-xs text-center font-poppins text-gray-600 font-semibold mt-1 whitespace-nowrap'>{obj.categoryName}</h2>
                        </div>
                    </Link>
                )
            })}

        </div>
    )
}

export default Category_slider