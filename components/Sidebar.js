import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';
import categories from "../JsonData/categoryImages/data.json"



function Sidebar() {
    const router = useRouter();

   

    return (
        <div className='hidden md:flex md:flex-col mr-2' >
            {categories.map(category => {
                return (

                    <Link key={category.name}  href={`/category/${category.name.replaceAll('.png',"").toLowerCase().trim()}`}>
                        <h2  className="w-44 text-md border-2 border-white hover:bg-button rounded-md text-white  p-1 pl-4 pr-2 cursor-pointer bg-theme capitalize">{category.name.replaceAll('.png',"")}</h2>
                    </Link>

                )
            })}

        </div>
    )
}

export default Sidebar